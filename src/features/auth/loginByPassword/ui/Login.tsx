import styles from './Login.module.scss';
import { Button, Checkbox, Form, Input } from 'antd';

type Props = {
  onSuccess: (values: any) => void;
  onFail: (errorInfo: any) => void;
};

export const Login = ({ onSuccess, onFail }: Props) => {
  return (
    <Form
      className={styles._}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onSuccess}
      onFinishFailed={onFail}
      autoComplete="off"
    >
      <Form.Item
        label="Логин"
        name="username"
        rules={[{ required: true, message: 'Введите логин:' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Введите пароль' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Сохранить</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Зайти
        </Button>
      </Form.Item>
    </Form>
  );
};
