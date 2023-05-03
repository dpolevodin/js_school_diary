import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import styles from "./AddForm.module.css";

const { Title } = Typography;

type Props<T> = {
  handleClickAdd: (data: T) => void;
  inputMap: { [key: string]: string };
  title: string;
  store?: { [key: string]: string }[];
  validateField?: string;
};

export const AddForm = <T,>({
  handleClickAdd,
  inputMap,
  title,
  store,
  validateField,
}: Props<T>) => (
  <>
    <Title level={3} className={styles.title}>
      {title}
    </Title>
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={handleClickAdd}
      validateTrigger="onSubmit"
      autoComplete="off"
      layout="inline"
    >
      {Object.keys(inputMap).map((key) => (
        <Form.Item
          key={key}
          name={key}
          rules={[
            { required: true, message: `Введите ${inputMap[key]}` },
            () =>
              store && validateField && key === validateField
                ? {
                    validator(_, value) {
                      if (store.some((item) => item[validateField] === value)) {
                        return Promise.reject(new Error("Дубликат записи"));
                      }
                      return Promise.resolve();
                    },
                  }
                : {
                    validator() {
                      return Promise.resolve();
                    },
                  },
          ]}
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

AddForm.defaultProps = {
  store: null,
  validateField: null,
};
