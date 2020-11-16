import styled from 'styled-components';
import { string } from 'prop-types';
import { Spacings } from '@constants/styleConstants';

const StyledButton = styled.div`
  display: inline-block;
  padding: ${Spacings.B2} ${Spacings.B4};
  box-shadow: 0px ${Spacings.B2} ${Spacings.B4} rgba(0, 0, 0, 0.4);
  width: ${({ $width }) => $width};
  border-radius: ${Spacings.B1};
  text-align: center;
  cursor: pointer;
`;

const Button = ({ label, width }) => {
  return <StyledButton $width={width}>{label}</StyledButton>;
};

Button.propTypes = {
  label: string.isRequired,
  width: string
};

Button.defaultProps = {
  width: '140px'
};

export default Button;
