import React from 'react'
import cl from './Title.module.scss'

interface ITitle {}

const Title = () => {
  return <h1 className={cl.title}>Задачи на сегодня</h1>
}

export default Title
