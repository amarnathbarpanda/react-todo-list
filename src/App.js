import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';

import './App.css';
import TodoItem from './TodoItem';
import { addTodo, getTodos, updatedToDo } from './ApiUtils';

function App() {

  const [todos, setTodos] = useState([]);
  const [todoItem, setTodoItem] = useState({
    userId: 11,
    id: Date.now(),
    title: '',
    completed: false
  });
  const [edit, setEdit] = useState(false);


  // Getting the todo data from the API
  useEffect(() => {
    (async () => {
      const res = await getTodos();
      setTodos(res);
    })();
  }, []);

  const onHandleChange = (event) => {
    setTodoItem({ ...todoItem, [event.target.name]: event.target.value })
  }

  // Adding a new Todo
  const onAddToDo = async () => {
    if (!todoItem.title) {
      toast.error('Todo Name cannot be blank.', { position: 'top-right', style: { fontSize: 15 } });
      return;
    }

    const data = await addTodo(todoItem);
    const updatedTodos = [...todos, data];
    setTodos(updatedTodos);
    toast.success('ToDo Added Successfully!', { position: 'top-right', style: { fontSize: 15 } });
    setTodoItem({
      userId: 11,
      id: Date.now(),
      title: '',
      completed: false
    });
  }

  // Updating the exisiting todo
  const onUpdateToDo = async () => {
    const res = await updatedToDo(todoItem.id, todoItem);

    const updatedToDos = [...todos];
    // Getting the index of the updated todo
    const newTodoIndex = todos.findIndex(todo => todo.id === res.id);

    // Assigning the updated todo at its position
    updatedToDos[newTodoIndex] = res;

    // Updating the todos state with the updated list of todo
    setTodos(updatedToDos);

    // Show toast on updation
    toast.success('ToDo Updated Successfully!', { position: 'top-right', style: { fontSize: 15 } });

    // clear the text box
    setTodoItem({
      userId: 11,
      id: Date.now(),
      title: '',
      completed: false
    });
    setEdit(false);
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
          {!edit ? (<Button
            variant="contained"
            size='large'
            onClick={() => onAddToDo()}
          >Add</Button>)
            : (<Button
              color='warning'
              variant="contained"
              size='large'
              onClick={() => onUpdateToDo()}
            >Update</Button>)}
        </div>
        <ul id='list'>
          {todos.length > 0 ? (todos.map((todo) => (
            <TodoItem key={todo.id} todosState={{ todos, setTodos }} setTodoItem={setTodoItem} setEdit={setEdit} todo={todo} />
          ))) : (<CircularProgress className='loader' />)}
        </ul>
      </div>
    </div>
  );
}

export default App;
