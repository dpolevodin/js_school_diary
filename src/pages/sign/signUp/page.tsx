import { Form, Input, Layout, Button, Spin } from "antd";
import uuid from "react-uuid";
import { useUnit } from "effector-react";
import { PageHeader } from "../../../shared/ui/PageHeader/PageHeader";
import { $users, addUser } from "./model";
import "./page.css";
import {
  nameRules,
  passwordRules,
  patronymicRules,
  surnameRules,
} from "../rules";
import { signUpFx } from "../../../entities/signUp/model";
import { $loading } from "../../../shared/lib/api/session";

const { Content } = Layout;

type User = {
  nickName: string;
  name: string;
  surname: string;
  patronymic: string;
  password: never;
  confirm: never;
};

const deletePassword = (user: User) => {
  const userData = { ...user, id: uuid() };
  delete userData.password;
  delete userData.confirm;
  return userData;
};

export const SignUpPage = () => {
  const [users, addUserFn, signUpFn, loading] = useUnit([
    $users,
    addUser,
    signUpFx,
    $loading,
  ]);

  const handleFinish = (values: User) => {
    const user = deletePassword(values);
    const usersPayload = [...users, user];
    addUserFn(user);
    signUpFn({ id: user.id, users: usersPayload });
  };

  return (
    <Layout>
      <PageHeader title="Регистрация" />
      <Content className="Content--signUpPage">
        <Spin size="large" spinning={loading} wrapperClassName="Content_spin">
          <Form
            className="Form"
            wrapperCol={{ span: 6, offset: 9 }}
            name="register"
            onFinish={handleFinish}
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
            <Form.Item name="surname" rules={surnameRules}>
              <Input placeholder="фамилия" allowClear />
            </Form.Item>
            <Form.Item name="name" rules={nameRules}>
              <Input placeholder="имя" allowClear />
            </Form.Item>
            <Form.Item name="patronymic" rules={patronymicRules}>
              <Input placeholder="отчество" allowClear />
            </Form.Item>

            <Form.Item name="password" rules={passwordRules} hasFeedback>
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
                    return Promise.reject(new Error("Пароли не совпадают!"));
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
        </Spin>
      </Content>
    </Layout>
  );
};
