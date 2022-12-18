import { Form, Input, Layout, Button } from "antd";
import uuid from "react-uuid";
import { useUnit } from "effector-react";
import { PageHeader } from "../../../shared/ui/PageHeader/PageHeader";
import { $users, addUser, signupFormSubmitted } from "./model";
import "./page.css";

const { Content } = Layout;

type User = {
  nickName: string;
  name: string;
  surname: string;
  patronymic: string;
  password: string;
  confirm: never;
};

const deleteConfirmAddId = (user: User) => {
  const userData = { ...user, id: uuid() };
  delete userData.confirm;
  return userData;
};

export const SignUpPage = () => {
  const [users, addUserFn, signupFormSubmittedFn] = useUnit([
    $users,
    addUser,
    signupFormSubmitted,
  ]);

  const onFinish = (values: User) => {
    addUserFn(deleteConfirmAddId(values));
    signupFormSubmittedFn();
  };

  return (
    <Layout>
      <PageHeader title="Регистрация" />
      <Content className="Content--signUpPage">
        <Form
          className="Form"
          wrapperCol={{ span: 6, offset: 9 }}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="nickName"
            rules={[
              {
                required: true,
                message: "Введите ник!",
                whitespace: true,
              },
              () => ({
                validator(_, value) {
                  if (users.every((user) => user.nickName !== value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Такой ник занят!"));
                },
              }),
            ]}
          >
            <Input placeholder="ник" allowClear />
          </Form.Item>
          <Form.Item
            name="surname"
            rules={[
              {
                required: true,
                message: "Please input your surname!",
                whitespace: true,
              },
              {
                pattern: /^[А-ЯЁ][а-яё]*$/,
                message: "Введите фамилию с заглавной буквы",
              },
            ]}
          >
            <Input placeholder="фамилия" allowClear />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Введите имя!",
                whitespace: true,
              },
              {
                pattern: /^[А-ЯЁ][а-яё]*$/,
                message: "Введите имя с заглавной буквы",
              },
            ]}
          >
            <Input placeholder="имя" allowClear />
          </Form.Item>
          <Form.Item
            name="patronymic"
            rules={[
              {
                required: true,
                message: "Введите отчество!",
                whitespace: true,
              },
              {
                pattern: /^[А-ЯЁ][а-яё]*$/,
                message: "Введите отчество с заглавной буквы",
              },
            ]}
          >
            <Input placeholder="отчество" allowClear />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Введите пароль!",
              },
              {
                min: 8,
                message: "Пароль должен содержать не менее 8 символов",
              },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s])/,
                message:
                  "пароль должен содержать минимум: 1 символ, 1 заглавную букву, 1 цифру",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="пароль" allowClear />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Подтвердите пароль!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="повторите пароль" allowClear />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Создать
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};
