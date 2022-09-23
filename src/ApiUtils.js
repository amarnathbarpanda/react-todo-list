const url = 'https://jsonplaceholder.typicode.com/todos';

export const getTodos = async () => {
    try {
        const res = await fetch(url);
        return res.json();
    } catch (err) {
        console.log(err);
    }
}

export const addTodo = async (todo) => {

    const config = {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }

    try {
        const res = await fetch(url, config);
        return res.json();
    } catch (err) {
        console.log(err);
    }
}

export const updatedToDo = async (id, todo) => {

    const config = {
        method: 'PUT',
        body: JSON.stringify(todo),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }

    try {
        const res = await fetch(`${url}/${id}`, config);
        return res.json();
    } catch (err) {
        console.log(err);
    }
}
export const deleteTodo = async (id) => {

    const config = {
        method: 'DELETE'
    }

    try {
        const res = await fetch(`${url}/${id}`, config);
        return res.json();
    } catch (err) {
        console.log(err);
    }
}