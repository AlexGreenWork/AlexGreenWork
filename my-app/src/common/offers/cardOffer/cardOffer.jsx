import React from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CommonOffer from "./offersProperties/general/general";
import ConclusionOffer from "./offersProperties/conclusion/conclusion";
import InfoAboutAuthor from "./offersProperties/InfoAuthor/infoAboutAuthor";
import s from "./cardOffer.module.css"
import ResultsOffer from "./offersProperties/resultsOffer/resultsOffer";
import HistoryOffer from "./offersProperties/History/historyOffer";
import ComissionOffer from "./offersProperties/comission/comission";
import Disk from "../../components/disk/Disk";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{div: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const CardOffer = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (


        
        <div className={s.cardOfferContainer}>
            <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} variant="scrollable"
                          scrollButtons
                          allowScrollButtonsMobile
                          aria-label="scrollable force tabs example">
                        <Tab label="Общие" {...a11yProps(0)} />
                        <Tab label="Об авторе" {...a11yProps(1)} />
                        <Tab label="Заключение" {...a11yProps(2)} />
                        <Tab label="Результаты" {...a11yProps(3)} />
                        <Tab label="История внедрения" {...a11yProps(4)} />
                        <Tab label="Файлы" {...a11yProps(5)} />
                        <Tab label="Внедрение" {...a11yProps(6)} />
                        <Tab label="Комиссия" {...a11yProps(7)} />


                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <CommonOffer/>


                </TabPanel>
                <TabPanel value={value} index={1}>
                    <InfoAboutAuthor/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ConclusionOffer/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <ResultsOffer/>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <HistoryOffer/>
                </TabPanel>
                <TabPanel value={value} index={5}>
                    Файлы
                    <Disk/>
                </TabPanel>
                <TabPanel value={value} index={6}>
                    Внедрение
                </TabPanel>
                <TabPanel value={value} index={7}>
                    <ComissionOffer/>
                </TabPanel>


            </Box>
        </div>


    )
}
export default CardOffer;