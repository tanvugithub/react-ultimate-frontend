import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, notification, Popconfirm, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { deleteBookAPI, fetchBookAPI } from "../../services/service.api";
import BookDetailDrawer from "./book.detail.drawer";
//import BookCreateControl from "./book.create.control";
import BookCreateUncontrol from "./book.create.uncontrol";
import BookUpdateUncontrol from "./book.update.uncontrol";
import BookUpdateControl from "./book.update.control";

const BookTable = () => {
    const [dataBooks, setDataBooks] = useState([]);

    const [current, setCurrent] = useState(1); // current page
    const [pageSize, setPageSize] = useState(4); // 4 phần tử trên/trang
    const [total, setTotal] = useState(0); // mặc định tổng số phần tử là 0

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isLoadingDetail, setIsLoadingDetail] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);
    const [dataUpdate, setDataUpdate] = useState(null);

    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const [loadingTable, setLoadingTable] = useState();

    //KHÔNG SỬ DỤNG useCallback()
    //Code đang ok
    // useEffect(() => {
    //     loadBook();
    // }, [current, pageSize]);

    // const loadBook = async () => {
    //     setLoadingTable(true);
    //     const res = await fetchBookAPI(current, pageSize);
    //     if (res.data) {
    //         setDataBooks(res.data.result);
    //         setCurrent(res.data.meta.current);
    //         setPageSize(res.data.meta.pageSize);
    //         setTotal(res.data.meta.total);
    //     }
    //     setLoadingTable(false);
    // };

    //SỬ DỤNG useCallback()
    const loadBook = useCallback(async () => {
        setLoadingTable(true);
        const res = await fetchBookAPI(current, pageSize);
        if (res.data) {
            setDataBooks(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
        setLoadingTable(false);
    }, [current, pageSize]);

    useEffect(() => {
        loadBook();
    }, [loadBook]);

    const handleCancelDelete = (event) => {
        message.error("Bạn đã chọn không xóa");
    };

    const handleConfirmDelete = async (id) => {
        const res = await deleteBookAPI(id);
        if (res.data) {
            notification.success({
                message: "Delete book",
                description: "Xóa book thành công",
            });
            await loadBook();
        } else {
            notification.success({
                message: "Delete book error",
                description: JSON.stringify(res.message),
            });
        }
    };

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => {
                return <>{index + 1 + (current - 1) * pageSize}</>;
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
                        onClick={(event) => {
                            event.preventDefault();
                            setDataDetail(record);
                            setIsDetailOpen(true);
                            setIsLoadingDetail(true);
                            setTimeout(() => {
                                setIsLoadingDetail(false);
                            }, 500);
                        }}
                    >
                        {record._id}
                    </a>
                </>
            ),
        },
        {
            title: "Tiêu đề",
            dataIndex: "mainText",
        },
        {
            title: "Giá tiền",
            dataIndex: "price",
            render: (text, record, index, action) => {
                if (text)
                    return new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }).format(text);
            },
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
        },
        {
            title: "Tác giả",
            dataIndex: "author",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <div className="flex gap-7">
                    <EditOutlined
                        className="cursor-pointer text-green-700"
                        onClick={() => {
                            setIsModalUpdateOpen(true); //show modal update
                            setDataUpdate(record); // lấy record table đưa vô state để truyền qua modal
                        }}
                    />
                    <Popconfirm
                        title="Delete the task"
                        description={`Bạn có chắc chắn muốn xóa book ${record.mainText}?`}
                        onConfirm={() => handleConfirmDelete(record._id)}
                        onCancel={handleCancelDelete}
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

    //Sự kiện khi click phân trang
    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current);
            }
        }

        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize);
            }
        }
    };

    return (
        <>
            <div className="flex justify-between mt-7">
                <h3>Books Table</h3>
                <Button
                    type="primary"
                    onClick={() => setIsModalCreateOpen(true)}
                >
                    Create Book
                </Button>
            </div>

            <Table
                className="mt-7"
                dataSource={dataBooks}
                columns={columns}
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
                loading={loadingTable}
            />

            <BookDetailDrawer
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isLoadingDetail={isLoadingDetail}
                loadBook={loadBook}
            />

            {/* <BookCreateControl
                isModalCreateOpen={isModalCreateOpen}
                setIsModalCreateOpen={setIsModalCreateOpen}
                loadBook={loadBook}
            /> */}

            <BookCreateUncontrol
                isModalCreateOpen={isModalCreateOpen}
                setIsModalCreateOpen={setIsModalCreateOpen}
                loadBook={loadBook}
            />

            {/* <BookUpdateControl
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadBook={loadBook}
            /> */}
            <BookUpdateUncontrol
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadBook={loadBook}
            />
        </>
    );
};

export default BookTable;
