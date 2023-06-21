import styled, { keyframes, css, createGlobalStyle } from 'styled-components';

import { MDBBtn } from 'mdb-react-ui-kit';
import { colors } from './colors';

import { bounce, lineAnimation } from './animations';

import { boxShadow } from './mixins';

// main styles
export const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2rem;
	grid-template-rows: auto auto auto auto;
	grid-template-areas:
		'map map details'
		'visit visit details'
		'weather weather details'
		'attractions restaurants hotels';

	width: 100%;
	align-items: stretch;
	padding: 1rem;

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
			'restaurants restaurants restaurants';
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
	width: 99%;
	padding: 0.625rem;
	margin: 0.625rem 0.3125rem;

	@media (min-width: 576px) {
		padding: 1.15rem 1rem;
		margin: 0 auto;
		width: 100%;

		h2 {
			margin: 1rem 0 0 0;
		}
	}
`;
// list
export const ListContainer = styled(StandardContainer)`
	${boxShadow};
	overflow: auto;
	height: 100%;
`;

export const List = styled.ul`
	height: 60vh;
	list-style: none;
	padding: 0;
	margin: 0;
	overflow: auto;
	@media (min-width: 576px) {
		height: 50vh;
		width: 100%;
	}
`;

export const ListItem = styled.li`
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 0.93rem 0.62rem;
	margin-bottom: 0.625rem;

	@media (min-width: 576px) {
		padding: 0.625rem;
	}
`;
// btns
export const ButtonSearch = styled.button`
	background-color: ${colors.buttonBackground};
	color: ${colors.main};
	padding: 0.625rem 1.25rem;
	margin-bottom: 1rem;
	width: 100%;
	border-radius: 5px;
	border: none;
	cursor: pointer;
	transition: background-color 0.3s;

	@media (min-width: 576px) {
		padding: 0.5rem 1rem;
		font-size: 1.2rem;
		margin: 0 auto;

		&:hover {
			background-color: ${colors.buttonHover};
		}
	}
`;

export const ButtonList = styled.button`
	background-color: ${colors.main};
	color: ${colors.bgWhite};
	padding: 0.6rem 1.2rem;
	margin-right: 0.5rem;
	font-size: 0.7rem;
	border: none;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		background-color: ${colors.buttonHoverSecondary};
	}
	&:disabled {
		background-color: ${colors.buttonDisabled};
		cursor: not-allowed;
	}

	@media (min-width: 576px) {
		padding: 0.8rem 0.9rem;
		border-radius: 5px;
		font-size: 0.9rem;
	}
	@media (mix-width: 768px) {
		font-size: 0.8rem;
	}
	@media (min-width: 769px) {
		margin-right: 0.5em;
		margin-top: 0.3em;
		font-size: 0.8rem;
	}
`;

export const ButtonToggleShowList = styled.button`
	position: relative;
	background-color: ${colors.bgWhite};
	color: ${colors.main};
	width: 25%;
	padding: 0.3rem 1rem 0.3rem 0;
	margin: 1rem 0;
	border-radius: 5px;
	text-align: left;
	font-weight: bold;
	border: none;
	cursor: pointer;
	transition: 0.3s color;

	&:hover {
		color: ${colors.buttonHoverSecondary};
	}
	@media (min-width: 576px) {
		width: 30%;
		padding: 0.5rem 0.5rem 0.5rem 0.1rem;
	}
`;






// title

export const TitleContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 20vh;
	overflow: hidden;
	background-image: linear-gradient(
		to top,
		${colors.main},
		${colors.secondary}
	);
	margin: 0;
	padding: 5rem 0;
	color: ${colors.bgWhite};

	@media (min-width: 772px) {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 20vh;
		background-image: linear-gradient(
			to top,
			${colors.main},
			${colors.secondary}
		);
		margin: 0;
		padding: 6rem 0;
		color: ${colors.bgWhite};
	}
`;

export const PalmIslands = styled.div`
	img {
		display: none;
		@media (min-width: 772px) {
			display: inline-block;
			position: absolute;
			width: 10rem;
			height: 10rem;
			bottom: -0.2rem;
			right: 2rem;
		}
	}
`;

export const Suitcase = styled.div`
	img {
		display: none;
		@media (min-width: 772px) {
			display: inline-block;
			position: absolute;
			rotate: 25deg;
			width: 10rem;
			height: 10rem;
			bottom: -0.2rem;
			left: 2rem;
		}
	}
`;

