import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../store/slices/authSlice";
import { Button, Card, Form, Input, message } from "antd";
import { api } from "../services/api";
import FormItem from "antd/es/form/FormItem";

export const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form] = Form.useForm();
    form.setFieldValue("email", "daulet@mail.ri");
    form.setFieldValue("password", "85191999");

    const onFinish = async (values: { email: string; password: string }) => {
        setLoading(true);
        try {
            const response = await api.post("/Auth/login", values);
            dispatch(
                loginSuccess({
                    user: response.data.user,
                    token: response.data.token,
                })
            );
            message.success("Успешный вход");
            navigate("/dashboard");
        } catch (error) {
            message.error("Ошибка авторизации");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Вход в админку" style={{ width: 400, margin: "100px auto" }}>
            <Form name="login" onFinish={onFinish} form={form}>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: "Введите email" }]}
                >
                    <Input type="email" placeholder="Email" />
                </Form.Item>
                <FormItem
                    name="password"
                    rules={[{ required: true, message: "Введите пароль" }]}
                >
                    <Input.Password placeholder="Пароль" />
                </FormItem>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}