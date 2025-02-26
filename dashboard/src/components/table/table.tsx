import { Space, Table } from "antd";
import type { TableProps } from "antd";

interface Action {
  label: string;
  onClick: (data: any, record: any) => void;
  className?: string;
  disabled?: (record: any) => boolean; // Optional disabled condition for actions
}

interface CustomTableProps {
  columns: TableProps<any>["columns"];
  data: any[];
  actions?: Action[];
  loading: boolean;
  pageSize?: number;
}

export const CustomTable = ({
  columns = [],
  data,
  actions = [],
  loading,
  pageSize = 12,
}: CustomTableProps) => {
  const tableColumns = actions?.length
    ? [
      ...columns,
      {
        title: "Actions",
        key: "actions",
        render: (_: any, record: any) => (
          <Space size="middle">
            {actions.map((action, index) => {
              const isDisabled = action.disabled?.(record); // Determine if the action is disabled
              return (
                <button
                  key={index}
                  onClick={() => !isDisabled && action.onClick(record, record)}
                  className={`${action.className || "bg-blue-500 hover:bg-blue-600 transition duration-150 py-1 px-3 rounded text-white"} ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={isDisabled}
                >
                  {action.label}
                </button>
              );
            })}
          </Space>
        ),
      },
    ]
    : columns;

  return (
    <Table
      columns={tableColumns}
      dataSource={data.map((item) => ({ ...item, key: item._id }))}
      pagination={{ pageSize }}
      loading={loading}
      scroll={{ x: "max-content" }}
    />
  );
};
