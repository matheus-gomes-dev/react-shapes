import styled from 'styled-components';

export const GridContainer = styled.div`
  height: 500px;
  min-width: 800px;
  background-color: #f2ffe6;
  border: 3px solid #4d9900;
  border-radius: 5px;
  position: relative;
  margin-top: 30px;
`;

export const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ActionsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 30px;
  button {
    margin: 10px;
    width: 400px;
  }
`;
