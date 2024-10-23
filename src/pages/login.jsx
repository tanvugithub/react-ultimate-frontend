import { ArrowRightOutlined } from "@ant-design/icons";
import {
    Button,
    Col,
    Divider,
    Flex,
    Form,
    Input,
    message,
    notification,
    Row,
} from "antd";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/service.api";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    const { setUser } = useContext(AuthContext);

    const onFinish = async (values) => {
        setIsLoading(true);
        const res = await loginAPI(values.email, values.password);
        if (res.data) {
            message.success("Đăng nhập thành công");
            localStorage.setItem("access_token", res.data.access_token); // lưu access_token vào localStorage
            setUser(res.data.user); // *** NOTE: hàm này là 1 useState trong auth.context.jsx
            navigate("/");
        } else {
            notification.error({
                message: "Error login",
                description: JSON.stringify(res.message),
            });
        }
        setIsLoading(false);
    };
    return (
        <Row justify={"center"} className="p-6">
            <Col xs={24} md={12} xl={8} xxl={5}>
                <fieldset className="border border-slate-300 rounded-md p-5">
                    <legend className="font-bold text-2xl">Đăng nhập</legend>
                    <Form
                        form={form}
                        name="basic"
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Email không được để trống!",
                                },
                                {
                                    type: "email",
                                    message: "Email sai định dạng!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Mật khẩu không được để trống!",
                                },
                            ]}
                        >
                            <Input.Password
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        form.submit();
                                    }
                                }}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Flex justify="space-between" align="center">
                                <Button
                                    loading={isLoading}
                                    type="primary"
                                    onClick={() => {
                                        form.submit();
                                    }}
                                >
                                    Login
                                </Button>
                                <NavLink className="text-blue-500" to="/">
                                    Go to homepage <ArrowRightOutlined />
                                </NavLink>
                            </Flex>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <div className="text-center">
                        Chưa có tài khoản?{" "}
                        <Link
                            to="/register"
                            className="text-blue-500 underline"
                        >
                            Đăng ký tại đây
                        </Link>
                    </div>
                </fieldset>
            </Col>
        </Row>
    );
};

export default LoginPage;
