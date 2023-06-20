import styled, { createGlobalStyle } from 'styled-components';

import { colors } from './colors';

export const GlobalStyle = createGlobalStyle`
 *, *::before, *::after {
    box-sizing: border-box;
  }
 body {
	  color: ${colors.main};
		font-family: 'Lato', sans-serif;
		font-size: 14px;

    
    @media (min-width: 576px) {
			font-size: 15px;
    }
    
    @media (min-width: 577px) {
			font-size: 16px;
    }
    
    @media (min-width: 1025px) {
      font-size: 18px;
    }
  }


`;