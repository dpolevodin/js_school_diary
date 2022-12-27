import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import styles from "./AddForm.module.css";

const { Title } = Typography;

type Props = {
  handleClickAdd: (...args: any[]) => void;
  inputMap: { [key: string]: string };
  title: string;
};

export const AddForm = ({ handleClickAdd, inputMap, title }: Props) => (
  <>
    <Title level={3} className={styles.title}>
      {title}
    </Title>
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={handleClickAdd}
      autoComplete="off"
      layout="inline"
    >
      {Object.keys(inputMap).map((key) => (
        <Form.Item
          key={key}
          name={key}
          rules={[{ required: true, message: `Введите ${inputMap[key]}` }]}
        >
          <Input placeholder={inputMap[key]} />
        </Form.Item>
      ))}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
          icon={<PlusOutlined />}
          size="small"
        />
      </Form.Item>
    </Form>
  </>
);
