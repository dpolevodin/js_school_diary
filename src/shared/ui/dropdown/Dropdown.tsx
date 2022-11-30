import { cloneElement, MouseEvent, ReactElement, useRef, useState } from 'react';
import cls from 'classnames';
import { useClickOutside } from 'src/shared/lib';

import styles from './Dropdown.module.scss';

type Props = {
  trigger: ReactElement;
  overlay: ReactElement;
  position?: 'top' | 'bottom';
  className?: string;
  shouldCloseOnClick?: boolean;
};

const targetTags = ['button'];
const targetTypes = ['radio'];

const POSITION_STYLES = {
  bottom: 'top',
  top: 'bottom',
};

export const Dropdown = ({
  position = 'bottom',
  className,
  trigger,
  overlay,
  shouldCloseOnClick = true,
}: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const [isOpen, setOpen] = useState(false);

  useClickOutside(dropdownRef, () => setOpen(false));

  const myTrigger = cloneElement(trigger, {
    ref: triggerRef,
    onClick: () => setOpen(!isOpen),
  });

  const triggerHeight = triggerRef.current?.offsetHeight ?? 0;

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!shouldCloseOnClick) {
      return;
    }
    const target = event.target as HTMLInputElement;
    // Закрываем если кликнули по кнопке или radio
    const tagName = target.tagName.toLowerCase();
    const type = target.type;

    if (targetTags.includes(tagName) || targetTypes.includes(type)) {
      setOpen(false);
    }
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      {myTrigger}
      {isOpen && (
        <div
          onClick={handleClick}
          className={cls(styles.overlay, className)}
          style={{ [POSITION_STYLES[position]]: `${triggerHeight + 4}px` }}
        >
          {overlay}
        </div>
      )}
    </div>
  );
};
