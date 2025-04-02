import { useEffect, useState } from "react";
import { Button, Card, Form, Image, Input, InputNumber, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";

interface Book {
    title: string;
    author: string;
    price: number;
    filePath?: string;
    coverPath?: string;
}

export const EditBook: React.FC = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [bookData, setBookData] = useState<Book | null>(null);
    const [bookFile, setBookFile] = useState<File | null>(null);
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const fetchBook = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/Books/${id}`);
            form.setFieldsValue(response.data);
            setBookData(response.data);
        } catch {
            message.error("Ошибка загрузки книги");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBook();
    }
        , [id]);

    const onFinish = async (values: any) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("author", values.author);
        formData.append("price", values.price);

        if (coverFile) {
            formData.append("cover", coverFile);
        }

        if (bookFile) {
            formData.append("file", bookFile);
        }

        try {
            await api.put(`/Books/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            message.success("Книга обновлена");
            navigate("/books");
        } catch {
            message.error("Ошибка обновления книги");
        }
    };

    return (
        <Card title="Редактирование книги" style={{ maxWidth: 700, margin: "0 auto" }}>
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item
                    name="title"
                    label="Название"
                    rules={[{ required: true, message: "Введите название книги" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="author"
                    label="Автор"
                    rules={[{ required: true, message: "Введите имя автора" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="Цена"
                    rules={[{ required: true, message: "Введите цену" }]}
                >
                    <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item label="Обложка">
                    {bookData?.coverPath && (
                        <div style={{ marginBottom: 8 }}>
                            {/* <img
                                src={"http://213.109.146.205:5052/" + bookData.coverPath}
                                alt="Обложка"
                                style={{ width: 100, height: "auto", borderRadius: 4 }}
                            /> */}
                            <Image
                                src={"http://213.109.146.205:5052/" + bookData.coverPath}
                                alt="Обложка"
                                style={{ width: 100, height: "auto", borderRadius: 4 }}
                                preview={true}
                            />
                        </div>
                    )}
                    <Upload
                        beforeUpload={(file) => {
                            setCoverFile(file);
                            return false; // не загружать автоматически
                        }}
                        maxCount={1}
                        accept="image/*"
                    >
                        <Button icon={<UploadOutlined />}>Выбрать изображение</Button>
                    </Upload>
                </Form.Item>

                <Form.Item label="Файл книги">
                    {bookData?.filePath && (
                        <div style={{ marginBottom: 8 }}>
                            <a href={"http://213.109.146.205:5052/" + bookData.filePath} target="_blank" rel="noopener noreferrer">
                                Скачать текущий файл
                            </a>
                        </div>
                    )}
                    <Upload
                        beforeUpload={(file) => {
                            setBookFile(file);
                            return false;
                        }}
                        maxCount={1}
                        accept=".pdf,.epub,.docx"
                    >
                        <Button icon={<UploadOutlined />}>Выбрать файл книги</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Сохранить изменения
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};