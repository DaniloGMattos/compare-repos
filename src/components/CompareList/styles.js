import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 50px;
`;
export const Repository = styled.div`
  width: 250px;
  background: #fff;
  display: flex;
  border-radius: 3px;
  flex-direction: column;
  margin: 0 10px;
  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }
    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }
  ul {
    list-style: none;
    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }
      &:nth-child(2n-1) {
        background: #f5f5f5;
      }
    }
  }
  button {
    border-radius: 0;
    color: #fff;
    font-weight: bold;
    font-size: 13px;
  }
  .Delete-btn {
    background-color: #f00;
    &:hover {
      background-color: #bf0000;
    }
  }
  .Update-btn {
    background-color: #63f5b8;
    &:hover {
      background-color: #53d89f;
    }
  }
`;
