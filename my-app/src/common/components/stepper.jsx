import React from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import {useDispatch, useSelector} from "react-redux";

const steps = ['Подано ', 'Первоначальное рассмотрение', 'Рассмотрение подразделениями','Рассмотрение комиссией', 'Внедрение' ];

const StepperOffer = () => {
    const dispatch = useDispatch()
    const rejectStatusOff = useSelector( state => state.rejectStatusOffer )
    const stepStatusOff = useSelector(state=>state.stepStatusOffer)
    console.log(stepStatusOff)


    const isStepFailed = (step) => {
        return step === rejectStatusOff;
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={stepStatusOff} sx={{'@media screen and (max-width: 553px)': {
                    flexWrap:'wrap'}}}>
                {steps.map((label, index) => {
                    const labelProps = {};
                    if (isStepFailed(index)) {
                        labelProps.optional = (
                            <Typography variant="caption" color="error">
                                Отклонено
                            </Typography>
                        );

                        labelProps.error = true;
                    }

                    return (
                        <Step key={label}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box>
    );

}
export default StepperOffer;