import {
  Button,
  Form,
  Input,
  Layout
} from "antd";
import { useUnit } from "effector-react";
import { PageHeader } from "../../../shared/ui/PageHeader/PageHeader";
import {
  toStudentPage,
  $userSettings,
  UserSettings,
  setUserSettings
} from "../model";

import styles from  "./page.module.css";

const { Content } = Layout;

 

export const StudentSettingsPage = () => {
  const [
    userSettings,
    setUserSettingsFn,
    toStudentPageFn
  ] = useUnit([
    $userSettings,
    setUserSettings,
    toStudentPage
  ])
  const handleFinish = (value: UserSettings) => {
    setUserSettingsFn(value)
    toStudentPageFn()
  };

  return(
  <Layout>
    <PageHeader title="Настройки" />
    <Content className={styles._}>
      <Form
        name="userSettings"
        className="Form"
        initialValues={{ remember: true }}
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
              message: 'Please input your github nickname!'
            },
            {
              pattern: /[0-9a-z_]*$/,
              message: "githubNickName",
            }
          ]}
        >
          <Input
            placeholder="ник в гитхабе"
            value={userSettings.githubNickName}
            allowClear
          />
        </Form.Item>
        <Form.Item
          fieldId=""
          name="tgNickName"
          rules={[
            {
              required: true,
              message: 'Please input your telegram nickname!'
            },
            {
              pattern:  /^@[0-9A-Za-z_]*$/,
              message: "@tgNickName",
            }
          ]}
        >
          <Input
            placeholder="ник в телеграме"
            value={userSettings.tgNickName}
            allowClear
          />
        </Form.Item>
        <Form.Item
        name="htmlRepository"
        rules={[
          {
            required: true,
            message: 'Please input name of repository!'
          },
          {
            pattern: /[0-9a-z_]*$/,
            message: "Please input name of repository!",
          }
        ]}
        >
          <Input
            placeholder="имя репозитория html"
            value={userSettings.htmlRepository}
            allowClear
          />
        </Form.Item>
        <Form.Item
        name="reactRepository"
        rules={[
          {
            required: true,
            message: 'Please input name of repository!'
          },
          {
            pattern: /[0-9a-z_]*$/,
            message: "Please input name of repository!",
          }
        ]}
        >
          <Input
            placeholder="имя репозитория react"
            value={userSettings.reactRepository}
            allowClear
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Content>
  </Layout>
  )
};