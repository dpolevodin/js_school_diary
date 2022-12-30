import { DatePicker, Typography } from "antd";
import "./AddDate.css";

type Props = {
  handleChangeAddDate: (...args: any[]) => void;
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