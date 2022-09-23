import React from 'react';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { changeTodoStatus } from './ApiUtils';

const TodoItem = ({todo, todosState: {todos, setTodos}}) => {

  const onChangeStatus = async (id) => {
    const res = await changeTodoStatus(id, { completed: !todo.completed });
    console.log(res);

    const toBeUpdatedTodos = [...todos];

    const toBeUpdatedTodoIndex = todos.findIndex(todo => todo.id === id);
    toBeUpdatedTodos[toBeUpdatedTodoIndex] = res;

    setTodos(toBeUpdatedTodos);
  }

  return (
    <li className='list__item'>
      {todo.completed ? (<CheckBoxRoundedIcon sx={{ fontSize: '2rem', marginRight: 1 }} color='success' onClick={() => onChangeStatus(todo.id)} />) :
        (<CheckBoxOutlineBlankRoundedIcon sx={{ fontSize: '2rem', marginRight: 1 }} onClick={() => onChangeStatus(todo.id)} />)}
      <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
      <EditRoundedIcon className='delete__icon' color='info' sx={{ fontSize: '2rem', marginLeft: 1 }} />
      <DeleteRoundedIcon className='delete__icon' color='error' sx={{ fontSize: '2rem', marginLeft: 1 }} />
    </li>
  )
}

export default TodoItem;