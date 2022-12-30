import { DeleteOutlined } from "@ant-design/icons";
import { Button, DatePicker, Space } from "antd";
import dayjs from "dayjs";

type Props = {
  handleClickDeleteDate: (date: string) => any;
  store: string[];
};

export const StoreDisplayDates = ({ handleClickDeleteDate, store }: Props) => (
  <Space wrap>
    {store.map((date) => (
      <Space size="small" key={date}>
        <DatePicker defaultValue={dayjs(date, "YYYY-MM-DD")} disabled />
        <Button
          type="primary"
          onClick={handleClickDeleteDate(date)}
          icon={<DeleteOutlined />}
          size="small"
        />
      </Space>
    ))}
  </Space>
);