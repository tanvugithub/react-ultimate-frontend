//NOTE: component này là thằng cháu của thằng cha là pages/user.jsx
import { Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { updateUserAPI } from "../../services/service.api";

const UpdateUserModal = (props) => {
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");

    const {
        isModalUpdateOpen,
        setIsModalUpdateOpen,
        dataUpdate,
        setDataUpdate,
        loadUser, // props từ ông nội (user) truyền qua cha (user.table) rồi qua cháu (update.user.modal)
    } = props;

    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id);
            setFullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
        }
    }, [dataUpdate]);

    const handleSubmitBtn = async () => {
        //service call
        const res = await updateUserAPI(id, fullName, phone);

        //=> backend trả ra res.data.data
        //=> nhưng đã cấu hình phần interceptors ở file ./axios.customize.js
        //=> nên chỉ còn res.data
        if (res.data) {
            //Antd notification
            notification.success({
                message: "Update user",
                description: "Cập nhật user thành công",
            });
            resetAndCloseModal();
            await loadUser(); // chạy function ở ÔNG NỘI user.jsx
        } else {
            notification.error({
                message: "Update user",
                description: JSON.stringify(res.message),
            });
        }
    };

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setId("");
        setFullName("");
        setPhone("");
        setDataUpdate(null); // vì  khi close modal, nếu dataUpdate không thay đổi thì useEffect ở trên không chạy nữa
    };

    return (
        <Modal
            title="Update User"
            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"SAVE"}
        >
            <div className="user-form flex flex-col gap-4">
                <div>
                    <span>Id</span>
                    <Input value={id} disabled />
                </div>
                <div>
                    <span>FullName</span>
                    <Input
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                    />
                </div>
                <div>
                    <span>Phone Number</span>
                    <Input
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default UpdateUserModal;
