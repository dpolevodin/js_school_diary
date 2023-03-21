import { Form, FormInstance, Table } from "antd";
import { ScheduleEditableCell } from "../schedule-editable-cell/ScheduleEditableCell";
import { Schedule } from "../../pages/schedule/create/model";

type Props = {
  scheduleStore: Schedule[] | object[];
  columns: object[];
  form: FormInstance;
};

export const ScheduleTable = ({ scheduleStore, columns, form }: Props) => {
  const EditableCell = ScheduleEditableCell;

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={scheduleStore}
        columns={columns}
        rowClassName="editable-row"
        pagination={false}
        size="large"
      />
    </Form>
  );
};
