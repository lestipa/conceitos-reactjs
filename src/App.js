import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      // console.log(response)
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": `Novo repositório ${Date.now()}`,
      "url": `https://github.com/lestipa/new${Date.now()}`,
      "techs": []
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`).then( response => {
      const repositoryIndex = repositories.findIndex(repository => repository.id === id);
      if ( repositoryIndex >= 0 ) {
        const test = [{
          "title": `Novo repositório ${Date.now()}`,
          "url": `https://github.com/lestipa/new${Date.now()}`,
          "techs": []
        }];
        
        const data = [];
        repositories.map( repository => data.push(repository.id !== id ? repository : []) );
        console.log()
        setRepositories(data);
        // console.log('Removido index: ', repositoryIndex)
        // console.log('data: ', data)
        // console.log('repositories: ', repositories)
      }
    });

    // await api.delete(`repositories/${id}`, () => {
    //   const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    //   if ( repositoryIndex >= 0 ) {
    //     const data = repositories;
    //     data.splice(repositoryIndex, 1);
    //     setRepositories(data);
    //   }
    // })
  };

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <>
          {
            repository.id &&
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          }
          </>
        )}

        {/* {
          repositories.map(repository => (
              <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
          ))
        } */}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
