import { Form, Input, Button, Spin } from "antd";
import uuid from "react-uuid";
import { useUnit } from "effector-react";
import { $users, addUser } from "./model";
import styles from "./page.module.css";
import {
  nameRules,
  passwordRules,
  patronymicRules,
  surnameRules,
} from "../rules";
import { signUpFx } from "../../../entities/signUp/model";
import { createSessionFx } from "../../../entities/auth/session";
import { PageLayout } from "../../../shared/ui";

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
    createSessionFx.pending,
  ]);

  const handleFinish = (values: User) => {
    const user = deletePassword(values);
    const usersPayload = [...users, user];
    addUserFn(user);
    signUpFn({ id: user.id, users: usersPayload });
  };

  return (
    <PageLayout title="Регистрация" className={styles._}>
      <Spin size="large" spinning={loading} wrapperClassName={styles.spin}>
        <Form
          className={styles.form}
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
    </PageLayout>
  );
};

/*  <PageLayout title="Регистрация" nav={nav} className={styles._}>
      <Form
        className={styles.form}
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
    </PageLayout>
  );
};
 */
