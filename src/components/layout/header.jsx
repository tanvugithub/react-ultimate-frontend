import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
    HomeOutlined,
    UserOutlined,
    MailOutlined,
    BookOutlined,
    SettingOutlined,
    LoginOutlined,
    AliwangwangOutlined,
} from "@ant-design/icons";
import { Menu, message } from "antd";
import { AuthContext } from "../context/auth.context";
import { logoutAPI } from "../../services/service.api";

//import './header.scss';

const Header = () => {
    const [current, setCurrent] = useState(""); // home
    const navigate = useNavigate();
    const location = useLocation();

    const { user, setUser } = useContext(AuthContext);
    // *** NOTE DÒNG TRÊN ***
    // bên auth.context.jsx truyền qua là 1 data object { user, setUser }
    // muốn lấy user thì chỉ cần ghi như trên: const { user } = useContext(AuthContext)

    useEffect(() => {
        if (location && location.pathname) {
            const allRoutes = ["users", "books"];
            const currentRoute = allRoutes.find((item) => {
                return `/${item}` === location.pathname;
            });
            if (currentRoute) {
                setCurrent(currentRoute);
            } else {
                setCurrent("home");
            }
        }
    }, [location]);

    const onClick = (e) => {
        //console.log("click ", e);
        setCurrent(e.key);
    };

    const handleLogout = async () => {
        const res = await logoutAPI();
        if (res.data) {
            //clear localStorage
            localStorage.removeItem("access_token");
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: "",
            });
            message.success("Logout thành công");
            //redirect to home
            navigate("/");
        }
    };

    const items = [
        {
            label: <NavLink to="/">Home</NavLink>,
            key: "home",
            icon: <HomeOutlined />,
        },
        {
            label: <NavLink to="/users">Users</NavLink>,
            key: "users",
            icon: <UserOutlined />,
            //disabled: true,
        },
        {
            label: <NavLink to="/books">Books</NavLink>,
            key: "books",
            icon: <BookOutlined />,
        },

        ...(!user.id
            ? [
                  {
                      label: <NavLink to="/login">Đăng nhập</NavLink>,
                      key: "login",
                      icon: <LoginOutlined />,
                  },
              ]
            : []),
        // Nếu có user đăng nhập (fetch API login account)
        ...(user.id
            ? [
                  {
                      label: `Welcome ${user.fullName}`,
                      key: "setting",
                      icon: <AliwangwangOutlined />,
                      children: [
                          {
                              label: (
                                  <span onClick={() => handleLogout()}>
                                      Đăng xuất
                                  </span>
                              ),
                              key: "logout",
                          },
                      ],
                  },
              ]
            : []),
    ];

    return (
        <div className="container">
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
            />
        </div>
    );
};

export default Header;
