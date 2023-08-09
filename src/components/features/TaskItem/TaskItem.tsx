import React, { FC } from 'react'
import Trash from '../../ui/Trash/Trash'
import { ITask } from '../../../model/model'
import cl from './TaskItem.module.scss'
// import CheckMark from './CheckMark/CheckMak'

interface ITaskItem {
  number: number
  task: ITask
  deleteItem: Function
  checked: Function
}

const TaskItem: FC<ITaskItem> = ({ number, task, deleteItem, checked }) => {
  const chekedItem = () => {
    checked(task.id)
  }

  return (
    <div className={cl.TaskItem}>
      <div onClick={chekedItem} className={cl.inner}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={chekedItem}
          className={cl.checked}
        />
        {/* <CheckMark 
            id={'checkMark'} 
            type={'checkbox'}  
            checked={task.completed} 
            onChange={chekedItem}
          /> */}
      </div>
      <p className={task.completed ? cl.checked : ''}>
        {number}. {task.title}
      </p>
      <Trash task={task} deleteItem={deleteItem} />
    </div>
  )
}

export default TaskItem
