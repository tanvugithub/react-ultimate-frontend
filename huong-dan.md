# Link tài liệu: https://docs.google.com/document/d/13sP1OCY_buEvU4B1dw1QUG2Nkyqj2IxsilMqYKHQNAM/edit

# Muốn điều hướng trang thì cài: react router dom

# B1: > npm i --save-exact react-router-dom@6.23.1

# B2: ./src/main.jsx:

# import { createBrowserRouter, RouterProvider, } from "react-router-dom";

# B3:

const router = createBrowserRouter([
{
path: "/",
element: <div>Hello world!</div>,
},
]);

# B4:

Trong thẻ
<React.StrictMode>
<RouterProvider router={router} />
</React.StrictMode>
