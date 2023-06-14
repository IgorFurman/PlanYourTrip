import React from 'react';

import { ClipLoader } from "react-spinners";
import { SpinnerContainer} from '../styles/styles'



const Spinner = () => (

    <SpinnerContainer>
      <ClipLoader color={"#afa7ba"} loading={true} size={45} />
    </SpinnerContainer>

);

export default Spinner;
