import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, Table, message, notification } from "antd";
import UpdateUserModal from "./update.user.modal";
import UserDetailDrawer from "./user.detail.drawer";

import { deleteUserAPI } from "../../services/service.api";

const UserTable = (props) => {
    const {
        dataUsers,
        loadUser,
        current,
        setCurrent,
        pageSize,
        setPageSize,
        total,
    } = props; // props from user.jsx

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [dataDetail, setDataDetail] = useState(null);

    // FOR view.user.detail
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [isLoadingDetail, setIsLoadingDetail] = useState(false);

    const showDetail = () => {
        setIsOpenDetail(true);
        setIsLoadingDetail(true);

        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() => {
            setIsLoadingDetail(false);
        }, 500);
    };
    // END FOR view.user.detail

    //Popconfirm delete
    const handleConfirmDelete = async (id) => {
        //message.success('Click on yes');
        const res = await deleteUserAPI(id);

        if (res.data) {
            //Antd notification
            notification.success({
                message: "Delete user",
                description: "Xóa user thành công",
            });
            await loadUser(); // chạy function ở thằng cha user.jsx
        } else {
            notification.error({
                message: "Delete user",
                description: JSON.stringify(res.message),
            });
        }
    };

    const cancelDelete = (e) => {
        //console.log(e);
        //message.error('Click on No');
    };
    //End popconfirm delete

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => {
                return <>{index + 1 + (current - 1) * pageSize}</>;
                //
            },
        },
        {
            title: "Id",
            dataIndex: "_id",
            render: (_, record) => (
                <>
                    <a
                        className="text-blue-500"
                        href="#"
                        onClick={() => {
                            setDataDetail(record);
                            showDetail();
                        }}
                    >
                        {record._id}
                    </a>
                </>
            ),
        },
        {
            title: "Full Name",
            dataIndex: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <div className="flex gap-7">
                    <EditOutlined
                        className="cursor-pointer text-green-700"
                        onClick={() => {
                            setIsModalUpdateOpen(true); //show modal
                            setDataUpdate(record); // lấy record table đưa vô state để truyền qua modal
                        }}
                    />
                    <Popconfirm
                        title="Delete the task"
                        description={`Bạn có chắc chắn muốn xóa user ${record.fullName}?`}
                        onConfirm={() => handleConfirmDelete(record._id)}
                        onCancel={cancelDelete}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                    >
                        <DeleteOutlined className="cursor-pointer text-red-500" />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log(">>> check pagination: ", {
            pagination,
            filters,
            sorter,
            extra,
        });

        //Nếu thay đổi trang : current
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current);
                //+ mean str to int
            }
        }

        //Nếu thay đổi tổng số phần tử : pageSize
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize);
                //+ mean str to int
            }
        }
    };

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUsers}
                rowKey={"_id"}
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) => {
                        return (
                            <div>
                                {range[0]}-{range[1]} trên {total} rows
                            </div>
                        );
                    },
                }}
                onChange={onChange}
            />

            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />

            <UserDetailDrawer
                isOpenDetail={isOpenDetail}
                setIsOpenDetail={setIsOpenDetail}
                isLoadingDetail={isLoadingDetail}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                loadUser={loadUser}
            />
        </>
    );
};

export default UserTable;
