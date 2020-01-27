import React, { useState, useEffect } from 'react'

import { map } from 'lodash'

import { NamesList } from './PropsComponent'
import { apiList } from '../../services/ApiClient'
import { LocalPersistService } from '../../services/LocalPersistService'

export const EffectComponent = () => {
  const [potions, setPotions] = useState(null)

  useEffect(() => {
    const token = LocalPersistService.get('token')
    apiList(token, 'potions').then(potionList => {
      setPotions(potionList)
    })
    return () => {
      console.log('me he desmontado')
    }
  }, [])

  return (
    <div className="view-container">
      <h1>Haciendo uso del ciclo de vida</h1>
      <hr />
      {potions ? (
        <NamesList names={map(potions, 'name')} />
      ) : (
        'No hay pociones que mostrar'
      )}
    </div>
  )
}
