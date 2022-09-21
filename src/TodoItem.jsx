import React from 'react';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

const TodoItem = ({todo:{id, title, completed}}) => {
  return (
      <li className='list__item'>
          {completed?(<CheckBoxRoundedIcon  sx={{ fontSize: '2rem', marginRight: 1 }} color='success' />):
          (<CheckBoxOutlineBlankRoundedIcon sx={{ fontSize: '2rem', marginRight: 1 }} />)}
          <span>{title}</span>
          <EditRoundedIcon className='delete__icon' color='info' sx={{ fontSize: '2rem', marginLeft: 1 }} />
          <DeleteRoundedIcon className='delete__icon' color='error' sx={{ fontSize: '2rem', marginLeft: 1 }} />
      </li>
  )
}

export default TodoItem;