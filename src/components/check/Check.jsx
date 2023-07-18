import React from 'react'
import cl from './Check.module.scss'
import { ReactComponent as Checked }  from './checkmark.svg'

const Check = () => {
  return (
      <div 
        type="Checkbox" 
        className={cl.check} >
          <Checked/>
      </div>
  )
}

export default Check