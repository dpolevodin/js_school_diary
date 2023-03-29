import { DatePicker, Typography } from "antd";
import { Dayjs } from "dayjs";
import locale from "antd/es/date-picker/locale/ru_RU";
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
    <DatePicker onChange={handleChangeAddDate} locale={locale} />
  </>
);
