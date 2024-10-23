//NOTE: - Sử dụng UNCONTROL COMPONENT (không kiểm soát component)
//      - Không sử dụng state

import { Button, Col, Form, Input, notification, Row } from "antd";
import { registerUserAPI } from "../services/service.api";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        //console.log(">>> check values: ", values);
        const res = await registerUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone
        );
        if (res.data) {
            notification.success({
                message: "Register user",
                description: "Đăng ký user thành công",
            });
            navigate("/login");
        } else {
            notification.error({
                message: "Register user error",
                description: JSON.stringify(res.message),
            });
        }
    };

    return (
        <div className="pt-8 px-5">
            <div className="text-3xl font-bold text-center mb-8">
                Đăng ký tài khoản
            </div>
            <Form
                form={form}
                name="basic"
                layout="vertical"
                onFinish={onFinish}
            >
                <Row justify={"center"}>
                    <Col xs={24} md={12} xl={8} xxl={6}>
                        <Form.Item
                            label="Full Name"
                            name="fullName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your full name!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={12} xl={8} xxl={6}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={12} xl={8} xxl={6}>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={12} xl={8} xxl={6}>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your phone!",
                                },
                                {
                                    //required: true,
                                    //type: "regexp",
                                    pattern: new RegExp(/\d+/g),
                                    message: "Wrong format!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                {/* <button
                    type="submit"
                    className="px-3 py-[5px] bg-blue-500 text-white font-bold hover:bg-blue-600 rounded-md transition"
                >
                    Register
                </button> */}
                <Row justify={"center"}>
                    <Col xs={24} md={12} xl={8} xxl={6}>
                        <Form.Item>
                            <Button
                                type="primary"
                                onClick={() => {
                                    form.submit();
                                }}
                            >
                                Register
                            </Button>
                            <Button
                                className="ml-2"
                                onClick={() => {
                                    form.setFieldsValue({
                                        fullName: "user test 1",
                                        email: "vunguyen@gmail.com",
                                        phone: "0908252797",
                                    });
                                    console.log(
                                        ">>> check form: ",
                                        form.getFieldsValue()
                                    );
                                }}
                            >
                                Test
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={12} xl={8} xxl={6}>
                        <div className="border-t text-center pt-5">
                            Đã có tài khoản?{" "}
                            <Link
                                to="/login"
                                className="text-blue-500 underline"
                            >
                                Đăng nhập tại đây
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default RegisterPage;
