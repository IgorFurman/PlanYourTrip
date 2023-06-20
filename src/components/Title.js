import React, { useEffect, useState } from 'react';

import {
	TitleStyled,
	TitleContainer,
	Suitcase,
	PalmIslands,
} from '../styles/styles';
import {
	AnimatedAirplane,
	AnimatedTitle,
	AnimatedSlogan,
} from '../styles/animated';

import { animated, useSpring } from 'react-spring';
import AirplanePNG from '../images/airplane.png';
import SuitcasePNG from '../images/suitcase-title.png';
import PalmIslandPNG from '../images/island-title.png';

const Title = React.forwardRef((props, ref) => {
	const [resetAnimation, setResetAnimation] = useState(false);
	const [displayedH1, setDisplayedH1] = useState('');
	const [displayedSlogan, setDisplayedSlogan] = useState('');
	const [indexH1, setIndexH1] = useState(0);
	const [indexSlogan, setIndexSlogan] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);

	const textH1 = 'Plan Your Trip';
	const textSlogan = 'Twój przewodnik w świecie podróży';

	const airplaneAnimation = useSpring({
		reset: resetAnimation,
		from: { left: '-50px', opacity: 0 },
		to: { left: '2600px', opacity: 1 },
		config: { duration: 9000 },
		onRest: () => {
			setResetAnimation(!resetAnimation);
		},
	});

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
};

	useEffect(() => {
		const timerH1 = setInterval(() => {
			if (indexH1 < textH1.length) {
				setDisplayedH1((oldH1) => oldH1 + textH1.charAt(indexH1));
				setIndexH1(indexH1 + 1);
			} else {
				clearInterval(timerH1);
			}
		}, 50);

		return () => {
			clearInterval(timerH1);
		};
	}, [textH1, indexH1]);

	useEffect(() => {
		if(indexH1 === textH1.length) {
			const timerSlogan = setInterval(() => {
				if (indexSlogan < textSlogan.length) {
					setDisplayedSlogan((oldSlogan) => oldSlogan + textSlogan.charAt(indexSlogan));
					setIndexSlogan(indexSlogan + 1);
				} else {
					clearInterval(timerSlogan);
				}
			}, 50);

			return () => {
				clearInterval(timerSlogan);
			};
		}
	}, [textSlogan, indexSlogan, indexH1, textH1]);
  

	return (
		<TitleContainer ref={ref}>
			<TitleStyled >
				<Suitcase>
					{' '}
					<img src={SuitcasePNG} alt='Walizka' />{' '}
				</Suitcase>
				<PalmIslands>
					{' '}
					<img src={PalmIslandPNG} alt='Palmy' />
				</PalmIslands>
				<AnimatedTitle>{displayedH1}</AnimatedTitle>
				<AnimatedSlogan>{displayedSlogan}</AnimatedSlogan>
				<AnimatedAirplane style={airplaneAnimation}>
					<img src={AirplanePNG} alt='Samolot' />
				</AnimatedAirplane>
			</TitleStyled>
		</TitleContainer>
	);
});
export default Title;
