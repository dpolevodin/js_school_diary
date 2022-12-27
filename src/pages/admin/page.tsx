import {
  Layout,
  Space,
  Typography,
  Checkbox,
  Col,
  Row,
  DatePickerProps,
} from "antd";
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
import { AddForm } from "../../features/add-form/AddForm";
import { StoreDisplayForms } from "../../features/store-display-forms/StoreDisplayForms";
import { AddDate } from "../../features/add-date/AddDate";
import { StoreDisplayDates } from "../../features/store-display-dates/StoreDisplayDates";
import styles from "./page.module.css";

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
      <Content className={styles._}>
        <Space direction="vertical">
          <AddForm
            handleClickAdd={handleClickAddTutor}
            inputMap={TUTORS_MAP}
            title="Преподаватели"
          />
          <StoreDisplayForms
            handleClickDelete={handleClickDeleteTutor}
            store={tutors}
          />
          <AddForm
            handleClickAdd={handleClickAddRepository}
            inputMap={REPOSITORIES_MAP}
            title="Имена репозиториев"
          />
          <StoreDisplayForms
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
          <AddDate
            handleChangeAddDate={hadleChangeForbiddenDays}
            title="Красные дни календаря"
          />
          <StoreDisplayDates
            handleClickDeleteDate={handleClickDeleteForbiddenDate}
            store={forbiddenDates}
          />
          <AddDate
            handleChangeAddDate={hadleChangeAdditionalDays}
            title="Зеленые даты"
          />
          <StoreDisplayDates
            handleClickDeleteDate={handleClickDeleteAdditionalDate}
            store={additionalDates}
          />

          <AddForm
            handleClickAdd={handleClickAddBlock}
            inputMap={BLOCKS_MAP}
            title="Блоки"
          />
          <StoreDisplayForms
            handleClickDelete={handleClickDeleteBlock}
            store={blocks}
          />
        </Space>
      </Content>
    </Layout>
  );
};
