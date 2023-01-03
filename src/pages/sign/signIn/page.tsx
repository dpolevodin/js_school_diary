import { Button, Form, Input, Layout } from "antd";
import { useUnit } from "effector-react";
import { PageHeader } from "../../../shared/ui/PageHeader/PageHeader";
import { $adminIds, $users } from "../signUp/model";
import { signInAdmin, signInUser } from "./model";
import "./page.css";

const { Content } = Layout;

type Value = {
  nickName: string;
  password: string;
};

export const SignInPage = () => {
  const [signInAdminFn, signInUserFn, users, adminIds] = useUnit([
    signInAdmin,
    signInUser,
    $users,
    $adminIds,
  ]);

  const handleFinish = ({ nickName }: Value) => {
    const userIndex = users.findIndex(
      (userData) => userData.nickName === nickName
    );
    return adminIds.includes(users[userIndex].id)
      ? signInAdminFn()
      : signInUserFn();
  };

  return (
    <Layout>
      <PageHeader title="Вход" />
      <Content className="Content--signInPage">
        <Form
          className="Form"
          wrapperCol={{ span: 6, offset: 9 }}
          onFinish={handleFinish}
          autoComplete="off"
          validateTrigger="onSubmit"
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
            <Input placeholder="ник" allowClear />
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
            <Input type="password" placeholder="пароль" allowClear />
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