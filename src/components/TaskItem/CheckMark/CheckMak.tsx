import React, { FC } from 'react'
import cl from './CheckMark.module.scss'

interface ICheckMark {
  id: string;
  type: string;
  checked: boolean;
  onChange: any;
}

const CheckMark: FC<ICheckMark> = ({checked, onChange, type, id}) => {

  

  return (
    <div>
      <label className={cl.label} htmlFor={id}></label>
      <input className={cl.checkMark}  
        type={type}
        id={id}
        checked={checked}
        onChange={onChange}
      />
    </div>
  )
}

export default CheckMark
