import classNames from "classnames";
import { createEvent, createStore } from "effector";
import { ExtendedScheduleDataType, HomeworksStatus, RenderArgs, User, UserHomeworksPayloadType, UserHomeworksType } from "./lib/types";
import styles from "./DiaryTable.module.css"


type RenderArgsType = {
  status: HomeworksStatus;
};

enum HomeworksStatusMap {
  default = "Не выбрано",
  approved = "Зачет",
  pending = "Выполняется",
  rejected = "Незачет",
}

export const updateUserHomework = createEvent<UserHomeworksPayloadType>();

export const $schedule = createStore<ExtendedScheduleDataType[]>([]);

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


export const $diaryColumns = $homeworksColumns.map((homeworksColumns) => {
  const studentColumn = {
    title: "Студент",
    dataIndex: "fullName",
    editable: false,
    width: "15%",
  };
  const diaryColumns = homeworksColumns.map((column) => ({
    title: column.title,
    dataIndex: "dataIndex" in column ? column.dataIndex : undefined,
    render: ({ status }: RenderArgsType) => HomeworksStatusMap[status],
    editable: true,
  }));
  return [studentColumn, ...diaryColumns];
});

export const $diaryEditableColumns = $diaryColumns.map((diaryColumns) =>
  diaryColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: User) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: updateUserHomework,
      }),
    };
  })
);
