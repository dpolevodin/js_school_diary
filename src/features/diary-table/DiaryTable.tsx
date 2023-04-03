import React, {useContext, useEffect, useRef, useState} from "react";
import {Form, FormInstance, InputRef, Select, Table} from "antd";
import {useUnit} from "effector-react";
import {$users, updateUser} from "../../pages/sign/signUp/model";
import {$studentDiary} from "../../pages/diary/model";
import {User} from "../../pages/sign/signUp/lib/types";

const EditableContext = React.createContext<FormInstance<User> | null>(null);

interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof User;
    record: User;
    handleSave: (record: User) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
                                                       title,
                                                       editable,
                                                       children,
                                                       dataIndex,
                                                       record,
                                                       handleSave,
                                                       ...restProps
                                                   }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current!.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };


    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();

            handleSave({ ...record, ...values }, values);
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    enum HomeworksStatus {
        default = "Не выбрано",
        approved = "Зачет",
        pending = "Выполняется",
        rejected = "Незачет",
    }

    const studentDiary = useUnit($studentDiary);

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                initialValue={HomeworksStatus.default}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Select
                    options={[
                            { value: "approved", label: "Зачет" },
                            { value: "pending", label: "Выполняется" },
                            { value: "rejected", label: "Незачет" },
                            { value: "default", label: "Не выбрано" },
                          ]}
                    ref={inputRef}
                    onChange={save}
                    // onPressEnter={save}
                    onBlur={save}
        />
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export const DiaryTable: React.FC = () => {
    const [
        updateUserFn,
        users,
        studentDiary,
    ] = useUnit([
        updateUser,
        $users,
        $studentDiary,
    ]);

    enum HomeworksStatus {
        default = "Не выбрано",
        approved = "Зачет",
        pending = "Выполняется",
        rejected = "Незачет",
    }

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string | string[] })[] = [
        {
            title: "Студент",
            dataIndex: "fullName",
            editable: false,
            width: "15%",
        },
        {
            title: "ДЗ-1",
            dataIndex: ['homework1', 'status'],
            width: '15%',
            editable: true,
            render: (status: string) => HomeworksStatus[status]
        },
        {
            title: "ДЗ-2",
            dataIndex: ['homework2', 'status'],
            width: '15%',
            editable: true,
            render: (status: string) => HomeworksStatus[status]
        },
        {
            title: "ДЗ-3",
            dataIndex: ['homework3', 'status'],
            width: '15%',
            editable: true,
            render: (status: string) => HomeworksStatus[status]
        },
        {
            title: "ДЗ-4",
            dataIndex: ['homework4', 'status'],
            width: '15%',
            editable: true,
            render: (status: string) => HomeworksStatus[status]
        },
        {
            title: "ДЗ-5",
            dataIndex: ['homework5', 'status'],
            width: '15%',
            editable: true,
            render: (status: string) => HomeworksStatus[status]
        }
    ];

    const handleSave = (row: User, st: string |  {[key: string]: string }) => {
        const newData = [...users];
        const index = newData.findIndex((item) => row.id === item.id);
        const item = newData[index];
        const status = Object.values(st)[0];
        const id = Object.keys(st)[0];
        const newStatus = item.homeworks?.map(homework =>
            homework.id === id ? {...homework, ...status} : homework);
        newData.splice(index, 1, {
            ...item,
            homeworks: newStatus,
        });
        updateUserFn(newData[index])
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: User) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    })

    return (
        <div>
            <Table
                  components={components}
                  rowClassName={() => 'editable-row'}
                  rowKey="id"
                  bordered
                  dataSource={studentDiary}
                  columns={columns as ColumnTypes}
                  pagination={false}
            />
        </div>
    )}