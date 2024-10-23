import { PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Form,
    Input,
    InputNumber,
    Modal,
    notification,
    Select,
    Space,
} from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/service.api";

const BookCreateUncontrol = (props) => {
    const { isModalCreateOpen, setIsModalCreateOpen, loadBook } = props;

    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [form] = Form.useForm();

    const resetAndCloseModal = () => {
        setIsModalCreateOpen(false);
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

    const onReset = () => {
        form.resetFields();
    };

    const onFinish = async (value) => {
        setIsLoading(true);
        if (!selectedFile) {
            notification.error({
                message: "Error create book",
                description: "Vui lòng upload ảnh thumbnail.",
            });
            setIsLoading(false);
            return;
        }
        //B1: upload thumbnail
        const resUpload = await handleUploadFile(selectedFile, "book");
        if (resUpload.data) {
            const thumbnail = resUpload.data.fileUploaded;
            const resCreateBook = await createBookAPI(
                thumbnail,
                value.mainText,
                value.author,
                value.price,
                value.quantity,
                value.category
            );

            if (resCreateBook.data) {
                resetAndCloseModal();
                await loadBook();
                notification.success({
                    message: "Create book",
                    description: "Tạo book thành công",
                });
            } else {
                notification.error({
                    message: "Error create book",
                    description: JSON.stringify(resCreateBook.message),
                });
            }
        } else {
            //upload failed
            notification.error({
                message: "Error upload thumbnail",
                description: JSON.stringify(resUpload.message),
            });
        }
        setIsLoading(false);
    };

    return (
        <Modal
            title="Create Book (uncontrolled component)"
            open={isModalCreateOpen}
            onOk={() => form.submit()}
            //loading={true}
            okButtonProps={{
                loading: isLoading,
            }}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Create"}
            footer={(_, { OkBtn, CancelBtn }) => (
                <>
                    <CancelBtn />
                    <Button
                        onClick={() => {
                            onReset();
                        }}
                    >
                        Reset
                    </Button>
                    <OkBtn />
                </>
            )}
        >
            <Form
                className="flex flex-col"
                form={form}
                name="basic"
                layout="vertical"
                onFinish={onFinish}
            >
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
                    {preview && (
                        <div className="w-40 border border-slate-200 p-[1px]">
                            <img className="object-contain" src={preview} />
                        </div>
                    )}
                </div>
            </Form>
        </Modal>
    );
};

export default BookCreateUncontrol;
