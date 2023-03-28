import { Form, FormInstance, Table } from "antd";
import { EditableCell } from "./ui/EditableCell/EditableCell";

type Props = {
  columns: object[];
  form: FormInstance;
  data: object[] | undefined;
};
export const DiaryTable = ({ form, data, columns }: Props) => (
  <Form form={form} component={false}>
    <Table
      components={{
        body: {
          cell: EditableCell,
        },
      }}
      dataSource={data}
      columns={columns}
      rowClassName="editable-row"
      pagination={false}
      size="small"
      rowKey="id"
    />
  </Form>
);
