import styled from 'styled-components';

const PremiumRibbon = styled.h6`
  margin: 0;
  position: absolute;
  top: 0px;
  left: 1.25em;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  padding: 0.5em 1em;
  font-weight: normal;
  background: ${({ theme }) => theme.colors.primary700};
  color: rgba(255, 255, 255, 0.87);
  box-shadow: 0 0 1px 1px rgba(20, 23, 28, 0.1),
    0 3px 1px 0 rgba(20, 23, 28, 0.1);
  transform: scale(1.2) rotate(-3deg);
`;

export default PremiumRibbon;
