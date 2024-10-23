import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Navigate, NavLink } from "react-router-dom";
import { Button, Result } from "antd";

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);

    if (user && user.id) {
        return <>{props.children}</>;
    }

    //return <Navigate to="/login" replace />;
    return (
        <Result
            status="403"
            title="Unauthorize!"
            subTitle={"Bạn cần đăng nhập để truy cập trang này"}
            extra={
                <div className="flex gap-5 justify-center">
                    <Button type="primary" className="px-3 py-4">
                        <NavLink to="/login" className="text-md">
                            Login
                        </NavLink>
                    </Button>
                    <Button className="px-3 py-4">
                        <NavLink to="/" className="text-md">
                            Back to home page
                        </NavLink>
                    </Button>
                </div>
            }
        />
    );
};

export default PrivateRoute;
