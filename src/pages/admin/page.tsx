import {
  Button,
  Form,
  Layout,
  Input,
  Space,
  Typography,
  Checkbox,
  Col,
  Row,
  DatePicker,
} from "antd";
import dayjs from "dayjs";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useUnit } from "effector-react";
import { PageHeader } from "../../shared/ui/PageHeader/PageHeader";
import {
  $additionalDates,
  $availableDays,
  $blocks,
  $forbiddenDates,
  $repositories,
  $tutors,
  addBlock,
  addRepository,
  addTutor,
  deleteAdditionalDate,
  deleteBlock,
  deleteForbiddenDate,
  deleteRepository,
  deleteTutor,
  setAdditionalDates,
  setAvailableDays,
  setForbiddenDates,
} from "./model";

const { Content } = Layout;
const { Title } = Typography;

export const AdminPage = () => {
  const [
    tutors,
    addTutorFn,
    deleteTutorFn,
    repositories,
    addRepositoryFn,
    deleteRepositoryFn,
    availableDays,
    setAvailableDaysFn,
    forbiddenDates,
    setForbiddenDatesFn,
    deleteForbiddenDateFn,
    additionalDates,
    setAdditionalDatesFn,
    deleteAdditionalDateFn,
    blocks,
    addBlockFn,
    deleteBlockFn,
  ] = useUnit([
    $tutors,
    addTutor,
    deleteTutor,
    $repositories,
    addRepository,
    deleteRepository,
    $availableDays,
    setAvailableDays,
    $forbiddenDates,
    setForbiddenDates,
    deleteForbiddenDate,
    $additionalDates,
    setAdditionalDates,
    deleteAdditionalDate,
    $blocks,
    addBlock,
    deleteBlock,
  ]);

  const handleChangeAvailableDays = (checkedValues: CheckboxValueType[]) => {
    setAvailableDaysFn(checkedValues);
  };

  const hadleChangeForbiddenDays = (dateString: string) => {
    if (dateString !== null) {
      setForbiddenDatesFn(dateString);
    }
  };

  const handleClickDeleteForbiddenDate = (date: string) => {
    const dateToDelete = date;
    return () => deleteForbiddenDateFn(dateToDelete);
  };

  const hadleChangeAdditionalDays = (dateString: string) => {
    if (dateString !== null) {
      setAdditionalDatesFn(dateString);
    }
  };

  const handleClickDeleteAdditionalDate = (date: string) => {
    const dateToDelete = date;
    return () => deleteAdditionalDateFn(dateToDelete);
  };

  console.log(blocks);

  return (
    <Layout>
      <PageHeader title="Настройки курса" />
      <Content className="Content">
        <Title level={3}>Преподаватели</Title>
        <Space direction="vertical">
          <Form
            name="tutors"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={(value) => addTutorFn(value)}
            autoComplete="off"
            layout="inline"
          >
            <Form.Item
              name="fullName"
              rules={[{ required: true, message: "Введите ФИО" }]}
            >
              <Input placeholder="фио преподавателя" />
            </Form.Item>

            <Form.Item
              name="telegramNickName"
              rules={[{ required: true, message: "Введите ник в телеграмме" }]}
            >
              <Input placeholder="ник в телеграмме" />
            </Form.Item>

            <Form.Item
              name="githubNickName"
              rules={[{ required: true, message: "Введите ник в гитхабе" }]}
            >
              <Input placeholder="ник в гитхабе" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                icon={<PlusOutlined />}
                size="small"
              />
            </Form.Item>
          </Form>
          {tutors.map((tutor) => (
            <Form
              key={tutor.telegramNickName}
              name={tutor.fullName}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 24 }}
              initialValues={tutor}
              onFinish={(value) => deleteTutorFn(value.telegramNickName)}
              autoComplete="off"
              layout="inline"
            >
              <Form.Item name="fullName">
                <Input value={tutor.fullName} disabled />
              </Form.Item>

              <Form.Item name="telegramNickName">
                <Input value={tutor.telegramNickName} disabled />
              </Form.Item>

              <Form.Item name="githubNickName">
                <Input value={tutor.githubNickName} disabled />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<DeleteOutlined />}
                  size="small"
                />
              </Form.Item>
            </Form>
          ))}

          <Title level={3}>Имена репозиториев</Title>
          <Form
            name="repositories"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={(value) => addRepositoryFn(value)}
            autoComplete="off"
            layout="inline"
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Введите имя репозитория" }]}
            >
              <Input placeholder="имя репозитория" />
            </Form.Item>

            <Form.Item
              name="description"
              rules={[{ required: true, message: "Введите описание" }]}
            >
              <Input placeholder="описание" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                icon={<PlusOutlined />}
                size="small"
              />
            </Form.Item>
          </Form>
          {repositories.map((repository) => (
            <Form
              key={repository.name}
              name={repository.name}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 24 }}
              initialValues={repository}
              onFinish={(value) => deleteRepositoryFn(value.name)}
              autoComplete="off"
              layout="inline"
            >
              <Form.Item name="name">
                <Input value={repository.name} disabled />
              </Form.Item>

              <Form.Item name="description">
                <Input value={repository.description} disabled />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<DeleteOutlined />}
                  size="small"
                />
              </Form.Item>
            </Form>
          ))}

          <Title level={3}>Календарь</Title>
          <Checkbox.Group
            defaultValue={availableDays}
            onChange={handleChangeAvailableDays}
          >
            <Row>
              <Col span={24}>
                <Checkbox value={2}>Понедельник</Checkbox>
              </Col>
              <Col span={24}>
                <Checkbox value={3}>Вторник</Checkbox>
              </Col>
              <Col span={24}>
                <Checkbox value={4}>Среда</Checkbox>
              </Col>
              <Col span={24}>
                <Checkbox value={5}>Четверг</Checkbox>
              </Col>
              <Col span={24}>
                <Checkbox value={6}>Пятница</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
          <Title level={4}>Красные дни календаря</Title>
          <Space direction="vertical">
            <DatePicker onChange={hadleChangeForbiddenDays} />
            <Space wrap>
              {forbiddenDates.map((date) => (
                <Space size="small" key={date}>
                  <DatePicker
                    defaultValue={dayjs(date, "YYYY-MM-DD")}
                    disabled
                  />
                  <Button
                    type="primary"
                    onClick={handleClickDeleteForbiddenDate(date)}
                    icon={<DeleteOutlined />}
                    size="small"
                  />
                </Space>
              ))}
            </Space>
          </Space>
          <Title level={4}>Зеленые даты</Title>
          <Space direction="vertical">
            <DatePicker onChange={hadleChangeAdditionalDays} />
            <Space wrap>
              {additionalDates.map((date) => (
                <Space size="small" key={date}>
                  <DatePicker
                    defaultValue={dayjs(date, "YYYY-MM-DD")}
                    disabled
                  />
                  <Button
                    type="primary"
                    onClick={handleClickDeleteAdditionalDate(date)}
                    icon={<DeleteOutlined />}
                    size="small"
                  />
                </Space>
              ))}
            </Space>
          </Space>

          <Title level={3}>Блоки</Title>
          <Form
            name="blocks"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={(value) => addBlockFn(value)}
            autoComplete="off"
            layout="inline"
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Введите имя блока" }]}
            >
              <Input placeholder="имя блока" />
            </Form.Item>

            <Form.Item
              name="description"
              rules={[{ required: true, message: "Введите описание" }]}
            >
              <Input placeholder="описание" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                icon={<PlusOutlined />}
                size="small"
              />
            </Form.Item>
          </Form>
          {blocks.map((block) => (
            <Form
              key={block.name}
              name={block.name}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 24 }}
              onFinish={(value) => deleteBlockFn(value.blockName)}
              autoComplete="off"
              layout="inline"
            >
              <Form.Item name="blockName">
                <Input value={block.name} disabled />
              </Form.Item>

              <Form.Item name="blockDescription">
                <Input value={block.description} disabled />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<DeleteOutlined />}
                  size="small"
                />
              </Form.Item>
            </Form>
          ))}
        </Space>
      </Content>
    </Layout>
  );
};
