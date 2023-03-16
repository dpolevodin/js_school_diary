import { Button, Form, Input } from "antd";
import { useUnit } from "effector-react";
import { PageLayout } from "../../../shared/ui";
import { $user, UserSettings, setUserSettings } from "../model";
import { $repositories } from "../../admin/model";

const nav = ["schedule"];

export const StudentSettingsPage = () => {
  const [user, setUserSettingsFn, repositories] = useUnit([
    $user,
    setUserSettings,
    $repositories,
  ]);
  const handleFinish = (value: UserSettings) => setUserSettingsFn(value);

  return (
    <PageLayout title="Настройки" nav={nav}>
      <Form
        name="userSettings"
        className="Form"
        initialValues={user.settings}
        wrapperCol={{ span: 4, offset: 1 }}
        onFinish={handleFinish}
        autoComplete="off"
        validateTrigger="onChange"
      >
        <Form.Item
          name="githubNickName"
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

        {repositories.map((repository) => (
          <Form.Item name={repository.name}>
            <Input placeholder={repository.description} allowClear />
          </Form.Item>
        ))}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  );
};
