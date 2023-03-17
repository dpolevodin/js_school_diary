import classNames from "classnames";
import { ColumnsType } from "antd/es/table";
import styles from "../page.module.css";
import { Homeworks } from "../../sign/signUp/lib/types";

export const homeworks: Homeworks[] = [
  {
    homework1: {
      id: 1,
      title: "ДЗ 1",
      deadline: "01.01.2023",
      status: "approved",
    },
    homework2: {
      id: 2,
      title: "ДЗ 2",
      deadline: "02.01.2023",
      status: "approved",
    },
    homework3: {
      id: 3,
      title: "ДЗ 3",
      deadline: "01.02.2023",
      status: "pending",
    },
    homework4: {
      id: 4,
      title: "ДЗ 4",
      deadline: "02.02.2023",
      status: "rejected",
    },
    homework5: {
      id: 5,
      title: "ДЗ 5",
      deadline: "01.03.2023",
      status: "rejected",
    },
  },
];

export const columns: ColumnsType<Homeworks> = [
  {
    title: "ДЗ 1",
    dataIndex: "homework1",
    render: ({ deadline, status }) => (
      <p
        className={classNames(styles.deadline, {
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
        className={classNames(styles.deadline, {
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
        className={classNames(styles.deadline, {
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
        className={classNames(styles.deadline, {
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
        className={classNames(styles.deadline, {
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
