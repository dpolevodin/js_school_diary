import { Button, DatePicker, Form, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Schedule } from "../../pages/schedule/create/model";

import styles from "./AddScheduleForm.module.css";

type Props = {
  handleClickAddScheduleRow: (value: Schedule) => void;
  schedule: Schedule[];
  teacherOptions: object[];
  blockOptions: object[];
};

export const AddScheduleForm = ({
  handleClickAddScheduleRow,
  schedule,
  teacherOptions,
  blockOptions,
}: Props) => {
  const dateRender = (current: dayjs.Dayjs) => (
    <div
      className={
        current.day() === 1 || current.day() === 4
          ? styles.dateStyle
          : undefined
      }
    >
      {current.date()}
    </div>
  );

  return (
    <Form
      className={styles.row}
      name="initialValues"
      onFinish={handleClickAddScheduleRow}
      initialValues={schedule}
      autoComplete="off"
      layout="inline"
    >
      <Form.Item
        className={styles.formItem}
        rules={[{ required: true, message: "Заполните поле!" }]}
        name="date"
      >
        <DatePicker
          className={styles.inputs}
          dateRender={dateRender}
          disabledDate={(current) =>
            current.day() === 0 ||
            current.day() === 2 ||
            current.day() === 3 ||
            current.day() === 5 ||
            current.day() === 6
          }
        />
      </Form.Item>
      <Form.Item
        className={styles.formItem}
        rules={[{ required: true, message: "Заполните поле!" }]}
        name="block"
      >
        <Select placeholder="block" options={blockOptions} />
      </Form.Item>
      <Form.Item
        className={styles.formItem}
        rules={[{ required: true, message: "Заполните поле!" }]}
        name="theme"
      >
        <Input placeholder="theme" />
      </Form.Item>
      <Form.Item className={styles.formItem}>
        <Form.Item
          className={styles.inputs}
          noStyle
          name={["slotThemes", "theme1"]}
          rules={[{ required: true, message: "Заполните поле!" }]}
        >
          <Input placeholder="theme1" />
        </Form.Item>
        <Form.Item
          className={styles.inputs}
          noStyle
          name={["slotThemes", "theme2"]}
          rules={[{ required: true, message: "Заполните поле!" }]}
        >
          <Input placeholder="theme2" />
        </Form.Item>
        <Form.Item
          className={styles.inputs}
          noStyle
          name={["slotThemes", "theme3"]}
          rules={[{ required: true, message: "Заполните поле!" }]}
        >
          <Input placeholder="theme3" />
        </Form.Item>
      </Form.Item>
      <Form.Item
        className={styles.formItem}
        rules={[{ required: true, message: "Заполните поле!" }]}
        name="teacher"
      >
        <Select placeholder="teacher" options={teacherOptions} />
      </Form.Item>
      <Form.Item
        className={styles.formItem}
        rules={[{ required: true, message: "Заполните поле!" }]}
      >
        <Form.Item
          className={styles.inputs}
          noStyle
          name={["homework", "homeworkNumber"]}
          rules={[{ required: true, message: "Заполните поле!" }]}
        >
          <Input placeholder="homeworkNumber" />
        </Form.Item>
        <Form.Item
          className={styles.inputs}
          noStyle
          name={["homework", "deadline"]}
          rules={[{ required: true, message: "Заполните поле!" }]}
        >
          <Input placeholder="deadline" />
        </Form.Item>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
          icon={<PlusOutlined />}
          size="middle"
        />
      </Form.Item>
    </Form>
  );
};
