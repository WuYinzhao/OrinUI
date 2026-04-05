import { Table } from '@orinui/components';
import { Card, Typography } from 'antd';

const columns = [
  {
    title: '基础',
    children: [
      { title: '名称', dataIndex: 'name', key: 'name', width: 140 },
      { title: '编码', dataIndex: 'code', key: 'code', width: 120 },
    ],
  },
  {
    title: '指标',
    children: [
      { title: '数量', dataIndex: 'qty', key: 'qty', width: 100 },
      { title: '金额', dataIndex: 'amount', key: 'amount', width: 120 },
    ],
  },
];

const dataSource = [
  { id: '1', name: '物料 A', code: 'A-001', qty: 12, amount: 1200 },
  { id: '2', name: '物料 B', code: 'B-002', qty: 5, amount: 860 },
];

export default () => {
  return (
    <Card>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 12 }}>
        多级表头使用 <Typography.Text code>columns[].children</Typography.Text>{' '}
        配置即可；组件会按层级估算表头高度（
        <Typography.Text code>lineHeight</Typography.Text>
        ）。虚拟表格时同样按<strong>叶子列</strong>宽度汇总{' '}
        <Typography.Text code>scroll.x</Typography.Text>。
      </Typography.Paragraph>
      <Table
        virtual
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        height={320}
        pagination={false}
      />
    </Card>
  );
};
