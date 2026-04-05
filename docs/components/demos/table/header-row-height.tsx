import { Table } from '@orinui/components';
import { Card, Space, Typography } from 'antd';
import { useMemo } from 'react';

const columns = [
  { title: '名称', dataIndex: 'name', key: 'name', width: 160 },
  { title: '说明', dataIndex: 'desc', key: 'desc' },
];

const dataSmall = [
  {
    id: '1',
    name: '默认行高',
    desc: 'singleHeaderHeight=40，listItemHeight=36（默认）',
  },
  { id: '2', name: '第二行', desc: '普通表格' },
];

export default () => {
  const dataVirtual = useMemo(
    () =>
      Array.from({ length: 5000 }).map((_, i) => ({
        id: `v-${i}`,
        name: `项 ${i + 1}`,
        desc: '虚拟表 + 紧凑行高',
      })),
    [],
  );

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card title="默认：表头 40px / 行高 36px">
        <Typography.Paragraph type="secondary" style={{ marginBottom: 12 }}>
          不传 <Typography.Text code>singleHeaderHeight</Typography.Text>、
          <Typography.Text code>listItemHeight</Typography.Text>{' '}
          时使用默认值；根节点会写入 CSS 变量{' '}
          <Typography.Text code>
            --orinui-table-header-cell-height
          </Typography.Text>
          、
          <Typography.Text code>--orinui-table-body-row-height</Typography.Text>
          。
        </Typography.Paragraph>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={dataSmall}
          height={260}
          pagination={false}
        />
      </Card>

      <Card title="普通表：加大表头与行高（singleHeaderHeight=56，listItemHeight=48）">
        <Typography.Paragraph type="secondary" style={{ marginBottom: 12 }}>
          普通表格同样应用上述 CSS 变量；
          <Typography.Text code>singleHeaderHeight</Typography.Text> 参与{' '}
          <Typography.Text code>scroll.y</Typography.Text>{' '}
          可用高度估算（表头总高 ≈ 层数 × singleHeaderHeight）。
        </Typography.Paragraph>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={dataSmall}
          height={320}
          pagination={false}
          singleHeaderHeight={56}
          listItemHeight={48}
        />
      </Card>

      <Card title="虚拟表：紧凑表头与行高（singleHeaderHeight=32，listItemHeight=28）">
        <Typography.Paragraph type="secondary" style={{ marginBottom: 12 }}>
          开启 <Typography.Text code>virtual</Typography.Text> 时，{' '}
          <Typography.Text code>listItemHeight</Typography.Text> 会同时传给
          rc-table 虚拟行高，需与样式一致。
        </Typography.Paragraph>
        <Table
          virtual
          rowKey="id"
          columns={columns}
          dataSource={dataVirtual}
          height={360}
          pagination={false}
          singleHeaderHeight={32}
          listItemHeight={28}
        />
      </Card>
    </Space>
  );
};
