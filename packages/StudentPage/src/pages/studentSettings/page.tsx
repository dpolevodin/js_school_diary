import { Button, Form, Input } from "antd";
import { useUnit } from "effector-react";
import { $session } from "../../entities/auth/session";
import { $repositories } from "../student/lib/mocks";
import { UserSettingsType } from "../student/lib/types";

type PageProps = {
    handleFinish: (value: UserSettingsType) => void;
}

export const StudentSettingsPage = ({handleFinish}: PageProps) => {
  const [user, repositories] = useUnit([
    $session,
    $repositories,
  ]);

  return (
    <Form
      name="userSettings"
      labelCol={{ span: 3 }}
      className="Form"
      initialValues={user?.settings}
      wrapperCol={{ span: 6 }}
      onFinish={handleFinish}
      autoComplete="off"
      validateTrigger="onChange"
    >
      <Form.Item label="Учетные записи" labelCol={{ offset: 3 }} />
      <Form.Item
        name="githubNickName"
        label="Ник на Github"
        rules={[
          {
            required: true,
            message: "Please input your github nickname!",
          },
          {
            pattern: /[0-9a-z_]*$/,
            message: "githubNickName",
          },
        ]}
      >
        <Input placeholder="ник в гитхабе" allowClear />
      </Form.Item>
      <Form.Item
        name="tgNickName"
        label="Ник в Telegram"
        rules={[
          {
            required: true,
            message: "Please input your telegram nickname!",
          },
          {
            pattern: /^@[0-9A-Za-z_]*$/,
            message: "@tgNickName",
          },
        ]}
      >
        <Input placeholder="ник в телеграме" allowClear />
      </Form.Item>
      {repositories.length > 0 && (
        <Form.Item label="Репозитории" labelCol={{ offset: 3 }} />
      )}
      {repositories.map((repository) => (
        <Form.Item name={repository.name} label={repository.description}>
          <Input
            placeholder={
              user?.settings?.githubNickName
                ? `https://github.com/${user.settings.githubNickName}/${repository.name}`
                : "Введите ник на github"
            }
            disabled
          />
        </Form.Item>
      ))}

      <Form.Item wrapperCol={{ span: 6, offset: 3 }}>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
};
