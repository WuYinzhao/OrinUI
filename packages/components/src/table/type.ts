import type { TableProps } from 'antd';

export interface VirtualTableProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> extends TableProps<T> {
  id?: string;
  height: number;
  isScroll?: boolean;
  /** 为 `true` 时启用 antd 5 内置虚拟表格（`virtual`）；也可直接传 Table 的 `virtual` */
  virtual?: boolean;
  /**
   * 虚拟表格行高（px），默认 36。会写入根节点 CSS 变量 `--orinui-table-body-row-height`，
   * 并作为 rc-table `listItemHeight`（仅 `virtual === true`）。
   */
  listItemHeight?: number;
  /**
   * 单层表头行高（px），默认 40。用于估算表头总高度与 CSS 变量 `--orinui-table-header-cell-height`。
   */
  singleHeaderHeight?: number;
  paddingNum?: number;
}
