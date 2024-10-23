const TodoData = ({ todoList, deleteTodo }) => {

    const handleDelete = (id) => {
        deleteTodo(id);
    }

    return (
        <div className="todo-data">

            {todoList && todoList.map((item, index) => {

                return (
                    <div className={`todo-row ${index}`} key={item.id} >
                        <div className="todo-name">{item.name}</div>
                        <div className="todo-action">
                            <button
                                className="todo-action-item delete"
                                onClick={() => handleDelete(item.id)}
                            >
                                Delete
                            </button>
                            <button className="todo-action-item edit" >Edit</button>
                        </div>
                    </div>
                )

            })}

        </div >
    )
}

export default TodoData;