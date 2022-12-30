import { PageHeader } from "../../../shared/ui/PageHeader/PageHeader";
import { Button, Form, Input, Layout } from "antd";
import { useUnit } from "effector-react";
import {
  toStudentPage,
  setTelegramNickName,
  setGithubNickName,
  setRepositoryReact,
  $telegramNickName,
  $githubNickName,
  $repositoryHtml,
  $repositoryReact,
  setRepositoryHtml,
} from "../model";
import {
  repository,
  Repository,
} from './mocks';

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
  const repositories = repository.map( obj => {
    return (
      <Form.Item

        key={obj.description}
        name={obj.name}
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
      placeholder="имя репозитория с версткой"
      value={obj.name}
      onChange={({ target: { value } }) => setRepositoryFn(value)}
      allowClear
    />
    </Form.Item>
    
    )}
    );


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
        fieldId="github"
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
          fieldId=""
          name="telegramNickName"
          rules={[
            {
              required: true,
              message: 'Please input your telegram nickname!'
            },
            {
              pattern: /[0-9A-Za-z_]*$/,
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
        {repositories}

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



{/* <Form.Item
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
</Form.Item> */}