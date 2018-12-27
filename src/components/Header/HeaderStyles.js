import styled from 'styled-components';

export const HeaderDiv = styled.div`
  background-color: #404040;
  color: white;
`;

export const AboutButton = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;
  position: absolute;
  margin-left: 20px;
  margin-top: -30px;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const modalDivStyle = {
  backgroundColor: 'white',
  width: '600px',
  height: '610px',
  margin: 'auto',
  textAlign: 'center',
  borderRadius: '5px',
  border: 'none',
  marginTop: '15px',
};

export const headerContentStyle = {
  position: 'relative',
  top: '20px',
};

export const pictureContainerStyle = {
  marginTop: '50px',
};

export const scrollableDiv = {
  height: '230px',
  border: '1px solid #bfbfbf',
  borderRadius: '7px',
  overflowY: 'scroll',
  width: '95%',
  marginTop: '30px',
  marginLeft: 'auto',
  marginRight: 'auto',
  textAlign: 'left',
  paddingLeft: '30px',
};

export const aboutContent = {
  marginBottom: '20px',
  marginRight: '30px',
};

export const anchorStyle = {
  marginLeft: '5px',
  marginRight: '5px',
};

export const authorInfoStyle = {
  fontSize: '12px',
  position: 'relative',
  top: '5px',
};
