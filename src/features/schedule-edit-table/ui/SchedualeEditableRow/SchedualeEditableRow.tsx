/* eslint-disable react/jsx-props-no-spreading */
import { Form, FormInstance } from "antd";
import { Children, cloneElement, createContext } from "react";
import { useSortable } from "@dnd-kit/sortable";
import classNames from "classnames";
import isEmpty from "lodash.isempty";
import { useUnit } from "effector-react";
import { $schedule } from "../../../schedule-table/model";
import { ExtendedScheduleDataType } from "../../../schedule-table/api/types";
import styles from "../../ScheduleEditTable.module.css";
// import "../../styles.css"

type EditableRowProps = {
  "data-row-key": string;
};

export const SchedualeEditableContext =
  createContext<FormInstance<ExtendedScheduleDataType> | null>(null);

export const SchedualeEditableRow = ({
  "data-row-key": id,
  style,
  className,
  children,
  ...rest
}: EditableRowProps & React.HTMLAttributes<HTMLTableRowElement>) => {
  const [form] = Form.useForm();
  const schedule = useUnit($schedule);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const dragStyle = {
    transition,
    "--translate-x": `${transform?.x ?? 0}px`,
    "--translate-y": `${transform?.y ?? 0}px`,
  };

  const cls = classNames(className, styles.dragItem, {
    [styles.dragOverlay]: isDragging && !isEmpty(schedule),
  });

  return (
    <Form form={form} component={false}>
      <SchedualeEditableContext.Provider value={form}>
        <tr
          id={id}
          ref={setNodeRef}
          {...attributes}
          className={cls}
          style={{ ...style, ...dragStyle }}
          {...rest}
        >
          {Children.map(children, (child) => {
            if (child && (child as React.ReactElement).key === "sort") {
              return cloneElement(child as React.ReactElement, {
                additionalProps: {
                  ...listeners,
                },
              });
            }

            return child;
          })}
        </tr>
      </SchedualeEditableContext.Provider>
    </Form>
  );
};
