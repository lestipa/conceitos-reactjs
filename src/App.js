import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

import ListRepository from './components/ListRepository';

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
    console.log(id)
    await api.delete(`repositories/${id}`).then( response => {
        const data = [];
        repositories.map( ( repository ) => data.push(repository.id !== id ? repository : []) );
        setRepositories(data);
      });
  };

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map((repository, index) =>
          <ListRepository 
            key={index}
            title={repository.title}>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </ListRepository>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
