import { Form, FormInstance, Table } from "antd";
import { ScheduleEditableCell } from "../schedule-editable-cell/ScheduleEditableCell";
import { DiaryEditableCell } from "../diary-editable-celll/DiaryEditableCell";
import { ScheduleTitleButtons } from "./schedule-title-buttons/ScheduleTitleButtons";
import { Schedule, StudentDiary } from "../../pages/schedule/create/model";

type Props = {
  scheduleStore: Schedule[] | object[] | StudentDiary[];
  columns: object[];
  form: FormInstance;
  handleOpenSchedule: () => void;
  handleOpenStudents: () => void;
  initialValues: StudentDiary[] | undefined;
  isSchedule: boolean;
};

export const ScheduleTable = ({
  scheduleStore,
  columns,
  form,
  handleOpenSchedule,
  handleOpenStudents,
  initialValues,
  isSchedule,
}: Props) => {
  const EditableCell = isSchedule ? ScheduleEditableCell : DiaryEditableCell;

  return (
    <>
      <ScheduleTitleButtons
        handleOpenSchedule={handleOpenSchedule}
        handleOpenStudents={handleOpenStudents}
      />
      <Form form={form} component={false} initialValues={initialValues}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          // bordered
          dataSource={scheduleStore}
          columns={columns}
          rowClassName="editable-row"
          pagination={false}
          size="large"
        />
      </Form>
    </>
  );
};
