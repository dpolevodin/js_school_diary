import { Button, Space } from "antd";

type Props = {
  handleOpenSchedule: () => void;
  handleOpenStudents: () => void;
};
export const ScheduleTitleButtons = ({
  handleOpenSchedule,
  handleOpenStudents,
}: Props) => (
  <Space>
    <Button type="primary" onClick={handleOpenSchedule}>
      Расписание
    </Button>
    <Button type="primary" onClick={handleOpenStudents}>
      Студенты
    </Button>
  </Space>
);
