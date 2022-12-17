import { Form, Input, Layout, Button } from "antd";
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

export const SignUpPage = () => {
  const [users, addUserFn, signupFormSubmittedFn] = useUnit([
    $users,
    addUser,
    signupFormSubmitted,
  ]);

  const onFinish = (values: User) => {
    const user = { ...values, isAdmin: false };
    delete user.confirm;
    addUserFn(user);
    signupFormSubmittedFn();
  };

  return (
    <Layout>
      <PageHeader title="Регистрация" />
      <Content className="Content--signUpPage">
        <Form
          className="Form"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
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
            <Input placeholder="ник" />
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
            <Input placeholder="фамилия" />
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
            <Input placeholder="имя" />
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
            <Input placeholder="отчество" />
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
            <Input.Password placeholder="пароль" />
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
            <Input.Password placeholder="повторите пароль" />
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
