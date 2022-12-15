import {
  Button,
  Layout,
  Space,
  Typography,
  Checkbox,
  Col,
  Row,
  DatePicker,
  DatePickerProps,
} from "antd";
import dayjs from "dayjs";
import { DeleteOutlined } from "@ant-design/icons";
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
import { AddForm } from "../../features/add-form/AddForm";
import { StoreDisplay } from "../../features/store-display/StoreDisplay";

const { Content } = Layout;
const { Title } = Typography;

const TUTORS_MAP = {
  fullName: "фио преподавателя",
  telegramNickName: "ник в телеграм",
  githubNickName: "ник в гитхабе",
};

const REPOSITORIES_MAP = {
  name: "имя репозитория",
  description: "описание",
};

const BLOCKS_MAP = {
  name: "имя блока",
  description: "описание",
};

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
        <Space direction="vertical">
          <AddForm
            handleClickAdd={handleClickAddTutor}
            inputMap={TUTORS_MAP}
            title="Преподаватели"
          />
          <StoreDisplay
            handleClickDelete={handleClickDeleteTutor}
            store={tutors}
          />
          <AddForm
            handleClickAdd={handleClickAddRepository}
            inputMap={REPOSITORIES_MAP}
            title="Имена репозиториев"
          />
          <StoreDisplay
            handleClickDelete={handleClickDeleteRepository}
            store={repositories}
          />

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

          <AddForm
            handleClickAdd={handleClickAddBlock}
            inputMap={BLOCKS_MAP}
            title="Блоки"
          />
          <StoreDisplay
            handleClickDelete={handleClickDeleteBlock}
            store={blocks}
          />
        </Space>
      </Content>
    </Layout>
  );
};
