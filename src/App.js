import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';

import './App.css';
import TodoItem from './TodoItem';
import { addTodo, getTodos } from './ApiUtils';

function App() {

  const [todos, setTodos] = useState([]);
  const [todoItem, setTodoItem] = useState({
    userId: 11,
    id: Date.now(),
    title: '',
    completed: false
  });

  useEffect(() => {
    (async () => {
      const res = await getTodos();
      setTodos(res);
    })();
  }, []);

  const onHandleChange = (event) => {
    setTodoItem({ ...todoItem, [event.target.name]: event.target.value })
  }

  const onAddToDo = async () => {

    const data = await addTodo(todoItem);
    const updatedTodos = [...todos, data];
    setTodos(updatedTodos);
    toast.success('ToDo Added Successfully!', { position: 'top-right', style: { fontSize: 15 }});
    setTodoItem({
      userId: 11,
      id: Date.now(),
      title: '',
      completed: false
    });
  }

  return (
    <div className="App">
      <Toaster />
      <div className='container'>
        <h2 className='title'>Todo List</h2>
        <div className='input'>
          <input type='text'
            name='title' onChange={(event) => onHandleChange(event)}
            placeholder='Todo Name'
            value={todoItem.title}
          />
          <Button
            variant="contained"
            size='large'
            onClick={() => onAddToDo()}
          >Add</Button>
        </div>
        <ul id='list'>
          {todos.length > 0 ? (todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))) : (<CircularProgress className='loader' />)}
        </ul>
      </div>
    </div>
  );
}

export default App;
