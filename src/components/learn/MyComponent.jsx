import "./style.css";
const MyComponent = ({ children, className }) => {
    //const variable = "My name is NTV";  // string
    //const  variable = 25;   // number
    //const variable = false; // boolean
    //const variable = undefined;  // undefined
    //const variable = null;  // null
    //const variableArray = [1, 2, 3];
    const variableObj = {
        name: "NTV",
        age: 25
    }


    /* LƯU Ý */
    //JSON.stringify()   -> chuyển object thành chuỗi

    return (
        //Fragments <>
        <>
            <button className={className}>{children}</button>
            <div className="child" style={{ textDecoration: "underline", fontWeight: "700" }}>
                Content is: {JSON.stringify(variableObj)}
            </div>
            <div>{console.log("NTV")}</div>
        </>
    )
}

export default MyComponent