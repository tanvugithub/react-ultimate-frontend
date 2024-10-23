import { PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Form,
    Input,
    InputNumber,
    Modal,
    notification,
    Select,
} from "antd";
import { useEffect, useState } from "react";
import {
    createBookAPI,
    handleUploadFile,
    updateBookAPI,
} from "../../services/service.api";

const BookUpdateUncontrol = (props) => {
    const {
        isModalUpdateOpen,
        setIsModalUpdateOpen,
        dataUpdate,
        setDataUpdate,
        loadBook,
    } = props;

    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [form] = Form.useForm();

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                id: dataUpdate._id,
                mainText: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                quantity: dataUpdate.quantity,
                category: dataUpdate.category,
            });
            setPreview(
                `${import.meta.env.VITE_BACKEND_URL}/images/book/${
                    dataUpdate.thumbnail
                }`
            );
        }
    }, [dataUpdate]);

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setPreview(null);
        setSelectedFile(null);
        setDataUpdate(null);
    };

    const handleOnChangeFileCreate = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setPreview(null);
            setSelectedFile(null);
            return;
        }
        const file = event.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setSelectedFile(file);
        }
    };

    const onFinish = async (values) => {
        if (!preview && !selectedFile) {
            notification.success({
                message: "Error Update book",
                description: "Vui lòng upload ảnh thumbnail",
            });
            return;
        }

        let newThumbnail = "";
        //Nếu có ảnh preview & không có file (không chọn upload)
        if (preview && !selectedFile) {
            newThumbnail = dataUpdate.thumbnail;
        } else {
            // Có ảnh preview & có file (có chọn upload file)
            // Upload thumbnail
            const resUpload = await handleUploadFile(selectedFile, "book");
            if (resUpload.data) {
                newThumbnail = resUpload.data.fileUploaded;
            } else {
                //upload failed
                notification.error({
                    message: "Error upload thumbnail",
                    description: JSON.stringify(resUpload.message),
                });
                return;
            }
        }
        const { id, mainText, author, price, quantity, category } = values;
        // Update book data
        const resUpdateBooklAPI = await updateBookAPI(
            id,
            newThumbnail,
            mainText,
            author,
            price,
            quantity,
            category
        );

        if (resUpdateBooklAPI.data) {
            form.resetFields();
            resetAndCloseModal();
            await loadBook();
            notification.success({
                message: "Update book",
                description: "Update book thành công",
            });
        } else {
            notification.error({
                message: "Error update book",
                description: JSON.stringify(resUpdateBooklAPI.message),
            });
        }
    };

    return (
        <Modal
            title="Update Book (uncontrolled component)"
            open={isModalUpdateOpen}
            onOk={() => form.submit()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Update"}
            // footer={(_, { OkBtn, CancelBtn }) => (
            //     <>
            //         <CancelBtn />
            //         <Button
            //             onClick={() => {
            //                 onReset();
            //             }}
            //         >
            //             Reset
            //         </Button>
            //         <OkBtn />
            //     </>
            // )}
        >
            <Form
                className="flex flex-col"
                form={form}
                name="basic"
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item className="mb-3" label="Id" name="id">
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    className="mb-3"
                    label="Tiêu đề"
                    name="mainText"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tiêu đề!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    className="mb-3"
                    label="Tác giả"
                    name="author"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tác giả!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    className="mb-3"
                    label="Giá tiền"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập giá!",
                        },
                    ]}
                >
                    <InputNumber className="w-full" addonAfter="đ" />
                </Form.Item>
                <Form.Item
                    className="mb-3"
                    label="Số lượng"
                    name="quantity"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập số lượng!",
                        },
                    ]}
                >
                    <InputNumber className="w-full" />
                </Form.Item>
                <Form.Item
                    className="mb-3"
                    label="Thể loại"
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn thể loại!",
                        },
                    ]}
                >
                    <Select
                        placeholder="Chọn thể loại ..."
                        style={{ width: "100%" }}
                        //defaultValue="choose..."
                        //value={category}
                        //onChange={(value) => {}}
                        options={[
                            { value: "Arts", label: "Arts" },
                            { value: "Business", label: "Business" },
                            { value: "Comics", label: "Comics" },
                            { value: "Cooking", label: "Cooking" },
                            {
                                value: "Entertainment",
                                label: "Entertainment",
                            },
                            { value: "History", label: "History" },
                            { value: "Music", label: "Music" },
                            { value: "Sports", label: "Sports" },
                            { value: "Teen", label: "Teen" },
                            { value: "Travel", label: "Travel" },
                        ]}
                    />
                </Form.Item>

                <div className="flex flex-col gap-4 mt-3">
                    {preview && (
                        <div className="w-40 border border-slate-200 p-[1px]">
                            <img className="object-contain" src={preview} />
                        </div>
                    )}
                    <div>
                        <label
                            htmlFor="btnUploadCreate"
                            className="px-2 pr-3 py-1 bg-orange-500 hover:bg-orange-700 ring-1 ring-orange-300 text-white rounded-md cursor-pointer  transition"
                        >
                            <PlusOutlined /> Thumbnail upload
                        </label>
                        <input
                            className="invisible w-0 h-0"
                            type="file"
                            hidden
                            id="btnUploadCreate"
                            onChange={(event) =>
                                handleOnChangeFileCreate(event)
                            }
                            onClick={(event) => {
                                event.target.value = null;
                            }}
                        />
                    </div>
                    {/* {preview && (
                        <div className="w-40 border border-slate-200 p-[1px]">
                            <img className="object-contain" src={preview} />
                        </div>
                    )} */}
                </div>
            </Form>
        </Modal>
    );
};

export default BookUpdateUncontrol;
