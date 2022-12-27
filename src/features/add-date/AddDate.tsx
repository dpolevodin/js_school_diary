import { DatePicker, Typography } from "antd";
import styles from "./AddDate.module.css";

type Props = {
  handleChangeAddDate: (...args: any[]) => void;
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
