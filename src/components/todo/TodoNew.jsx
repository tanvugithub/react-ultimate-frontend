import { useState, useRef, useEffect } from "react";

const TodoNew = (props) => {
    const [valueInput, setValueInput] = useState("");

    const { addNewTodo } = props;  // addNewTodo function

    const inputRef = useRef(null);

    //addNewTodo('Tấn Vũ');

    //Onchange Cách 1
    //dưới thẻ input, truyền: onChange={handleOnChange} 
    // const handleOnChange = (event) => {
    //     console.log(e.target.value);
    // }

    //Onchange Cách 2
    //dưới thẻ input, truyền: (event) => handleOnChange(event.target.value)
    const handleOnChange = (value) => {
        setValueInput(value);
    }

    //LỢI HẠI: 
    // => hàm addNewTodo là prop từ App (cha) -> TodoNew (con)
    // => 
    const handleClick = (e) => {
        if (valueInput !== "") {
            addNewTodo(valueInput);
            setValueInput(""); // xóa giá trị input
            inputRef.current.focus();
        }
    }

    //Enter handle
    useEffect(() => {
        const listener = (event) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                if (inputRef.current === document.activeElement) {
                    console.log('Input element is focused');
                    if (valueInput !== "") {
                        handleClick();
                    }
                } else {
                    console.log('Input element is not focused');
                }
            }
        };

        document.addEventListener("keydown", listener);

    }, [valueInput]);

    return (
        <div className="input-wrap">
            <input
                ref={inputRef}
                className="todo-input-task"
                type="text"
                placeholder="Enter your task"
                autoFocus
                onChange={(event) => handleOnChange(event.target.value)}
                value={valueInput}
            />
            {
                (valueInput) && <button className="todo-btn-add disabled" onClick={handleClick}>Add</button>
            }

        </div>
    )
}

export default TodoNew;