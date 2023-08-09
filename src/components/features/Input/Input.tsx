import React, { FC } from 'react'
import cl from './Input.module.scss'

interface IInput {
  value: string | number
  keyPress: Function
  setInputText: Function
  placeholder: string
  type: string
  max?: number
}

const Input: FC<IInput> = ({
  placeholder,
  type,
  value,
  setInputText,
  keyPress,
  max = 200,
}) => {
  const handlerChangeValue = (event: any) => {
    setInputText(event.target.value)
  }

  return (
    <div>
      <input
        placeholder={placeholder}
        className={cl.Input}
        type={type}
        value={value}
        min={1}
        max={max}
        onKeyPress={(event: any) => event.key === 'Enter' && keyPress(value)}
        onChange={(event: any) => handlerChangeValue(event)}
      />
    </div>
  )
}

export default Input
