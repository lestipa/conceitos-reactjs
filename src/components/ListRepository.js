import React from 'react';

export default function ListRepository({title, children}) {
  return (
    <>
      { title &&
        <li>
          {title}
          {children}
        </li>
      }
    </>
  )
}