/* eslint-disable effector/mandatory-scope-binding */
import { Button, Form, Input, Layout } from "antd";
import { routes } from "../../../shared/lib/atomic-router/route";
import { PageHeader } from "../../../shared/ui/PageHeader/PageHeader";
import "./page.css";

const { Content } = Layout;

type Value = {
  nickName: string;
  password: string;
};

const users = [
  { nickName: "asd", password: "123" },
  { nickName: "qwe", password: "123" },
  { nickName: "admin", password: "123" },
];

export const SignInPage = () => {
  const onFinish = (user: Value) =>
    user.nickName === "admin" ? routes.admin.open() : routes.student.open();

  return (
    <Layout>
      <PageHeader title="Вход" />
      <Content className="Content">
        <Form
          className="Form"
          onFinish={onFinish}
          autoComplete="off"
          validateTrigger="onFinish"
        >
          <Form.Item
            name="nickName"
            rules={[
              { required: true, message: "Введите ник!" },
              () => ({
                validator(_, value) {
                  if (users.some((user) => user.nickName === value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Пользователь не существует")
                  );
                },
              }),
            ]}
          >
            <Input placeholder="ник" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Введите пароль!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    users.some(
                      (user) =>
                        user.nickName === getFieldValue("nickName") &&
                        user.password === value
                    )
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Не верный пароль"));
                },
              }),
            ]}
          >
            <Input type="password" placeholder="пароль" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};
