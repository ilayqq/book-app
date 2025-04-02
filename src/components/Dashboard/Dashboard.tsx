import React from "react";
import { Layout, Menu, Button } from "antd";
import {
    UserOutlined,
    BookOutlined,
    BarChartOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

export const Dashboard: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible>
                <div style={{ color: "#fff", textAlign: "center", padding: 16, fontWeight: 600 }}>
                    Oyukitap Admin
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={[
                        {
                            key: "/dashboard/books",
                            icon: <BookOutlined />,
                            label: <Link to="/dashboard/books">Книги</Link>,
                        },
                        {
                            key: "/dashboard/users",
                            icon: <UserOutlined />,
                            label: <Link to="/dashboard/users">Пользователи</Link>,
                        },
                        {
                            key: "/dashboard/analytics",
                            icon: <BarChartOutlined />,
                            label: <Link to="/dashboard/analytics">Аналитика</Link>,
                        },
                    ]}
                />
            </Sider>

            <Layout>
                <Header
                    style={{
                        background: "#fff",
                        padding: "0 16px",
                        textAlign: "right",
                    }}
                >
                    <Button onClick={handleLogout}>Выйти</Button>
                </Header>

                <Content style={{ margin: "16px", padding: "0 16px" }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};