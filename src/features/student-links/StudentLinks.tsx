import { Col, Space, Typography } from "antd";
import { Link } from "atomic-router-react";
import { SettingOutlined } from "@ant-design/icons";
import { routes } from "../../shared/lib/atomic-router/route";

import styles from "../../pages/student/page.module.css";

const { Text } = Typography;

type Props = {
  tgNickName: string;
  githubNickName: string;
  repositories: {
    name: string;
    description: string;
  }[];
};
export const StudentLinks = ({
  tgNickName,
  githubNickName,
  repositories,
}: Props) => (
  <Col>
    <Space size={10} direction="vertical">
      <Link className={styles.button} to={routes.studentSettings}>
        <Text>
          <SettingOutlined className={styles.icon} />
        </Text>
      </Link>
      <Link to={`https://t.me/${tgNickName.slice(1)}`}>
        <u>{tgNickName}</u>
      </Link>
      <Link to={`https://github.com/${githubNickName}`}>
        <u>{githubNickName}</u>
      </Link>
      {repositories.map((repository) => (
        <Link to={`https://github.com/${githubNickName}/${repository.name}`}>
          <u>{repository.description}</u>
        </Link>
      ))}
    </Space>
  </Col>
);
