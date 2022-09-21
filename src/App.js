import { Button } from '@mui/material';

import './App.css';
import { useEffect, useState } from 'react';
import TodoItem from './TodoItem';

function App() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {

    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.log(err));

  }, []);


  return (
    <div className="App">
      <div className='container'>
        <h2 className='title'>Todo List</h2>
        <div className='input'>
          <input type='text' placeholder='Todo Name' />
          <Button variant="contained" size='large'>Add</Button>
        </div>
        <ul id='list'>
          {todos.map((todo)=>(
            <TodoItem key={todo.id} todo={todo}/>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
