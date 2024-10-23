import { useState } from 'react'

import TodoNew from "./TodoNew";
import TodoData from "./TodoData";
import todoImg from "../../assets/todo.png";

import "./todo.css";

const TodoApp = () => {
    const [todoList, setTodoList] = useState([]);

    const addNewTodo = (name) => {
        const newTodo = {
            id: randomIntFromTo(1, 1000000),
            name: name,
        }
        setTodoList([...todoList, newTodo]);
    }

    const deleteTodo = (id) => {
        console.log("DELETE todo id: " + id);
        let newTodoList = todoList.filter(item => item.id !== id);
        setTodoList(newTodoList);
    }

    const randomIntFromTo = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    return (
        <div className="container">

            <div className="todo-container">

                <div className="todo-title">Todo List</div>

                <TodoNew addNewTodo={addNewTodo} />

                {(todoList.length > 0) ?
                    <>
                        <TodoData
                            todoList={todoList}
                            deleteTodo={deleteTodo}
                        />
                        <button className="px-3 py-2 bg-indigo-500 text-white font-bold rounded-md">Delete all</button>
                    </> :
                    <div className="todo-image"><img src={todoImg} width="250" /></div>
                }

            </div>

        </div>
    )
}

export default TodoApp;