export const TitleStyled = styled.div`
	font-size: 1.2rem;
	font-weight: bold;
	color: ${colors.light};
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	@media (min-width: 772px) {
		font-size: 1.5rem;
		font-weight: bold;
	}
`;
// header
export const Header = styled.header`
	display: flex;
	width: 100%;
	height: fit-content;
	justify-content: space-between;
	align-items: center;
	background-color: ${colors.main};
	padding: 1.25rem auto;
	color: ${colors.bgWhite};
	margin-bottom: 1.25rem;
	.logo {
		display: none;
	}
	@media (min-width: 576px) {
		padding: 0.65rem;

		@media (min-width: 768px) {
			color: ${colors.bgWhite};
			margin-bottom: 1.5rem;

			.logo {
				display: flex;
				flex: 1;
				width: 100%;
				max-width: 250px;
				height: auto;
				background: none;
			}
		}
	}
`;
export const Form = styled.form`
	display: flex;
	flex-direction: column;
	font-size: 1.2rem;

	margin: 0 auto;
	@media (min-width: 768px) {
		margin-left: 1em;
		font-size: 1rem;
		max-width: 50%;
	}
`;

export const Input = styled.input`
	border-radius: 5px;
	border: 1px solid #ccc;
	width: 100%;
	padding: 0.7rem;
	margin-top: 0.2rem;
	margin-bottom: 0.8rem;

	@media (min-width: 576px) {
		padding: 0.7rem;
		font-size: 1rem;
	}
`;
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
	width: 120px;
	height: 34px;
	font-size: 1.2rem;

	&:before,
	&:after {
		position: absolute;
		top: 40px;
		left: 0;
		content: '';
		transition: 0.4s;
	}

	&:before {
		background-color: ${colors.border};
		width: 100%;
		height: 100%;
		border-radius: 34px;
	}

	&:after {
		background-color: ${colors.bgWhite};
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
			background-color: ${colors.checkBoxChecked};
		}
		&:after {
			transform: translateX(85px);
		}
	}
`;
// loading spinner

export const SpinnerContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0rem;
`;
// map

export default styled(StandardContainer)`
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
// map legend

export const LegendContainer = styled.div`
	position: absolute;
	top: 25px;
	left: 25px;
	background-color: ${colors.bgWhite};
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
export const PinStyled = styled(({ shouldBounce, ...props }) => (
	<img {...props} />
))`
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

// place details
export const PlaceDetailsStyled = styled(StandardContainer)`
	${boxShadow}
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	flex-wrap: wrap;
	min-width: 50%;
	max-width: 100%;
`;
export const OpinionsWrapper = styled.div`
	max-width: 100%;
`;

export const WebsideLink = styled.a`
	position: relative;
	text-decoration: none;
	color: ${colors.link};
	font-weight: bold;
	transition: color 0.3s, text-decoration 0.3s;
	margin-bottom: 0;

	&:active {
		color: ${colors.linkHover};
	}
	&::before {
		content: '';
		color: ${colors.main};
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		transition: opacity 0s;
		opacity: 0;
		border-radius: 5px;
	}

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 2px;
		background-color: ${colors.main};
		transition: width 0s;
	}

	&:hover::after {
		animation: ${lineAnimation} 2s forwards;
	}

	&:hover::before {
		opacity: 1;
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

/* weather box */

export const WeatherContainer = styled(StandardContainer)`
	${boxShadow};
	grid-area: weather;
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
`;

export const WeatherInfo = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	padding-right: 10px;
`;

export const WeatherImg = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;

	img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}
`;

/* footer */

export const StyledFooter = styled.footer`
	margin-top: 1.125rem;
	text-align: center;
	color: ${colors.bgWhite};
`;

export const FooterContainer = styled.div`
	display: flex;
	justify-content: space-around;
	text-align: center;
	background-image: linear-gradient(
		to top,
		${colors.main},
		${colors.secondary}
	);
	padding: 3.75rem;
	padding-bottom: 0;
`;

export const FooterSection = styled.section`
	margin-bottom: 4rem;
	h2 {
		font-size: 1.2rem;
	}
`;

export const SocialIcon = styled(MDBBtn).attrs({
	floating: true,
})`
	margin: 25px;
	font-size: 30px;
	background-color: none;
	transition: opacity 0.3s;

	&:hover {
		opacity: 0.8;
	}
`;

export const FooterCompanyName = styled.div`
	text-align: center;
	padding: 3rem;
	background-color: ${colors.main};
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

