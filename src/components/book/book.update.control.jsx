import { Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookAPI } from "../../services/service.api";

const BookUpdateControl = (props) => {
    const {
        isModalUpdateOpen,
        setIsModalUpdateOpen,
        dataUpdate,
        setDataUpdate,
        loadBook,
    } = props;

    const [id, setId] = useState("");
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");

    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id);
            setMainText(dataUpdate.mainText);
            setAuthor(dataUpdate.author);
            setPrice(dataUpdate.price);
            setQuantity(dataUpdate.quantity);
            setCategory(dataUpdate.category);

            setPreview(
                `${import.meta.env.VITE_BACKEND_URL}/images/book/${
                    dataUpdate.thumbnail
                }`
            );
        }
    }, [dataUpdate]);

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);

        setId(null);
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setPreview(null);
        setSelectedFile(null);

        setDataUpdate(null);
    };

    const handleOnChangeFileUpdate = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setPreview(null);
            return;
        }
        const file = event.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setSelectedFile(file);
        }
    };

    const handleSubmitBtn = async () => {
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
            notification.success({
                message: "Update book",
                description: "Update book thành công",
            });
            resetAndCloseModal();
            await loadBook(); // props in parent book.table.jsx
        } else {
            notification.error({
                message: "Error update book",
                description: JSON.stringify(resUpdateBooklAPI.message),
            });
        }
    };

    return (
        <Modal
            title="Update Book (controlled component)"
            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Update"}
        >
            <div className="user-form flex flex-col gap-4">
                <div>
                    <label htmlFor="mainText">Id</label>
                    <Input id="id" value={id} disabled />
                </div>
                <div>
                    <label htmlFor="mainText">Tiêu đề</label>
                    <Input
                        id="mainText"
                        value={mainText}
                        onChange={(event) => setMainText(event.target.value)}
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
                        {preview && (
                            <div className="w-40 border border-slate-200 p-[1px]">
                                <img className="object-contain" src={preview} />
                            </div>
                        )}
                        <div>
                            <label
                                htmlFor="btnUploadUpdate"
                                className="px-4 py-1 bg-orange-500 text-white font-bold rounded-md cursor-pointer hover:bg-orange-700 transition"
                            >
                                Upload
                            </label>
                            <input
                                type="file"
                                hidden
                                id="btnUploadUpdate"
                                onChange={(event) =>
                                    handleOnChangeFileUpdate(event)
                                }
                            />
                        </div>
                        {/* {preview && (
                            <div className="flex flex-col gap-2">
                                <div className="w-40 border border-slate-200 p-[1px]">
                                    <img
                                        className="object-contain"
                                        src={preview}
                                    />
                                </div>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default BookUpdateControl;
