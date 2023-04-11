import classNames from "classnames";
import { $schedule } from "../../features/schedule-table/model";
import { HomeworksStatus, UserHomeworksType } from "../sign/signUp/lib/types";
import styles from "./page.module.css";

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
