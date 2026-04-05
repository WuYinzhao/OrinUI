import { Table } from '@orinui/components';
import { Card, Space, Typography } from 'antd';
import { useMemo } from 'react';

const columnsWide = [
  { title: '序号', dataIndex: 'index', key: 'index', width: 72 },
  ...Array.from({ length: 8 }).map((_, i) => ({
    title: `列 ${i + 1}`,
    dataIndex: `c${i}`,
    key: `c${i}`,
    width: 150,
  })),
];

/** 叶子列 width 之和 = 72 + 8*150 = 1272，与组件内 sumLeafColumnWidths 一致 */
const columnsFixedAutoX = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width: 72,
    fixed: 'left' as const,
  },
  ...Array.from({ length: 8 }).map((_, i) => ({
    title: `数据 ${i + 1}`,
    dataIndex: `c${i}`,
    key: `c${i}`,
    width: 150,
  })),
  {
    title: '操作',
    key: 'action',
    width: 100,
    fixed: 'right' as const,
    render: () => <Typography.Link>详情</Typography.Link>,
  },
];

export default () => {
  const data = useMemo(
    () =>
      Array.from({ length: 6000 }).map((_, i) => {
        const row: Record<string, unknown> = {
          id: String(i),
          index: i + 1,
        };
        for (let j = 0; j < 8; j++) row[`c${j}`] = `v${i}-${j}`;
        return row;
      }),
    [],
  );

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card title="虚拟表格：完全不传 scroll（由组件合并 scroll.y，并自动计算 scroll.x）">
        <Typography.Paragraph type="secondary" style={{ marginBottom: 12 }}>
          开启 <Typography.Text code>virtual</Typography.Text> 且
          <strong>不传</strong> <Typography.Text code>scroll</Typography.Text>{' '}
          时：纵向 <Typography.Text code>scroll.y</Typography.Text> 仍由{' '}
          <Typography.Text code>height</Typography.Text> 等算出；横向{' '}
          <Typography.Text code>scroll.x</Typography.Text> 为各叶子列{' '}
          <Typography.Text code>width</Typography.Text> 之和（本例合计 1272）。
        </Typography.Paragraph>
        <Table
          virtual
          rowKey="id"
          columns={columnsWide}
          dataSource={data}
          height={360}
          pagination={false}
        />
      </Card>

      <Card title="虚拟表格：只传不含 x 的 scroll（仍自动计算 scroll.x）">
        <Typography.Paragraph type="secondary" style={{ marginBottom: 12 }}>
          例如传入{' '}
          <Typography.Text code>
            {`scroll={{ scrollToFirstRowOnChange: true }}`}
          </Typography.Text>{' '}
          等不含 <Typography.Text code>x</Typography.Text>{' '}
          的配置时，只要未显式设置{' '}
          <Typography.Text code>scroll.x</Typography.Text>，虚拟表仍会按列宽汇总{' '}
          <Typography.Text code>scroll.x</Typography.Text>
          。下列含左/右固定列，同样未传{' '}
          <Typography.Text code>scroll.x</Typography.Text>。
        </Typography.Paragraph>
        <Table
          virtual
          rowKey="id"
          columns={columnsFixedAutoX}
          dataSource={data}
          height={380}
          pagination={false}
          scroll={{ scrollToFirstRowOnChange: true }}
        />
      </Card>

      <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
        普通表格（
        <Typography.Text code>{`virtual={false}`}</Typography.Text>
        ）下组件不会自动写入 <Typography.Text code>scroll.x</Typography.Text>
        ，若需横向滚动或固定列，请自行传入{' '}
        <Typography.Text code>scroll.x</Typography.Text>
        ，见上文「横向滚动与固定列」示例。
      </Typography.Paragraph>
    </Space>
  );
};
