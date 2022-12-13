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
  DatePickerProps,
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
  Block,
  deleteAdditionalDate,
  deleteBlock,
  deleteForbiddenDate,
  deleteRepository,
  deleteTutor,
  Repository,
  setAdditionalDates,
  setAvailableDays,
  setForbiddenDates,
  Tutor,
} from "./model";
import "./page.css";

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

  const handleClickAddTutor = (value: Tutor) => addTutorFn(value);
  const handleClickDeleteTutor = (value: Tutor) =>
    deleteTutorFn(value.telegramNickName);

  const handleClickAddRepository = (value: Repository) =>
    addRepositoryFn(value);
  const handleClickDeleteRepository = (value: Repository) =>
    deleteRepositoryFn(value.name);

  const handleClickAddBlock = (value: Block) => addBlockFn(value);
  const handleClickDeleteBlock = (value: Block) => deleteBlockFn(value.name);

  const handleChangeAvailableDays = (checkedValues: CheckboxValueType[]) => {
    setAvailableDaysFn(checkedValues);
  };

  const hadleChangeForbiddenDays: DatePickerProps["onChange"] = (
    _,
    dateString: string
  ) => {
    if (dateString !== "") {
      setForbiddenDatesFn(dateString);
    }
  };
  const handleClickDeleteForbiddenDate = (date: string) => {
    const dateToDelete = date;
    return () => deleteForbiddenDateFn(dateToDelete);
  };

  const hadleChangeAdditionalDays: DatePickerProps["onChange"] = (
    _,
    dateString: string
  ) => {
    if (dateString !== "") {
      setAdditionalDatesFn(dateString);
    }
  };
  const handleClickDeleteAdditionalDate = (date: string) => {
    const dateToDelete = date;
    return () => deleteAdditionalDateFn(dateToDelete);
  };

  return (
    <Layout>
      <PageHeader title="Настройки курса" />
      <Content className="Content">
        <Title className="Content__title--three" level={3}>
          Преподаватели
        </Title>
        <Space direction="vertical">
          <Form
            name="tutors"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={handleClickAddTutor}
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
              onFinish={handleClickDeleteTutor}
              autoComplete="off"
              layout="inline"
            >
              <Form.Item name="fullName">
                <Input disabled />
              </Form.Item>

              <Form.Item name="telegramNickName">
                <Input disabled />
              </Form.Item>

              <Form.Item name="githubNickName">
                <Input disabled />
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
            onFinish={handleClickAddRepository}
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
              onFinish={handleClickDeleteRepository}
              autoComplete="off"
              layout="inline"
            >
              <Form.Item name="name">
                <Input disabled />
              </Form.Item>

              <Form.Item name="description">
                <Input disabled />
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
          <Title className="Content__title--four" level={4}>
            Красные дни календаря
          </Title>
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
          <Title className="Content__title--four" level={4}>
            Зеленые даты
          </Title>
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
            onFinish={handleClickAddBlock}
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
              initialValues={block}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 24 }}
              onFinish={handleClickDeleteBlock}
              autoComplete="off"
              layout="inline"
            >
              <Form.Item name="name">
                <Input disabled />
              </Form.Item>

              <Form.Item name="description">
                <Input disabled />
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
