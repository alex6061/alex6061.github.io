import React, { FC } from 'react'
import cl from './Button.module.scss'

interface IButton {
  addItem: Function
  children: React.ReactNode
}

const Button: FC<IButton> = ({ children, addItem }) => {
  const handleOnClick = () => {
    addItem()
  }

  return (
    <button onClick={handleOnClick} className={cl.Button}>
      {children}
    </button>
  )
}

export default Button
