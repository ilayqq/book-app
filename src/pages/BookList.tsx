import React, { useEffect, useState } from "react";
import { Button, message, Space, Table, Popconfirm, Image, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const { Search } = Input;

interface Book {
    id: number;
    title: string;
    author: string;
    price: number;
    coverPath?: string;
}

export const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await api.get("/books");
            setBooks(response.data);
            setFilteredBooks(response.data); // 👈 инициализируем фильтр
        } catch {
            message.error("Не удалось загрузить книги");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (value: string) => {
        const lower = value.toLowerCase();
        const filtered = books.filter(
            (book) =>
                book.title.toLowerCase().includes(lower) ||
                book.author.toLowerCase().includes(lower)
        );
        setFilteredBooks(filtered);
    };

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/books/${id}`);
            message.success("Книга удалена");
            fetchBooks();
        } catch {
            message.error("Ошибка при удалении книги");
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const columns = [
        {
            title: "Обложка",
            dataIndex: "coverPath",
            key: "coverPath",
            render: (coverPath: string | undefined) =>
                coverPath ? (
                    <Image
                        src={"http://213.109.146.205:5052/" + coverPath}
                        alt="Обложка"
                        width={50}
                        height={70}
                        style={{ objectFit: "cover", borderRadius: 4 }}
                        preview={true}
                    />
                ) : (
                    <span style={{ color: "#aaa" }}>Нет</span>
                ),
        },
        {
            title: "Название",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Автор",
            dataIndex: "author",
            key: "author",
        },
        {
            title: "Цена",
            dataIndex: "price",
            key: "price",
            render: (price: number) => `${price} ₸`,
        },
        {
            title: "Действия",
            key: "actions",
            render: (_: any, record: Book) => (
                <Space>
                    <Button
                        type="primary"
                        onClick={() => navigate(`/dashboard/books/edit/${record.id}`)}
                    >
                        Редактировать
                    </Button>
                    <Popconfirm
                        title="Удалить эту книгу?"
                        okText="Да"
                        cancelText="Нет"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button danger>Удалить</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Space style={{ marginBottom: 16, width: "100%", justifyContent: "space-between" }}>
                <Search
                    placeholder="Поиск по названию или автору"
                    allowClear
                    enterButton="Поиск"
                    onSearch={handleSearch}
                    style={{ maxWidth: 400 }}
                />
                <Button type="primary" onClick={() => navigate("/dashboard/books/add")}>
                    Добавить книгу
                </Button>
            </Space>

            <Table
                dataSource={filteredBooks}
                columns={columns}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 10 }}
            />
        </>
    );
};