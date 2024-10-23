import { useEffect, useState } from "react";

import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fetchUserAPI } from "../services/service.api";

const UserPage = () => {
    const [dataUsers, setDataUsers] = useState([]);

    //Phân trang
    const [current, setCurrent] = useState(1); // current page
    const [pageSize, setPageSize] = useState(5); // 5 phần tử trên/trang
    const [total, setTotal] = useState(0); // mặc định tổng số phần tử là 0

    //useEffect ban đầu khi load trang nó chạy
    //Tiếp tục khi current phân trang thay đổi thì nó chạy lại
    useEffect(() => {
        loadUser();
    }, [current, pageSize]);

    const loadUser = async () => {
        const res = await fetchUserAPI(current, pageSize);
        if (res.data) {
            setDataUsers(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
    };

    //lift-up state
    return (
        <div className="container">
            <div className="mt-5">
                <UserForm loadUser={loadUser} />
            </div>

            <div className="mt-8">
                <UserTable
                    dataUsers={dataUsers}
                    loadUser={loadUser}
                    current={current}
                    setCurrent={setCurrent}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    total={total}
                />
            </div>
        </div>
    );
};

export default UserPage;
