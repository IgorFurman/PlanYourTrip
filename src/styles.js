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
  body {
	
		font-family: 'Lato', sans-serif;}
`;
// main styles
export const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: auto auto auto auto;
	grid-template-areas:
		'map map details'
		'visit visit details'
		'attractions restaurants hotels';

	gap: 20px;
	width: 100%;

	@media (max-width: 1024px) {
		grid-template-rows: auto auto auto auto auto auto;
		grid-template-areas:
			'map map map'
			'details details details'
			'details details details'
			'attractions attractions attractions'
			'hotels hotels hotels'
			'restaurants restaurants restaurants'
			'visit visit visit';
	}
	@media (min-width: 768px) and (max-width: 1024px) {
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: auto auto auto auto;
		grid-template-areas:
			'map map map map'
			'visit visit details details'
			'attractions attractions attractions attractions'
			'hotels hotels restaurants restaurants';
	}
`;
export const StandardContainer = styled.div`
	padding: 20px;
	margin: 10px;
	@media (max-width: 576px) {
		padding: 10px;
		margin: 5px;
	}
`;
// list
export const listContainer = styled(StandardContainer)`
	background: #fff;
	border-radius: 5px;
	box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);

	overflow: auto;
	height: 100%;
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
	padding: 15px 10px;
	margin-bottom: 10px;

	@media (max-width: 576px) {
		padding: 10px;
	}
`;
// btns
export const ButtonSearch = styled.button`
	background-color: #afa7ba;
	color: #031316;
	padding: 10px 20px;
	border-radius: 5px;
	border: none;
	cursor: pointer;
	transition: background-color 0.3s;
	&:hover {
		background-color: #efe6ef;
	}

	@media (max-width: 576px) {
		padding: 5px 10px;
	}
`;

export const ButtonList = styled.button`
	background-color: #808080;
	color: white;
	padding: 5px 10px;
	border-radius: 5px;
	border: none;
	cursor: pointer;
	font-size: 12px;
	&:hover {
		background-color: #a9a9a9;
	}

	@media (max-width: 576px) {
		padding: 3px 5px;
		font-size: 10px;
	}
`;

export const Input = styled.input`
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
	width: 100%;
	box-sizing: border-box;
	margin-bottom: 10px;

	@media (max-width: 576px) {
		padding: 5px;
		margin-bottom: 5px;
	}
`;
// map
export const MapContainerStyled = styled(StandardContainer)`
	position: relative;
	height: 90vh;
	width: auto;

	box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
		rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0px 8px 16px),
		rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;

	@media (max-width: 576px) {
		height: 80vh;
	}
`;
// header
export const Heading = styled.h2`
	@media (max-width: 576px) {
		font-size: 18px;
	}
`;

export const Header = styled.header`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	background-color: #031316;
	padding: 20px;
	color: white;
	margin-bottom: 20px;
	.logo {
		width: 100%;
		max-width: 250px;
		height: auto;
	}
	@media (max-width: 576px) {
		padding: 10px;

		.logo {
			max-width: 250px;
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

// details
export const DetailsContainer = styled(StandardContainer)`
	background-color: white;
	border-radius: 5px;
	box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
	min-width: 200px;
	max-width: 300px;
	overflow: hidden;
	@media (max-width: 576px) {
		min-width: 150px;
		max-width: 250px;
	}
`;
export const ButtonContainer = styled.div`
	width: 100%;
	display: flex;
	gap: 15px;
`;

export const ListContainer = styled.div`
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 15px;
	margin: 10px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
	@media (max-width: 576px) {
		padding: 10px;
		margin: 5px;
	}
`;

export const PlaceDetailsStyled = styled(StandardContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	flex-wrap: wrap;
	border: 1px solid #ccc;
	border-radius: 5px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
	width: 90%;

`;
export const OpinionsWrapper = styled.div`
max-width: 100%
`


// another components

export const WebsideLink = styled.a`
	text-decoration: none;
	color:	#000033;
	font-weight: bold;
	transition: color 0.3s, text-decoration 0.3s;
	margin-bottom:0;
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
margin-bottom: 15px;
`

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
	padding: 15px 0;
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
	padding: 10px;
	box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
	border-radius: 10px;
	z-index: 999;
`;

export const LegendItem = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 5px;
`;

export const LegendPin = styled.img`
	width: 25px;
	height: 25px;
	margin-right: 5px;
`;

export const LegendLabel = styled.span`
	font-size: 14px;
`;
export const PinStyled = styled.img.attrs(props => ({
  shouldbounce: props.shouldBounce ? 1 : 0,
}))`
  width: 25px;
  height: 30px;
  cursor: pointer;
  z-index: 1;
  position: relative;
  animation: ${props => props.shouldbounce ? css`${bounce} 1s ease-in-out` : 'none'};
`;

/* footer */

export const StyledFooter = styled.footer`
 margin-top: 50px;
  text-align: center;
  color: white;
`;

export const FooterContainer = styled.div`
display: flex;
justify-content: space-around;
text-align: center;
background-color:#031316;
  padding: 60px;
  padding-bottom: 0;
`;

export const FooterSection = styled.section`
  margin-bottom: 4rem;
	
`;

export const SocialIcon = styled(MDBBtn).attrs({
  floating: true,
})`
  margin: 25px; 
  font-size: 30px;
  background-color: none;
`;

export const FooterCompanyName = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #303e3c;
`;

export const LogoContainer = styled.div`
distplay:flex;
text-align: center;
justify-content: center;
img {
	width: 100%;
	height: fit-content;
	
}
`