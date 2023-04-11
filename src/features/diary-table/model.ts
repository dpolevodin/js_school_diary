import { HomeworksStatus, User } from "../../pages/sign/signUp/lib/types";
import { updateUserHomework } from "../../pages/sign/signUp/model";
import { $homeworksColumns } from "../../pages/student/model";

type RenderArgsType = {
  status: HomeworksStatus;
};

enum HomeworksStatusMap {
  default = "Не выбрано",
  approved = "Зачет",
  pending = "Выполняется",
  rejected = "Незачет",
}

const $diaryColumns = $homeworksColumns.map((homeworksColumns) => {
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
