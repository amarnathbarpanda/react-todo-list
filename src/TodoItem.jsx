import React from 'react';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { changeTodoStatus, deleteTodo } from './ApiUtils';
import toast from 'react-hot-toast';

const TodoItem = ({ todo, setTodoItem, setEdit, todosState: {todos, setTodos}}) => {

  const onDelete = async (id) => {
    const res = await deleteTodo(id);

    // filtering out the todo whose id matches with the current todo
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos)
    toast.success('ToDo Deleted Successfully!', { position: 'top-right', style: { fontSize: 15 } });
  }

  const onEdit = (todoItem) => {
    setTodoItem(todoItem);
    setEdit(true);
  }

  return (
    <li className='list__item'>
     
      <span>{todo.title}</span>
      <EditRoundedIcon className='delete__icon' color='info' sx={{ fontSize: '2rem', marginLeft: 2, marginRight: 2 }} onClick={() => onEdit(todo)} />
      <DeleteRoundedIcon className='delete__icon' color='error' sx={{ fontSize: '2rem', marginLeft: 1 }} onClick={() => onDelete(todo.id)}/>
    </li>
  )
}

export default TodoItem;