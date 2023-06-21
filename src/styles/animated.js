
import styled from 'styled-components';
import { animated } from 'react-spring';
import { colors} from './colors';

export const AnimatedAirplane = styled(animated.div)`
  position: absolute;
  left: -380px;
  top: 50%;
  transform: translateY(-50%);
  img {
    width: 340px;
    height: 340px;
  }
`;

export const AnimatedTitle = styled(animated.h1)`
	font-size: 3rem;
	font-weight: bold;
	color: ${colors.light};
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	@media (min-width: 772px) {
		font-size: 3.2rem;
		font-weight: bold;
	}
`;

export const AnimatedSlogan = styled(animated.p)`
 margin: 0 auto;
	text-align: center;
	font-size: 0.8em;
	font-style: italic;
	color: ${colors.light};
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
	padding: 0 0 2rem 0;
	@media (min-width: 576px) {
		padding: 0;
	}
`;
