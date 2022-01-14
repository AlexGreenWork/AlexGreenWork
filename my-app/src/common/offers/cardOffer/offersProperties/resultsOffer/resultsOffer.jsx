import React from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import s from './results.module.css'
import {store} from "../../../../../reducers";


function createData(name, actuality, innovation, cost, duration, evulation) {
    return {
        name,
        actuality,
        innovation,
        cost,
        duration,
        evulation,
        history: [
            {
                dateStart: '2021-01-09',
                inspector: 'Филипчик Владимир Петрович',
                dateFinish: '2021-08-09',
            },
            {
                dateStart: '2021-08-09',
                inspector: 'Смольская Ольга Петровна',
                dateFinish: '2021-10-09',
            },
            {
                dateStart: '2021-07-09',
                inspector: 'Реут Виктор Сидорович ',
                dateFinish: '2021-12-09',
            },

        ],

    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.actuality}</TableCell>
                <TableCell align="right">{row.innovation}</TableCell>
                <TableCell align="right">{row.cost}</TableCell>
                <TableCell align="right">{row.duration}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Оценка предложения
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Проверил</TableCell>
                                        <TableCell>Дата начала проверки</TableCell>

                                        <TableCell align="right">Дата окончания проверки</TableCell>
                                        <TableCell align="right">Общая оценка</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.inspector}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.inspector}
                                            </TableCell>
                                            <TableCell>{historyRow.dateStart}</TableCell>
                                            <TableCell align="right">{historyRow.dateFinish}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(row.actuality +
                                                    row.innovation +
                                                    row.cost +
                                                    row.duration ) / 4}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};
let actualityRG = store.getState().offers.offer.responsibles_rg?.actual;
let innovRG = store.getState().offers.offer.responsibles_rg?.innov;
let costRG = store.getState().offers.offer.responsibles_rg?.cost;
let extentRG = store.getState().offers.offer.responsibles_rg?.extent;
let middleNoteRG = (actualityRG+innovRG+costRG+extentRG)/4
console.log(middleNoteRG)
console.log(actualityRG)
const rows = [
    createData('Рабочая группа', `${actualityRG}`, `${innovRG}`, `${costRG}`, `${extentRG}`, 6),
    createData('УГК', 8, 6, 7, 4, 6),
    createData('ТЭО', 8, 6, 7, 4, 6),
    createData('Председатель комиссии', 8, 6, 7, 4, 6),


];


const ResultsOffer = () => {

    return (
        <div className={s.containerOff} >

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Проверяющий</TableCell>
                            <TableCell align="right">Актуальность</TableCell>
                            <TableCell align="right">Инновативность</TableCell>
                            <TableCell align="right">Затратность</TableCell>
                            <TableCell align="right">Протяженность</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>

    )
}
export default ResultsOffer;