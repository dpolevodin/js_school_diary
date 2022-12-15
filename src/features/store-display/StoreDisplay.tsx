import { DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";

type Props = {
  handleClickDelete: (...args: any[]) => void;
  store: { [key: string]: string }[];
};

export const StoreDisplay = ({ handleClickDelete, store }: Props) => (
  <Space direction="vertical">
    {store.map((obj) => (
      <Form
        key={obj[Object.keys(obj)[0]]}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        initialValues={obj}
        onFinish={handleClickDelete}
        autoComplete="off"
        layout="inline"
      >
        {Object.keys(obj).map((key) => (
          <Form.Item key={obj[key]} name={key}>
            <Input disabled />
          </Form.Item>
        ))}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            icon={<DeleteOutlined />}
            size="small"
          />
        </Form.Item>
      </Form>
    ))}
  </Space>
);
