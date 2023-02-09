import { Form, FormInstance, Table } from "antd";
import { ScheduleEditableCell } from "../schedule-editable-cell/ScheduleEditableCell";
import { Schedule } from "../../pages/schedule/create/model";

type Props = {
  scheduleStore: Schedule[];
  columns: object[];
  form: FormInstance;
};

export const CreateScheduleTable = ({
  scheduleStore,
  columns,
  form,
}: Props) => (
  <Form form={form} component={false}>
    <Table
      components={{
        body: {
          cell: ScheduleEditableCell,
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
);
