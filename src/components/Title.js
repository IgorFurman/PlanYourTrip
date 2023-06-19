import React, { useEffect, useState } from 'react';
import { TitleStyled, TitleContainer, Suitcase, Slogan, PalmIslands } from '../styles/styles';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import AirplanePNG from '../images/airplane.png';
import SuitcasePNG from '../images/suitcase-title.png';
import PalmIslandPNG from '../images/island-title.png'

import { AiOutlineCalendar } from "react-icons/ai";

const AnimatedAirplane = styled(animated.div)`
  position: absolute;
  left: -380px;
  top: 50%;
  transform: translateY(-50%);
  img {
    width: 340px;
    height: 340px;
  }
`;

const Title = React.forwardRef((props, ref) => {
  const [resetAnimation, setResetAnimation] = useState(false);
  
  const airplaneAnimation = useSpring({
    reset: resetAnimation,
    from: { left: '-50px', opacity: 0 },
    to: { left: '2600px', opacity: 1 },
    config: { duration: 9000 },
    onRest: () => setResetAnimation(false)
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setResetAnimation(true);
    }, 9000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <TitleContainer> 
    <TitleStyled ref={ref}>
      <Suitcase> <img src={SuitcasePNG} alt="Walizka" /> </Suitcase>
     <PalmIslands> <img src={PalmIslandPNG} alt="Palmy"  />
     </PalmIslands>
      <h1>Plan Your Trip</h1>
      <Slogan><AiOutlineCalendar /> Twój przewodnik w świecie podróży </Slogan>
      <AnimatedAirplane style={airplaneAnimation}>
        <img src={AirplanePNG} alt="Samolot" />
      </AnimatedAirplane>
    </TitleStyled>
    </TitleContainer>
  );
});

export default Title;
