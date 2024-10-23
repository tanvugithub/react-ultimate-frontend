import { Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/service.api";

const BookCreateControl = (props) => {
    const { isModalCreateOpen, setIsModalCreateOpen, loadBook } = props;

    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const resetAndCloseModal = () => {
        //RESET VALUE
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setPreview(null);
        setSelectedFile(null);
        //CLOSE MODAL
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

    const handleSubmitBtn = async () => {
        // B1: Validate selectedFile
        if (!selectedFile) {
            notification.error({
                message: "Error create book",
                description: "Vui lòng upload ảnh thumbnail.",
            });
            return;
        }

        // B2: upload thumbnail
        const resUpload = await handleUploadFile(selectedFile, "book");
        if (resUpload.data) {
            //B2: call API update database
            const thumbnail = resUpload.data.fileUploaded;
            const resCreateBook = await createBookAPI(
                thumbnail,
                mainText,
                author,
                price,
                quantity,
                category
            );
            if (resCreateBook.data) {
                resetAndCloseModal();
                await loadBook(); // props in parent book.table.jsx
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
    };

    // console.log(">>> check preview  in CREAT FORM: ", preview);
    // console.log(">>> check selectedFile  in CREAT FORM: ", selectedFile);

    return (
        <div className="mt-7">
            <Modal
                title="Create Book"
                open={isModalCreateOpen}
                onOk={() => handleSubmitBtn()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"Create"}
            >
                <div className="user-form flex flex-col gap-4">
                    <div>
                        <label htmlFor="mainText">Tiêu đề</label>
                        <Input
                            id="mainText"
                            value={mainText}
                            onChange={(event) =>
                                setMainText(event.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="author">Tác giả</label>
                        <Input
                            id="author"
                            value={author}
                            onChange={(event) => setAuthor(event.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="price">Giá tiền</label>
                        <InputNumber
                            className="w-full"
                            id="price"
                            addonAfter="đ"
                            value={price}
                            onChange={(value) => setPrice(value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="quantity">Số lượng</label>
                        <InputNumber
                            className="w-full"
                            id="quantity"
                            // min={1000}
                            // max={100000}
                            //defaultValue={quantity}
                            value={quantity}
                            onChange={(value) => setQuantity(value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="category">Thể loại</label>
                        <Select
                            id="category"
                            defaultValue="choose..."
                            value={category}
                            style={{ width: "100%" }}
                            onChange={(value) => setCategory(value)}
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
                    </div>
                    <div className="flex gap-5">
                        <span className="font-bold">Thumbnail:</span>
                        <div className="flex flex-col gap-3">
                            <div>
                                <label
                                    htmlFor="btnUploadCreate"
                                    className="px-4 py-1 bg-orange-500 text-white font-bold rounded-md cursor-pointer hover:bg-orange-700 transition"
                                >
                                    Upload
                                </label>
                                <input
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
                                <div className="flex flex-col gap-2">
                                    <div className="w-40 border border-slate-200 p-[1px]">
                                        <img
                                            className="object-contain"
                                            src={preview}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default BookCreateControl;
