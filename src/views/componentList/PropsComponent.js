import React from 'react'

const NameItem = props => {
  const { name } = props

  return <li>{name}</li>
}

export const NamesList = props => {
  const { names } = props

  return (
    <ul>
      {names.map((name, index) => (
        <NameItem key={index} name={name} />
      ))}
    </ul>
  )
}

export const PropsComponent = () => {
  const NAMES = ['Poción multijugos', 'Filtro de amor']

  return (
    <div className="view-container">
      <h1>Componente con props</h1>
      <hr />
      <NamesList names={NAMES} />
    </div>
  )
}
