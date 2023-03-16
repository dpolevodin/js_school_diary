import { Card, Col, Row, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import classNames from "classnames";
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

type DataType = { [key: string]: { [key: string]: string } | string };

const dataSource: DataType[] = [
  {
    homework1: {
      name: "ДЗ 1",
      deadline: "01.01.2023",
      status: "approved",
    },
    homework2: {
      name: "ДЗ 2",
      deadline: "02.01.2023",
      status: "approved",
    },
    homework3: {
      name: "ДЗ 3",
      deadline: "01.02.2023",
      status: "pending",
    },
    homework4: {
      name: "ДЗ 4",
      deadline: "02.02.2023",
      status: "rejected",
    },
    homework5: {
      name: "ДЗ 5",
      deadline: "01.03.2023",
      status: "rejected",
    },
  },
];

const columns: ColumnsType<DataType> = [
  {
    title: "ДЗ 1",
    dataIndex: "homework1",
    render: ({ deadline, status }) => (
      <p
        className={classNames({
          [styles.pending]: status === "pending",
          [styles.approved]: status === "approved",
          [styles.rejected]: status === "rejected",
        })}
      >
        {deadline}
      </p>
    ),
  },
  {
    title: "ДЗ 2",
    dataIndex: "homework2",
    render: ({ deadline, status }) => (
      <p
        className={classNames({
          [styles.pending]: status === "pending",
          [styles.approved]: status === "approved",
          [styles.rejected]: status === "rejected",
        })}
      >
        {deadline}
      </p>
    ),
  },
  {
    title: "ДЗ 3",
    dataIndex: "homework3",
    render: ({ deadline, status }) => (
      <p
        className={classNames({
          [styles.pending]: status === "pending",
          [styles.approved]: status === "approved",
          [styles.rejected]: status === "rejected",
        })}
      >
        {deadline}
      </p>
    ),
  },
  {
    title: "ДЗ 4",
    dataIndex: "homework4",
    render: ({ deadline, status }) => (
      <p
        className={classNames({
          [styles.pending]: status === "pending",
          [styles.approved]: status === "approved",
          [styles.rejected]: status === "rejected",
        })}
      >
        {deadline}
      </p>
    ),
  },
  {
    title: "ДЗ 5",
    dataIndex: "homework5",
    render: ({ deadline, status }) => (
      <p
        className={classNames({
          [styles.pending]: status === "pending",
          [styles.approved]: status === "approved",
          [styles.rejected]: status === "rejected",
        })}
      >
        {deadline}
      </p>
    ),
  },
];

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
    <Table dataSource={dataSource} columns={columns} />
    <Card className={styles.cardBody}>
      {homeworkCards.map((card) => (
        <Card.Grid key={card.deadline}>
          <p>{card.homework}</p>
          <p
          // type={card.homeworkStatus}
          >
            {card.deadline}
          </p>
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
