import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import DateTimePicker from '@mui/lab/DateTimePicker';


import s from "../comission/comission.module.css";
import CardOfferUpload from "../../../../components/card/card";
import DndOffer from "../../../../components/dnd/dnd";


const ComissionOffer = () => {
    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (

        <div className={s.nameOffer}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                    <div>Дата и время заседания комиссии</div>
                    <DateTimePicker
                        label="Дата и время"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Stack>
            </LocalizationProvider>
            <div className={s.uploadContainer} sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'}}>
                <div>
                    Файл протокола:
                </div>
                <div className={s.filesContainer}>
                    <CardOfferUpload/>
                </div>
                <DndOffer/>
            </div>

            <div>краткая аннотация решения</div>
            <div>Файл выписки</div>
            <div>Величина вознаграждения</div>

        </div>
    )
}
export default ComissionOffer;