import styled, { keyframes} from 'styled-components';


export const bounce = keyframes`
 30% { transform: scale(1.2); }
  40%, 60% { transform: rotate(-20deg) scale(1.2); }
  50% { transform: rotate(20deg) scale(1.2); }
  70% { transform: rotate(0deg) scale(1.2); }
  100% { transform: scale(1); }
`;
export const lineAnimation = keyframes`
  0% {width: 0%;}
  100% {width: 100%;}
`;