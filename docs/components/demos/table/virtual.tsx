import { Table } from '@orinui/components';
import { Card, Typography } from 'antd';
import { useMemo } from 'react';

const columns = [
  { title: '序号', dataIndex: 'index', key: 'index', width: 80 },
  { title: '名称', dataIndex: 'name', key: 'name', width: 200 },
  { title: '数值', dataIndex: 'value', key: 'value', width: 120 },
  { title: '备注', dataIndex: 'note', key: 'note', width: 160 },
];

export default () => {
  const dataSource = useMemo(
    () =>
      Array.from({ length: 10000 }).map((_, i) => ({
        id: String(i),
        index: i + 1,
        name: `虚拟行 ${i + 1}`,
        value: i % 997,
        note: 'antd 5 内置虚拟列表',
      })),
    [],
  );

  return (
    <Card>
      <Typography.Paragraph type="secondary" style={{ marginBottom: 12 }}>
        设置 <Typography.Text code>virtual</Typography.Text> 开启 antd 5
        虚拟滚动；未传 <Typography.Text code>scroll.x</Typography.Text>{' '}
        时，横向宽度为各叶子列 <Typography.Text code>width</Typography.Text>{' '}
        之和（见源码 <Typography.Text code>sumLeafColumnWidths</Typography.Text>
        ）。
      </Typography.Paragraph>
      <Table
        virtual
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        height={420}
        pagination={false}
      />
    </Card>
  );
};
