import { Button, Form, Input } from "antd";
import { useUnit } from "effector-react";
import styles from "./page.module.css";
import { signInFx } from "./lib/mocks";
import { createStore } from "effector";
import { User } from "./lib/types";

type Value = {
  nickName: string;
  password: string;
};

export const $users = createStore<User[]>([
  {
    id: "f115a395-19b4-0b15-f474-33dbf9bd9e3b",
    nickName: "admin",
    name: "Сергей",
    surname: "Махнаткин",
  },
]);

export const SignInPage = () => {
  const [users, signInFn] = useUnit([$users, signInFx]);

  const handleFinish = ({ nickName, password }: Value) => {
    const user = users.find((userData) => userData.nickName === nickName);
    signInFn({ id: user?.id, users, password });
  };

  return (
    <div className={styles._}>
      <Form
        className={styles.form}
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
                return Promise.reject(new Error("Пользователь не существует"));
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
    </div>
  );
};
