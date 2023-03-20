import { Button, Form, Input } from "antd";
import { useUnit } from "effector-react";
import { signInFx } from "../../../entities/signIn/model";
import { $users } from "../signUp/model";
import { PageLayout } from "../../../shared/ui";
import styles from "./page.module.css";

type Value = {
  nickName: string;
  password: string;
};

const nav = ["signUp"];

export const SignInPage = () => {
  const [users, signInFn] = useUnit([$users, signInFx]);

  const handleFinish = ({ nickName, password }: Value) => {
    const user = users.find((userData) => userData.nickName === nickName);
    signInFn({ id: user?.id, users, password });
  };

  return (
    <PageLayout title="Вход" nav={nav} className={styles._}>
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
    </PageLayout>
  );
};
/*   <PageLayout title="Вход" nav={nav} className={styles._}>
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
                return Promise.reject(new Error("Неверный пароль"));
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
    </PageLayout>
  );
};
 */
