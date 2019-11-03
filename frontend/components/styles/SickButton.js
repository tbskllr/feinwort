import styled from 'styled-components';

const SickButton = styled.button`
  display: inline-block;
  transition: all 0.5s;
  &[disabled] {
    opacity: 0.5;
  }
`;

export default SickButton;
