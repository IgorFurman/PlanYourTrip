import styled, { keyframes, css, createGlobalStyle } from 'styled-components';

import { MDBBtn } from 'mdb-react-ui-kit';

//
// animation
const bounce = keyframes`
 30% { transform: scale(1.2); }
  40%, 60% { transform: rotate(-20deg) scale(1.2); }
  50% { transform: rotate(20deg) scale(1.2); }
  70% { transform: rotate(0deg) scale(1.2); }
  100% { transform: scale(1); }
`;
// global styles

export const GlobalStyle = createGlobalStyle`
 *, *::before, *::after {
    box-sizing: border-box;
  }
 body {

		font-family: 'Lato', sans-serif;
		font-size: 18px;
    
    @media (max-width: 576px) {
      font-size: 14px;
    }
    
    @media (min-width: 577px) and (max-width: 1024px) {
      font-size: 16px;
    }
    
    @media (min-width: 1025px) {
      font-size: 18px;
    }
  }
`;

// Mixin for repeated styles
const boxShadow = css`
	background-color: white;
	border-radius: 5px;
	box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
`;

// main styles
export const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: auto auto auto auto;
	grid-template-areas:
		'map map details'
		'visit visit details'
		'weather weather details'
		'attractions restaurants hotels';
	gap: 10px;
	width: 100%;
	align-items: stretch;

	@media (max-width: 1024px) {
		grid-template-rows: auto auto auto auto auto auto;
		grid-template-areas:
			'map map map'
			'details details details'
			'details details details'
			'visit visit visit'
			'weather weather weather'
			'attractions attractions attractions'
			'hotels hotels hotels'
			'restaurants restaurants restaurants'
			
	}
	@media (min-width: 768px) and (max-width: 1024px) {
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: auto auto auto auto auto;
		grid-template-areas:
			'map map map map'
			'details details weather weather'
			'details details weather weather'
			'visit visit attractions attractions'
			'hotels hotels restaurants restaurants';
	}
`;

export const StandardContainer = styled.div`
	padding: 1.25rem;
	margin: 1.25rem 0.625rem;
	@media (max-width: 576px) {
		padding: 0.625rem;
		margin: 0.625rem 0.3125rem;
	}
`;
// list
export const ListContainer = styled(StandardContainer)`
	${boxShadow};
	overflow: auto;
	height: 90%;
`;

export const List = styled.ul`
	height: 50vh;
	width: 100%;
	list-style: none;
	padding: 0;
	margin: 0;
	overflow: auto;

	@media (max-width: 576px) {
		height: 60vh;
	}
`;

export const ListItem = styled.li`
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 0.9375rem 0.625rem;
	margin-bottom: 0.625rem;

	@media (max-width: 576px) {
		padding: 0.625rem;
	}
`;
// btns
export const ButtonSearch = styled.button`
	background-color: #afa7ba;
	color: #031316;
	padding: 0.625rem 1.25rem;
	width: 100%;
	border-radius: 5px;
	border: none;
	cursor: pointer;
	transition: background-color 0.3s;
	&:hover {
		background-color: #efe6ef;
	}

	@media (max-width: 576px) {
		padding: 0.5rem 1rem;
		
		font-size: 1.2rem;
	}
`;

export const ButtonList = styled.button`
	background-color: #031316;
	color: white;
	padding: 0.8rem 0.9rem;
	border-radius: 5px;
	font-size: 0.9rem;
	border: none;
	cursor: pointer;
	
	

	&:hover {
		background-color: #303e3c;
	}
	&:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

	@media (max-width: 576px) {
		padding: 0.6rem 1.5rem;
		margin-right: 0.5em;
		font-size: 0.7rem;
	}
	@media (max-width: 768px) {
		
		margin-right: 0.7em;
		font-size: 0.8rem;
	}
	@media (min-width: 769px) {
		margin-right: 0.5em;
		margin-top: 0.3em;
		font-size: 0.8rem;
	}
`;

export const Input = styled.input`
	padding: 0.625rem;
	border-radius: 5px;
	border: 1px solid #ccc;
	width: 100%;
	
	box-sizing: border-box;
	margin-bottom: 0.625rem;

	@media (max-width: 576px) {
		padding: 0.7rem;
		font-size: 1rem;
		margin-bottom: 0.8rem;
	}
`;
// map
export const MapContainerStyled = styled(StandardContainer)`
	position: relative;
	height: 90vh;
	width: 100%;

	box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
		rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
		rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;

	@media (max-width: 576px) {
		height: 80vh;
	}
`;
// h2 style
export const Heading = styled.h2`
	@media (max-width: 576px) {
		font-size: 18px;
	}
`;
// header
export const Header = styled.header`
	display: flex;
	width: 100%;
	height: fit-content;
	justify-content: space-between;
	align-items: center;
	background-color: #031316;
	padding: 1.25rem;
	color: white;
	margin-bottom: 1.25rem;

	.logo {
		width: 100%;
		max-width: 250px;
		height: auto;
		background: none;
	}
	@media (max-width: 576px) {
	
		padding: 0.65rem;

		.logo {
			display: none
		}
		@media (min-width: 768px) {
			.logo {
				max-width: 300px;
				min-height: 260px;
				max-height: 320px;
			}
		}
	}
