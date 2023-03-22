import { Form, FormInstance, Table } from "antd";
import { DiaryEditableCell } from "../diary-editable-cell/DiaryEditableCell";

type Props = {
  columns: object[];
  form: FormInstance;
  data: object[] | undefined;
};
export const DataTable = ({ form, data, columns }: Props) => (
  <Form
    form={form}
    // initialValues={data}
    component={false}
  >
    <Table
      components={{
        body: {
          cell: DiaryEditableCell,
        },
      }}
      dataSource={data}
      columns={columns}
      rowClassName="editable-row"
      pagination={false}
      size="small"
    />
  </Form>
);
