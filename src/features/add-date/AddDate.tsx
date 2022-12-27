import { DatePicker, Typography } from "antd";
import { Dayjs } from "dayjs";
import "./AddDate.css";

type Props = {
  handleChangeAddDate: (_: Dayjs | null, dateString: string) => void;
  title: string;
};

const { Title } = Typography;

export const AddDate = ({ handleChangeAddDate, title }: Props) => (
  <>
    <Title className="Title" level={4}>
      {title}
    </Title>
    <DatePicker onChange={handleChangeAddDate} />
  </>
);
