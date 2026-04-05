import { Table } from '@orinui/components';
import { Card } from 'antd';

const columns = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '数值', dataIndex: 'value', key: 'value' },
];

const dataSource = [
  { id: '1', name: '行 1', value: 11 },
  { id: '2', name: '行 2', value: 22 },
  { id: '3', name: '行 3', value: 33 },
];

export default () => {
  return (
    <Card title="基础表格（固定高度 + 纵向滚动由 height 计算）">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        height={280}
        pagination={false}
      />
    </Card>
  );
};
