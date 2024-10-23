import { Button, Input, Modal, notification } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/service.api";


const UserForm = (props) => {

    const { loadUser } = props;

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmitBtn = async () => {
        //service call
        const res = await createUserAPI(fullName, email, password, phone);

        //=> backend trả ra res.data.data 
        //=> nhưng đã cấu hình phần interceptors ở file ./axios.customize.js
        //=> nên chỉ còn res.data
        if (res.data) {
            //Antd notification
            notification.success({
                message: "Create user",
                description: "Tạo user thành công"
            });
            resetAndCloseModal();
            await loadUser(); // props in parent user.jsx
        } else {
            notification.error({
                message: "Create user",
                description: JSON.stringify(res.message)
            });
        }
    }

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
    }

    return (
        <div>
            <div className="flex justify-between">
                <h3>Users Table</h3>
                <Button
                    type="primary"
                    onClick={() => setIsModalOpen(true)}
                >
                    Create User
                </Button>
            </div>
            <Modal
                title="Create User"
                open={isModalOpen}
                onOk={() => handleSubmitBtn()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"Create"}
            >
                <div className="user-form flex flex-col gap-4">
                    <div>
                        <span>FullName</span>
                        <Input
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password
                            placeholder="input password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
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
        </div>
    )
}

export default UserForm;