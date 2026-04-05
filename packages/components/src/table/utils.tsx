import type { ColumnType, ColumnsType } from 'antd/es/table';

/** 递归汇总叶子列宽度（支持带 children 的表头），用于虚拟表格默认 scroll.x */
export function sumLeafColumnWidths<T extends Record<string, unknown>>(
  columns: ColumnsType<T> | undefined,
): number {
  if (!columns?.length) return 0;
  let sum = 0;
  for (const col of columns) {
    if ('children' in col && col.children && col.children.length > 0) {
      sum += sumLeafColumnWidths(col.children as ColumnsType<T>);
    } else {
      sum += resolveLeafColumnWidth(col as ColumnType<T>);
    }
  }
  return sum;
}

function resolveLeafColumnWidth<T>(col: ColumnType<T>): number {
  const { width, minWidth } = col;
  if (typeof width === 'number' && !Number.isNaN(width)) return width;
  if (typeof width === 'string') {
    const n = parseFloat(width);
    if (!Number.isNaN(n)) return n;
  }
  if (typeof minWidth === 'number') return minWidth;
  return 0;
}

export const getCellColor = (level: string) => {
  switch (level) {
    case '1':
      return { style: { backgroundColor: '#FFE8D5' } };
    case '2':
      return { style: { backgroundColor: '#DEE7FF' } };
    default:
      return {};
  }
};

export const getCellText = (text: string, level: string) => {
  switch (level) {
    case '1':
    case '2':
      return (
        <div
          className="ant-table-cell-ellipsis"
          style={{ fontWeight: 'bold', fontSize: 16 }}
        >
          {text}
        </div>
      );
    default:
      return text;
  }
};

export default {
  getCellColor,
  getCellText,
  sumLeafColumnWidths,
};
