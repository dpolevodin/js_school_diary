import classNames from "classnames";
import styles from "../page.module.css";
import { HomeworksStatus, UserHomeworksType } from "./types";
import { $schedule } from "./mocks";

type RenderArgs = {
  deadline: string;
  status: HomeworksStatus;
};

export const $homeworksColumns = $schedule.map((schedule) => {
  const newColumns = schedule.reduce(
    (columns: UserHomeworksType, lesson) =>
      lesson.homework
        ? [
            ...columns,
            {
              title: lesson.homework,
              dataIndex: lesson.homeworkId,
              align: "center",
              render: ({ deadline, status }: RenderArgs) => (
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
          ]
        : columns,
    []
  );
  return newColumns;
});
