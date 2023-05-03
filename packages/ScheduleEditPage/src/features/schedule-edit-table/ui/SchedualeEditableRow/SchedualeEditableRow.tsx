/* eslint-disable react/jsx-props-no-spreading */
import { Form, FormInstance } from "antd";
import { Children, cloneElement, createContext } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import classNames from "classnames";
import isEmpty from "lodash.isempty";
import { useUnit } from "effector-react";
import { MenuOutlined } from "@ant-design/icons";
import classes from "../../ScheduleEditTable.module.css";
import { ExtendedScheduleDataType } from "../../lib/types";
import { $schedule } from "../../../../mocks/mocks";

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

export const SchedualeEditableContext =
  createContext<FormInstance<ExtendedScheduleDataType> | null>(null);

export const SchedualeEditableRow = ({ children, ...props }: RowProps) => {
  const [form] = Form.useForm();
  const schedule = useUnit($schedule);
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props["data-row-key"],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && { ...transform, scaleY: 1, scaleX: isDragging ? 1.02 : 1 }
    )?.replace(/translate3d\(([^,]+),/, "translate3d(0,"),
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  return (
    <Form form={form} component={false}>
      <SchedualeEditableContext.Provider value={form}>
        <tr
          {...props}
          ref={setNodeRef}
          style={style}
          {...attributes}
          className={classNames({
            [classes.dragOverlay]: isDragging && !isEmpty(schedule),
          })}
        >
          {Children.map(children, (child) => {
            if ((child as React.ReactElement).key === "sort") {
              return cloneElement(child as React.ReactElement, {
                children: (
                  <MenuOutlined
                    ref={setActivatorNodeRef}
                    className={classes.dragIcon}
                    {...listeners}
                  />
                ),
              });
            }
            return child;
          })}
        </tr>
      </SchedualeEditableContext.Provider>
    </Form>
  );
};
