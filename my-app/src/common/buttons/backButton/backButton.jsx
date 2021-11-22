import React from 'react';
import backBtn from './backBtn.png';
import {useHistory} from "react-router-dom";

function GoBack() {
  const history = useHistory()
  const handleGoBack = e=>{
    history.goBack()
  }

  return(
          <img src={backBtn} alt="назад"
            onClick={handleGoBack}
          />

  )
}

export default GoBack;