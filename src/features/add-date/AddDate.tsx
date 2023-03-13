import { DatePicker, Typography } from "antd";
import { Dayjs } from "dayjs";
import styles from "./AddDate.module.css";

type Props = {
  handleChangeAddDate: (_: Dayjs | null, dateString: string) => void;
  title: string;
};

const { Title } = Typography;

export const AddDate = ({ handleChangeAddDate, title }: Props) => (
  <>
    <Title className={styles.title} level={4}>
      {title}
    </Title>
    <DatePicker onChange={handleChangeAddDate} />
  </>
);
