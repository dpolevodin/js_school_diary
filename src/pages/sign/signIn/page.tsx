import { Button, Form, Input, Layout, Spin } from "antd";
import { useUnit } from "effector-react";
import { signInFx } from "../../../entities/signIn/model";
import { PageHeader } from "../../../shared/ui/PageHeader/PageHeader";
import { createSessionFx } from "../../../entities/auth/session";
import { $users } from "../signUp/model";
import "./page.css";

const { Content } = Layout;

type Value = {
  nickName: string;
  password: string;
};

export const SignInPage = () => {
  const [users, signInFn, loading] = useUnit([
    $users,
    signInFx,
    createSessionFx.pending,
  ]);

  const handleFinish = ({ nickName, password }: Value) => {
    const user = users.find((userData) => userData.nickName === nickName);
    signInFn({ id: user?.id, users, password });
  };

  return (
    <Layout>
      <PageHeader title="Вход" />
      <Content className="Content--signInPage">
        <Spin size="large" spinning={loading} wrapperClassName="Content_spin">
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
                () => ({
                  validator(_, value) {
                    if (value === "123") {
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
        </Spin>
      </Content>
    </Layout>
  );
};
