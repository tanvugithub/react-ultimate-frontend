//NOTE: component này là thằng con của thằng cha là user.table.jsx
import { useState } from "react";
import { Button, Drawer, notification } from "antd";
import {
    handleUploadFile,
    updateUserAvatarAPI,
} from "../../services/service.api";

const UserDetailDrawer = (props) => {
    const {
        isOpenDetail,
        setIsOpenDetail,
        isLoadingDetail,
        dataDetail,
        setDataDetail,
        loadUser,
    } = props;

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const resetAndCloseDetail = () => {
        setIsOpenDetail(false);
        setDataDetail(null); // vì  khi close detail, nếu dataDetail không thay đổi thì useEffect ở trên không chạy nữa
    };

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file)); // tạo đường dẫn file preview
        }
    };

    const handleUpdateUserAvatar = async () => {
        //step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, "avatar"); // keyword "avatar" được nhận diện xử lý phía backend
        if (resUpload.data) {
            //upload file success
            const newAvatar = resUpload.data.fileUploaded;
            //step 2: update file name data
            const resUpdateAvatarAPI = await updateUserAvatarAPI(
                newAvatar,
                dataDetail._id,
                dataDetail.fullName,
                dataDetail.phone
            );
            if (resUpdateAvatarAPI.data) {
                resetAndCloseDetail();
                setSelectedFile(null);
                setPreview(null);
                await loadUser();

                notification.success({
                    message: "Update user avatar",
                    description: "Cập nhật avatar thành công",
                });
            } else {
                //failed
                notification.error({
                    message: "Error update user avatar",
                    description: JSON.stringify(resUpdateAvatarAPI.message),
                });
            }
        } else {
            //upload file fail
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message),
            });
        }
    };

    return (
        <>
            <Drawer
                width={"40vw"}
                closable
                destroyOnClose
                title={<p>View Detail</p>}
                placement="right"
                open={isOpenDetail}
                loading={isLoadingDetail}
                onClose={() => resetAndCloseDetail(false)}
                maskClosable={false}
            >
                {dataDetail ? (
                    <>
                        <p>id: {dataDetail._id}</p>
                        <p>Name: {dataDetail.fullName}</p>
                        <p>Phone: {dataDetail.phone}</p>
                        <div className="flex gap-5 mt-5">
                            <span className="font-bold">Avatar</span>
                            <div className="flex flex-col gap-3">
                                <div className="w-40 h-40 border border-slate-200 p-[1px]">
                                    <img
                                        className="object-contain"
                                        src={`${
                                            import.meta.env.VITE_BACKEND_URL
                                        }/images/avatar/${dataDetail.avatar}`}
                                    />
                                </div>
                                <div>
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
                                </div>
                                {preview && (
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
                                                    handleUpdateUserAvatar()
                                                }
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <p>Data not found</p>
                    </>
                )}
            </Drawer>
        </>
    );
};

export default UserDetailDrawer;
