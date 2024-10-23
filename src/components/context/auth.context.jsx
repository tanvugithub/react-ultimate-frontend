import { createContext, useState } from "react";

export const AuthContext = createContext({
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: "",
});

export const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
    });
    const [isAppLoading, setIsAppLoading] = useState(true);
    // NOTE dòng trên: ban đầu Spin quay quay sẽ hiển thị ở file <App />
    // Nếu ở <App /> fetch data (getAccountAPI) thành công thì setIsAppLoading(false) -> không hiển thị spin

    return (
        <AuthContext.Provider
            value={{ user, setUser, isAppLoading, setIsAppLoading }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
