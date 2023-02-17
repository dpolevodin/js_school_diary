import { Card, Col, Row, Typography } from "antd";
import styles from "./DiaryTable.module.css";

const { Text, Title } = Typography;

type Props = {
  studentName: string;
  studentSurname: string;
  studentNickName: string;
  homeworkCards: {
    homework: string;
    homeworkStatus: string;
    deadline: string;
  }[];
};

export const DiaryTable = ({
  studentName,
  studentSurname,
  studentNickName,
  homeworkCards,
}: Props) => (
  <Col>
    <Title className={styles.title}>
      Привет, {studentName} {studentSurname} ({studentNickName})
    </Title>
    <Title level={3}>Оценки за дз</Title>
    <Card className={styles.cardBody}>
      {homeworkCards.map((card) => (
        <Card.Grid key={card.deadline} className={styles.gridStyle}>
          <Text
          // type={card.homeworkStatus}
          >
            {card.homework}
          </Text>
        </Card.Grid>
      ))}
    </Card>
    <Row gutter={20}>
      {homeworkCards.map((card) => (
        <Col key={card.deadline} className={styles.gridStyle}>
          <Text>{card.homeworkStatus ? "" : card.deadline}</Text>
        </Col>
      ))}
    </Row>
  </Col>
);
