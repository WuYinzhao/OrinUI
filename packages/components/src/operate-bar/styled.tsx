import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  background: #f5f7fa;
  height: 32px;
  align-items: center;
  padding: 0 24px 0 8px;
  .left {
    font-size: 14px;
    display: flex;
    align-items: center;
    & > div,
    & > span {
      margin-left: 16px;
    }
    .downloadBox {
      font-family: SourceHanSansCN-Medium;
      color: #1686eb;
      cursor: pointer;
      span {
        margin-right: 4px;
      }
    }
  }
  .right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-family: SourceHanSansCN-Regular;
    font-size: 12px;
    color: #3c4455;
    & > div,
    & > span {
      margin-left: 16px;
    }
  }
`;

export const UnitList = styled.div`
  display: flex;
  text-align: center;
  cursor: pointer;
  span {
    padding: 5px 8px;
    &.active {
      background: #ffffff;
      border-radius: 2px;
      color: #348aea;
    }
  }
`;
