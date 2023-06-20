// Mixin for repeated styles
import styled, { css } from 'styled-components';
import {colors} from './colors';

export const boxShadow = css`
	background-color: ${colors.bgWhite};
	border-radius: 5px;
	box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
`;