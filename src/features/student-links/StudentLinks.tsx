import { Dropdown, MenuProps, Typography } from "antd";
import { Link } from "atomic-router-react";
import { GithubOutlined, SettingTwoTone } from "@ant-design/icons";
import { routes } from "../../shared/lib/atomic-router/route";
import { ReactComponent as TelegramIcon } from "./telegram.svg";

import styles from "./StudentLinks.module.css";

const { Text } = Typography;

type Props = {
  tgNickName: string | undefined;
  githubNickName: string | undefined;
  repositories: {
    name: string;
    description: string;
  }[];
};
export const StudentLinks = ({
  tgNickName,
  githubNickName,
  repositories,
}: Props) => {
  let items: MenuProps["items"] = [
    {
      key: tgNickName || "Ник в телеграм",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={tgNickName ? `https://t.me/${tgNickName.slice(1)}` : "#"}
        >
          {tgNickName || "Ваш telegram"}
        </a>
      ),
      icon: <TelegramIcon className={styles.telegramIcon} />,
    },
    {
      key: githubNickName || "Ник на github",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={githubNickName ? `https://github.com/${githubNickName}` : "#"}
        >
          {githubNickName || "Ваш github никнейм"}
        </a>
      ),
      icon: <GithubOutlined />,
    },
  ];
  if (githubNickName && repositories.length > 0) {
    items = [
      ...items,
      {
        key: "repositories",
        label: "Репозитории",
        children: repositories.map((repository) => ({
          key: repository.name,
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://github.com/${githubNickName}/${repository.name}`}
            >
              {repository.description}
            </a>
          ),
        })),
      },
    ];
  }

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Link className={styles.button} to={routes.studentSettings}>
        <Text>
          <SettingTwoTone className={styles.icon} />
        </Text>
      </Link>
    </Dropdown>
  );
};
