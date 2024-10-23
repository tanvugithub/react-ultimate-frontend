import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import {
    handleUploadFile,
    updateBookThumbnailAPI,
} from "../../services/service.api";

const BookDetailDrawer = (props) => {
    const {
        isDetailOpen,
        setIsDetailOpen,
        dataDetail,
        setDataDetail,
        isLoadingDetail,
        loadBook,
    } = props;

    // const [preview, setPreview] = useState(null);
    // const [selectedFile, setSelectedFile] = useState(null);

    const resetAndCloseDetail = () => {
        setIsDetailOpen(false);
        setDataDetail(null);
    };

    const formatPrice = (value) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(value);
    };

    // const handleOnChangeFile = (event) => {
    //     if (!event.target.files || event.target.files.length === 0) {
    //         setPreview(null);
    //         setSelectedFile(null);
    //         return;
    //     }
    //     const file = event.target.files[0];
    //     if (file) {
    //         setPreview(URL.createObjectURL(file));
    //         setSelectedFile(file);
    //     }
    // };

    // const handleUpdateBookThumbnail = async () => {
    //     const resUpload = await handleUploadFile(selectedFile, "book");
    //     if (resUpload.data) {
    //         const thumbnail = resUpload.data.fileUploaded;

    //         const resUpdateBookThumbnailAPI = await updateBookThumbnailAPI(
    //             thumbnail,
    //             dataDetail._id,
    //             dataDetail.mainText,
    //             dataDetail.author,
    //             dataDetail.price,
    //             dataDetail.quantity,
    //             dataDetail.category
    //         );

    //         if (resUpdateBookThumbnailAPI.data) {
    //             resetAndCloseDetail();
    //             setSelectedFile(null);
    //             setPreview(null);
    //             await loadBook();
    //             notification.success({
    //                 message: "Update book thumbnail",
    //                 description: "Cập nhật thumbnail thành công",
    //             });
    //         } else {
    //             notification.error({
    //                 message: "Error update book thumbnail",
    //                 description: JSON.stringify(
    //                     resUpdateBookThumbnailAPI.message
    //                 ),
    //             });
    //         }
    //     } else {
    //         notification.error({
    //             message: "Error upload file",
    //             description: JSON.stringify(resUpload.message),
    //         });
    //     }
    // };

    return (
        <Drawer
            width={"40vw"}
            closable
            destroyOnClose
            placement="right"
            title={dataDetail && dataDetail.mainText}
            onClose={() => resetAndCloseDetail()}
            open={isDetailOpen}
            maskClosable={true}
            loading={isLoadingDetail}
        >
            {dataDetail ? (
                <>
                    <p>id: {dataDetail._id}</p>
                    <p>Title: {dataDetail.mainText}</p>
                    <p>Price: {formatPrice(dataDetail.price)}</p>
                    <div className="flex gap-5 mt-5">
                        <span className="font-bold">Image:</span>
                        <div className="flex flex-col gap-3">
                            <div className="w-40 border border-slate-200 p-[1px]">
                                <img
                                    className="object-contain"
                                    src={`${
                                        import.meta.env.VITE_BACKEND_URL
                                    }/images/book/${dataDetail.thumbnail}`}
                                />
                            </div>
                            {/* <div>
                                <label
                                    htmlFor="btnUpload"
                                    className="px-4 py-1 bg-blue-500 text-white font-bold rounded-md cursor-pointer hover:bg-blue-700 transition"
                                >
                                    Upload
                                </label>
                                <input
                                    type="file"
                                    hidden
                                    id="btnUpload"
                                    onChange={(event) =>
                                        handleOnChangeFile(event)
                                    }
                                />
                            </div> */}

                            {/* {preview && (
                                <div className="flex flex-col gap-2">
                                    <div className="w-40 h-40 border border-slate-200 p-[1px]">
                                        <img
                                            className="object-contain"
                                            src={preview}
                                        />
                                    </div>

                                    <div>
                                        <Button
                                            className="bg-green-500"
                                            onClick={() =>
                                                handleUpdateBookThumbnail()
                                            }
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            )} */}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <p>Data not found</p>
                </>
            )}
        </Drawer>
    );
};

export default BookDetailDrawer;
