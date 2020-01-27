import React, { useState } from 'react'

export const StateComponent = () => {
  const [count, setCount] = useState(0)

  const handleChange = e => {
    setCount(e.target.value.length)
  }

  return (
    <div className="view-container">
      <h1>Componente con estado</h1>
      <textarea cols={80} rows={10} onChange={e => handleChange(e)} />
      <div>Count: {count}</div>
    </div>
  )
}
