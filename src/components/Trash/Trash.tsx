import React, { FC } from 'react'
import cl from './Trash.module.scss'
import TrashSvg from './Trash.svg'
import { ITask } from '../../model/model'

interface ITrash {
  task: ITask
  deleteItem: Function;
}

const Trash: FC<ITrash> = ({task, deleteItem}) => {

  const handleOnClick = () => {
    deleteItem(task.id)
  }

  return (
    <div onClick={handleOnClick} className={cl.trash_wrapper}>
      <img className={cl.trash} src={TrashSvg} alt="trash" width={25}/>
    </div>
  ) 
}

export default Trash
