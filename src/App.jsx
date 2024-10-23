import { Outlet } from "react-router-dom";

// import ButtonTeoTeoTeo from './components/learn/MyComponent'  // đặt tên sao cũng được, vì export default
// import { SecondComponent, ThirdComponent } from './components/learn/SecondComponent'

import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { useContext, useEffect } from "react";
import { getAccountAPI } from "./services/service.api";
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";

const App = () => {
    const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);
    // *** NOTE: các biến này là 1 useState trong auth.context.jsx truyền qua để xài

    // Lần đầu khi load trang hoặc F5 lại trang
    // Gọi API fetch user (có gửi kèm access_token trong service/axios.customize.js)
    // Lấy thông tin user đã login
    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        const res = await getAccountAPI();
        // Giả lập chờ 3s mới set data cho user, chỉ demo khi dev
        //await delay(3000);
        if (res.data) {
            setUser(res.data.user);
        }
        setIsAppLoading(false); // ẩn Loading
    };

    // DEMO GIẢ LẬP TRƯỜNG HỢP fetch API chậm, chỉ demo khi dev
    // const delay = (milseconds) => {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             resolve();
    //         }, milseconds);
    //     });
    // };

    return (
        <>
            {isAppLoading === true ? (
                <div className="flex justify-center items-center h-[100vh]">
                    <Spin size="large" />
                </div>
            ) : (
                <>
                    <Header />
                    <Outlet />
                    <Footer />
                </>
            )}
        </>
    );
};

export default App;
