import { ReactNode } from 'react';
import cls from 'classnames';

import styles from './DropdownItem.module.scss';

type Props = {
  children: ReactNode;
  className?: string;
};

export const DropdownItem = ({ children, className }: Props) => {
  return <div className={cls(styles.dropdownItem, className)}>{children}</div>;
};
