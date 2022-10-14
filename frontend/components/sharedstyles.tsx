import styled from 'styled-components';

const Container = styled.div<{ center: boolean; }>`
  max-width: 2500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: ${({ center }) => center ? 'center' : 'flex-start'};
  width: 90%;
  overflow-x: hidden;
`;

export { Container };
