import React from "react";

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




const HistoryOffer = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <Accordion
                style={{
                    marginTop: "5vh",

                }}
                expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '38%', flexShrink: 0 }}>
                        Рассмотрение рабочей группой
                    </Typography>
                    <Typography sx={{ color: '#3ee09d', padding:'10px' }}>12-09-21</Typography>
                    <Typography sx={{ color: '#3ee09d', padding:'10px' }}>-</Typography>
                    <Typography sx={{ color: '#e43988', padding:'10px' }}>15-09-21</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Предложение прошло предварительное рассмотрение. передано в подразделения: УГК, УИС.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography sx={{ width: '38%', flexShrink: 0 }}>Рассмотрение подразделением УГК</Typography>
                    <Typography sx={{ color: '#3ee09d', padding:'10px' }}>15-09-21</Typography>
                    <Typography sx={{ color: '#3ee09d', padding:'10px' }}>-</Typography>
                    <Typography sx={{ color: '#e43988', padding:'10px' }}>18-09-21</Typography>

                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Предложение прошло предварительное рассмотрение УГК. Оценки выставлены.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography sx={{ width: '38%', flexShrink: 0 }}>Рассмотрение подразделением УИС</Typography>
                    <Typography sx={{ color: '#3ee09d', padding:'10px' }}>15-09-21</Typography>
                    <Typography sx={{ color: '#3ee09d', padding:'10px'}}>-</Typography>
                    <Typography sx={{ color: '#e43988', padding:'10px' }}>21-09-21</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Предложение прошло предварительное рассмотрение УИС. Оценки выставлены.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography sx={{ width: '38%', flexShrink: 0 }}>Рассмотрение подразделением комиссии</Typography>
                    <Typography sx={{ color: '#3ee09d', padding:'10px' }}>21-09-21</Typography>
                    <Typography sx={{ color: '#3ee09d', padding:'10px' }}>-</Typography>
                    <Typography sx={{ color: '#e43988', padding:'10px' }}>28-09-21</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Отклонено в связи экономической нецелесообразностью.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
export default HistoryOffer;