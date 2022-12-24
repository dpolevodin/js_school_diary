import { PageHeader } from "../../../shared/ui/PageHeader/PageHeader";
import { Button, Form, Input, Layout } from "antd";
import { useUnit } from "effector-react";
import {
  toStudentPage,
  setTelegramNickName,
  setGithubNickName,
  setRepositoryHtml,
  setRepositoryReact,
  $telegramNickName,
  $githubNickName,
  $repositoryHtml,
  $repositoryReact
} from "../model";

import "./page.css";

const { Content } = Layout;

export const StudentSettingsPage = () => {
  const [
    telegramNickName,
    githubNickName,
    repositoryHtml,
    repositoryReact,
    toStudentPageFn,
    setTelegramNickNameFn,
    setGithubNickNameFn,
    setRepositoryHtmlFn,
    setRepositoryReactFn
  ] = useUnit([
    $telegramNickName,
    $githubNickName,
    $repositoryHtml,
    $repositoryReact,
    toStudentPage,
    setTelegramNickName,
    setGithubNickName,
    setRepositoryHtml,
    setRepositoryReact
  ])
  const handleFinish = () => toStudentPageFn();

  return(
  <Layout>
    <PageHeader title="Настройки" />
    <Content className="Content__settings">
      <Form
        name="userLinks"
        className="Form"
        wrapperCol={{ span: 4, offset: 1 }}
        onFinish={handleFinish}
        autoComplete="off"
        validateTrigger="onSubmit"
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
            value={githubNickName}
            onChange={ ({ target: { value } }) => setGithubNickNameFn(value) }
            allowClear
          />
        </Form.Item>
        <Form.Item
          name="telegramNickName"
          rules={[
            {
              required: true,
              message: 'Please input your telegram nickname!'
            },
            {
              pattern: /[@][0-9a-z_]*$/,
              message: "@tgNickName",
            }
          ]}
        >
          <Input
            placeholder="ник в телеграме"
            value={telegramNickName}
            onChange={({ target: { value } }) => setTelegramNickNameFn(value)}
            allowClear
          />
        </Form.Item>
        <Form.Item
          name="repository_html"
          rules={[
            {
              required: true,
              message: 'Please input your name of repository with layout!'
            },
            {
              pattern: /[0-9a-z_]*$/,
              message: "Please input your name of repository with layout!",
            }
          ]}
        >
          <Input
            placeholder="имя репозитория с версткой"
            value={repositoryHtml}
            onChange={({ target: { value } }) => setRepositoryHtmlFn(value)}
            allowClear
          />
        </Form.Item>
        <Form.Item

          name="repository_react"
          rules={[
            { required: true,
              message: 'Please input your name of repository with react!'
            },
            {
              pattern: /[0-9a-z_]*$/,
              message: "Please input your name of repository with react!",
            }
          ]}
        >
          <Input
            placeholder="имя репозитория с реактом"
            value={repositoryReact}
            onChange={ ({ target: {value} }) => setRepositoryReactFn(value) }
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