`;
export const Form = styled.form`
display: flex;
flex-direction: column;
margin: 0 auto;
@media (min-width: 768px) {
	margin-left: 1em;
}
`
// Check inputs

export const CheckBoxWrapper = styled.div`
  display: flex;
	
  align-items: space-around;
  justify-content: flex-start;
  margin-bottom: 2em;
`;

export const CheckBoxLabel = styled.label`
  position: relative;
  margin-right: 0.5em;
  padding-left: 0.2em;
	margin-bottom: 2.2em;
  cursor: pointer;
  display: inline-block;
  width: 90px;
  height: 34px;

  &:before,
  &:after {
    position: absolute;
		top: 40px;
		left: 0;
    content: "";
    transition: 0.4s;
  }

  &:before {
    background-color: #ccc;
    width: 100%;
    height: 100%;
    border-radius: 34px;
  }

  &:after {
    background-color: #fff;
    bottom: 0px;
		top: 44px;
    left: 4px;
    height: 26px;
    width: 26px;
    border-radius: 50%;
  }
`;

export const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
	
  z-index: -1;

  &:checked + ${CheckBoxLabel} {
    &:before {
      background-color: #66bb6a;
    }
    &:after {
      transform: translateX(55px);
    }
  }
`;
// loading spinner 



	export const SpinnerContainer = styled.div`

	display: flex;
	align-items: center;
  justify-content: center;
  padding: 0rem;
	`

// place details
export const PlaceDetailsStyled = styled(StandardContainer)`
	${boxShadow}
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	flex-wrap: wrap;
	min-width: 50%;
	max-width: 96%;
`;
export const OpinionsWrapper = styled.div`
	max-width: 100%;
`;

// another components

export const WebsideLink = styled.a`
	text-decoration: none;
	color: #000033;
	font-weight: bold;
	transition: color 0.3s, text-decoration 0.3s;
	margin-bottom: 0;
	&:hover {
		color: #3300cc;
		text-decoration: underline;
	}
	&:active {
		color: #3300cc;
	}
`;

export const DownloadList = styled(WebsideLink)`
	display: inline-block;
	margin-bottom: 1rem;
`;

export const OpeningHours = styled.div`
	p {
		text-transform: uppercase;
		font-weight: bold;
	}
	ul {
		display: flex;
		flex-direction: column;
		list-style: none;
		padding-left: 0;
	}
`;

export const CarouselWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	overflow: hidden;
	padding: 1rem 0;
`;

export const CarouselItem = styled.div`
	flex: 0 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto;
	width: 100%;
`;

export const CarouselImage = styled.img`
	height: 500px;
	width: 90%;
	object-fit: cover;
`;

// map legend
export const LegendContainer = styled.div`
	position: absolute;
	top: 25px;
	left: 25px;
	background-color: white;
	padding: 0.625rem;
	box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
	border-radius: 10px;
	z-index: 999;
`;

export const LegendItem = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 0.3rem;
`;

export const LegendPin = styled.img`
	width: 25px;
	height: 25px;
	margin-right: 0.3rem;
`;

export const LegendLabel = styled.span`
	font-size: 0.875rem;
`;
export const PinStyled = styled(({ shouldBounce, ...props }) => <img {...props} />)`
  width: 25px;
  height: 30px;
  cursor: pointer;
  z-index: 1;
  position: relative;
  animation: ${(props) =>
    props.shouldBounce
      ? css`
          ${bounce} 1s ease-in-out
        `
      : 'none'};
`;

/* footer */

export const StyledFooter = styled.footer`
	margin-top: 3.125rem;
	text-align: center;
	color: white;
`;

export const FooterContainer = styled.div`
	display: flex;
	justify-content: space-around;
	text-align: center;
	background-color:  #303e3c;
	padding: 3.75rem;
	padding-bottom: 0;
`;

export const FooterSection = styled.section`
	margin-bottom: 4rem;
	h2 {
		font-size:1.2rem;
	}
`;

export const SocialIcon = styled(MDBBtn).attrs({
	floating: true,
})`
	margin: 25px;
	font-size: 30px;
	background-color: none;
	transition: opacity .3s;

	&:hover {
		opacity:0.8;
	}
	
`;

export const FooterCompanyName = styled.div`
	text-align: center;
	padding: 3rem;
	background-color:#031316;
`;

export const LogoContainer = styled.div`
	display: flex;
	text-align: center;
	justify-content: center;
	img {
		max-width: 50%;
		height: fit-content;
	}
`;

/* weather box */

export const WeatherContainer = styled(StandardContainer)`
	${boxShadow};
	grid-area: weather;
	width: 96%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	> * {
		width: 100%;
	}
	img {
		max-width: 60%;
		margin: 0 auto;
	}
	@media (min-width: 1024px) {
		width: 97%;
	}
`;
