import React from 'react'

const NameItem = props => {
  const { name } = props

  return <li>{name}</li>
}

export const NamesList = props => {
  const { names } = props
  return (
    <ul>
      {names
        ? names.map((name, index) => <NameItem key={index} name={name} />)
        : 'Nada que mostrar'}
    </ul>
  )
}

export const ConditionalPropsComponent = () => {
  const NAMES = ['Poción multijugos', 'Filtro de amor']
  return (
    <div className="view-container">
      <h1>Componente con condición según las props</h1>
      <hr />
      <NamesList names={NAMES} />
    </div>
  )
}
