import { Table } from '@orinui/components';
import { Button, Card, Space, Typography } from 'antd';
import { useMemo } from 'react';

/** 多列宽表：需设置 scroll.x 才能横向滚动；首尾列 fixed 需配合 scroll.x（与 antd Table 一致） */
function buildColumns() {
  const middle = Array.from({ length: 10 }).map((_, i) => ({
    title: `数据列 ${i + 1}`,
    dataIndex: `c${i}`,
    key: `c${i}`,
    width: 140,
  }));

  return [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 72,
      fixed: 'left' as const,
    },
    ...middle,
    {
      title: '操作',
      key: 'action',
      width: 120,
      fixed: 'right' as const,
      render: () => (
        <Space size="small">
          <Button type="link" size="small">
            查看
          </Button>
          <Button type="link" size="small">
            编辑
          </Button>
        </Space>
      ),
    },
  ];
}

const SCROLL_X = 72 + 10 * 140 + 120;

export default () => {
  const dataNormal = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => {
        const row: Record<string, unknown> = {
          id: `n-${i}`,
          index: i + 1,
        };
        for (let j = 0; j < 10; j++) row[`c${j}`] = `R${i + 1}-C${j + 1}`;
        return row;
      }),
    [],
  );

  const dataVirtual = useMemo(
    () =>
      Array.from({ length: 8000 }).map((_, i) => {
        const row: Record<string, unknown> = {
          id: `v-${i}`,
          index: i + 1,
        };
        for (let j = 0; j < 10; j++) row[`c${j}`] = `R${i + 1}-C${j + 1}`;
        return row;
      }),
    [],
  );

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card title="普通表格：横向滚动 + 左/右固定列">
        <Typography.Paragraph type="secondary" style={{ marginBottom: 12 }}>
          非虚拟模式下请显式传入{' '}
          <Typography.Text code>scroll.x</Typography.Text>（或{' '}
          <Typography.Text code>&apos;max-content&apos;</Typography.Text>
          ），否则无法触发横向滚动容器；列上设置{' '}
          <Typography.Text code>
            fixed: &apos;left&apos; | &apos;right&apos;
          </Typography.Text>{' '}
          锁定列。
        </Typography.Paragraph>
        <Table
          rowKey="id"
          columns={buildColumns()}
          dataSource={dataNormal}
          height={320}
          pagination={false}
          scroll={{ x: SCROLL_X }}
        />
      </Card>

      <Card title="虚拟表格：横向滚动 + 左/右固定列">
        <Typography.Paragraph type="secondary" style={{ marginBottom: 12 }}>
          开启 <Typography.Text code>virtual</Typography.Text> 时，若未传{' '}
          <Typography.Text code>scroll.x</Typography.Text>
          ，组件会按叶子列宽自动汇总；此处仍显式传入{' '}
          <Typography.Text code>scroll.x</Typography.Text>
          ，便于与固定列、列宽设计对齐。
        </Typography.Paragraph>
        <Table
          virtual
          rowKey="id"
          columns={buildColumns()}
          size="small"
          dataSource={dataVirtual}
          height={380}
          pagination={false}
          scroll={{ x: SCROLL_X }}
        />
      </Card>
    </Space>
  );
};
