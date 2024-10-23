import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";

//import './index.css'   // tự mình bỏ đi
import "./styles/global.css";
import "nprogress/nprogress.css"; // trong node_modules

// PAGES
import TodoApp from "./components/todo/TodoApp.jsx";
import LoginPage from "./pages/login.jsx";
import RegisterPage from "./pages/register.jsx";
import UserPage from "./pages/user.jsx";
import BookPage from "./pages/book.jsx";
import ErrorPage from "./pages/error.jsx";
import { AuthWrapper } from "./components/context/auth.context.jsx";
import PrivateRoute from "./pages/private.route.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        //element: <div>Hello world!</div>,
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <TodoApp />,
            },
            {
                path: "/users",
                element: <UserPage />,
            },
            {
                path: "/books",
                element: (
                    <PrivateRoute>
                        <BookPage />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* <App /> */}
        <AuthWrapper>
            <RouterProvider router={router} />
        </AuthWrapper>
    </React.StrictMode>
);
