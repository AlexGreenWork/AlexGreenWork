import * as React from 'react';
import PropTypes from 'prop-types';
import {alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import {visuallyHidden} from '@mui/utils';
import {useState} from "react";
import server from "../../../../actions/server";
import {API_LOC_URL, API_URL} from "../../../../config";
import {Test} from "./CartApplicants";

import st from "./cartApplicant.module.css";

export default function ListApp() {

    const [rows, setRows] = useState([])


    // props.req.map((number, index) => createData(
    //         `${number.surname + ' ' + number.name + ' ' + number.middlename}`,
    //         `${number.surname}`,
    //         `${number.name}`,
    //         `${number.speciality}`,
    //         `${number.bday}`,
    //         `${number.education}`,
    //         `${number.telNumber}`,
    //         `${number.photo}`,
    //         `${number.heldPosition1}`,
    //         `${number.heldPosition2}`,
    //         `${number.heldPosition3}`,
    //         `${number.email}`,
    //         `${number.address}`,
    //         `${number.recommender}`,
    //         `${number.workInBelaz}`
    //     )
    // )


    //
    // createData('Лизюков Виктор Николаевич', "Плотник", 25, "Среднее", +375296654817),
    //
    // // {name:'Лизюков Виктор Николаевич', spec:"Плотник", age:25, education:"Среднее",tel: '+375444445566'},
    // // {name:'Шалопаев Александр Михайлович', spec: "ERP-программист", age:16, education:"Среднее",tel: '+375296654817'},
    // createData('Петров Иван Иванович', "Event-менеджер", 60, "Среднее", +375296654817),
    // createData('Васильев Василий Петрович', "Web-дизайнер", 16, "Среднее", +375296654817),
    // createData('Акушевич Александр Федорович', "Авиадиспетчер", 32, "Среднее", +375296654817),
    // createData('Губич Наталья Яковлевна', "Бухгалтер", 90, "Высшее", +375296654817),
    // createData('Давыденко Генадий Федорович', "Ветиринар", 50, "Высшее", +375296654817),
    // createData('Солодкий Сергей Михайлович', "Верстальщик", 26, "Высшее", +375296654817),
    // createData('Тимохович Виктор Игоревич', "Врач", 28, "Среднее", +375296654817),
    // createData('Хоров Иван Михайлович', "Винодел", 40, "Среднее", +375296654817),
    // createData('Цыбулько Галина Васильевна', "Геофизик", 19, "Высшее", +375296654817),
    // createData('Бародич Вадим Владимирович', "Инженер по Охране труда", 18, "Высшее", +375296654817),
    // ];
    console.log("начальное ", rows)

    if (rows.length === 0) {
        try {
            server.send_post_request(`${API_URL}api/kadry/applicantsFromBd`, {})
                .then(res => {
                    console.log("res.data", res.data)
                    setRows(res.data)


                    // rows.splice(0, rows.length, ...res.data)

                    // rows.splice(createData(res.data))
                    // rows.splice(0, rows.length, ...req)

                })


        } catch (e) {
            alert(e)
        }

    }


    // rows.splice(0, rows.length, ...req)
    // console.log('rows', rows)
    // req.map((number, index) =>rows.push( createData(
    //     `${number.id}`,
    //         `${number.surname + ' ' + number.name + ' ' + number.middlename}`,
    //         `${number.surname}`,
    //         `${number.name}`,
    //         `${number.speciality}`,
    //         `${number.bday}`,
    //         `${number.education}`,
    //         `${number.telNumber}`,
    //         `${number.photo}`,
    //         `${number.heldPosition1}`,
    //         `${number.heldPosition2}`,
    //         `${number.heldPosition3}`,
    //         `${number.email}`,
    //         `${number.address}`,
    //         `${number.recommender}`,
    //         `${number.workInBelaz}`
    //     )
    // ))

    // function createData(id,name, surname, firstname, spec, age, education, tel, photo, heldPosition1, heldPosition2, heldPosition3, email, address, recommender, workInBelaz) {
    //
    //     return {
    //         id,
    //         name,
    //         surname,
    //         firstname,
    //         spec,
    //         age,
    //         education,
    //         tel,
    //         photo,
    //         heldPosition1,
    //         heldPosition2,
    //         heldPosition3,
    //         email,
    //         address,
    //         recommender,
    //         workInBelaz,
    //
    //     };
    // }

    function getAge(dateString) {
        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }


    console.log("--------", rows)

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const headCells = [


        {
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: 'ФИО соискателя',
        },
        {
            id: 'speciality',
            numeric: true,
            disablePadding: false,
            label: 'Специальность',
        },
        {
            id: 'bday',
            numeric: true,
            disablePadding: false,
            label: 'Возраст',
        },
        {
            id: 'education',
            numeric: true,
            disablePadding: false,
            label: 'Образование',
        },
        {
            id: 'telNumber',
            numeric: true,
            disablePadding: false,
            label: 'Телефон',
        },
    ];

    function EnhancedTableHead(props) {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        />
                    </TableCell>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    EnhancedTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };


    const EnhancedTableToolbar = (props) => {
        const {numSelected} = props;

        return (
            <Toolbar
                sx={{
                    pl: {sm: 2},
                    pr: {xs: 1, sm: 1},
                    ...(numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >
                {numSelected > 0 ? (
                    <Typography
                        sx={{flex: '1 1 100%'}}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} Выбрано
                    </Typography>
                ) : (
                    <Typography
                        sx={{flex: '1 1 100%'}}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Соискатели
                    </Typography>
                )}

                {numSelected > 0 ? (
                    <Tooltip title="Удалить">
                        <IconButton>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Фильтр листа">
                        <IconButton>
                            <FilterListIcon/>
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
        );
    };

    EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired,
    };


    function EnhancedTable(props) {
        const [order, setOrder] = React.useState('asc');
        const [orderBy, setOrderBy] = React.useState('calories');
        const [selected, setSelected] = React.useState([]);
        const [page, setPage] = React.useState(0);
        const [dense, setDense] = React.useState(false);
        const [rowsPerPage, setRowsPerPage] = React.useState(15);


        const handleRequestSort = (event, property) => {
            const isAsc = orderBy === property && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(property);
        };
        const handleSelectAllClick = (event) => {
            if (event.target.checked) {
                const newSelecteds = rows.map((n) => n.tel);
                setSelected(newSelecteds);
                return;
            }
            setSelected([]);
        };

        const handleClick = (event, tel) => {
            console.log(tel)
            const selectedIndex = selected.indexOf(tel);
            let newSelected = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, tel);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1),
                );
            }

            setSelected(newSelected);
        };

        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };

        const handleChangeDense = (event) => {
            setDense(event.target.checked);
        };

        const isSelected = (tel) => selected.indexOf(tel) !== -1;

        // Avoid a layout jump when reaching the last page with empty rows.
        const emptyRows =
            page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


        function ageToStr(props) {
            let txt;
            props = props % 100;
            if (props >= 5 && props <= 20) {
                txt = 'лет';
            } else {
                props = props % 10;
                if (props === 1) {
                    txt = 'год';
                } else if (props >= 2 && props <= 4) {
                    txt = 'года';
                } else {
                    txt = 'лет';
                }
            }
            return txt;
        }


        const [isOpen, setIsOpen] = React.useState(false)

        function toState(
            surname,
            name,
            middlename,
            photo,
            speciality,
            age,
            heldPosition1,
            heldPosition2,
            heldPosition3,
            education,
            telNumber,
            email,
            address,
            recommender,
            workInBelaz) {

            console.log("````````````````tcnm")
        }

        return (
            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', mb: 2}}>
                    <EnhancedTableToolbar numSelected={selected.length}/>
                    <TableContainer>
                        <FormControlLabel
                            control={<Switch checked={dense} onChange={handleChangeDense}/>}
                            label="Убрать отступы"
                        />
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >

                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />

                            <TableBody>
                                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {

                                        const isItemSelected = isSelected(row.telNumber);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        console.log("--------", props, index)


                                        function openCartState(props) {
                                            console.log(props)
                                            if (isOpen) {
                                                setIsOpen(false)

                                            } else {
                                                setIsOpen(true)

                                            }

                                        }

                                        function OpenCart(props) {
                                            if (isOpen) {
                                                return <CartApplicant req={props}
                                                                      style={{
                                                                          backgroundColor: "red",
                                                                          width: "100%",
                                                                          position: "absolute",
                                                                          height: "20px"
                                                                      }}
                                                />
                                            }
                                            console.log("openmchart", props)
                                            return <div style={{width: "0", height: "0", position: "absolute"}}></div>
                                        }


                                        const CartApplicant = (props) => {
                                            console.log("пропсы карт", props)
                                            const worker = props.req.workInBelaz

                                            const photo = props.req.photo
                                            console.log(props.req.recommender)
                                            return (
                                                <div className={st.cartContainer} style={{
                                                    position: "fixed",
                                                    right: "0",
                                                    bottom: "0",
                                                    zIndex: "999",
                                                    width: "100%",
                                                    height: "100%",
                                                    backgroundColor: "rgb(0 0 0 / 80%)",
                                                    display: "flex"
                                                }}>

                                                    <div onClick={openCartState} className={st.closeButton}>X</div>
                                                    <div className={st.containerProfileBox}>

                                                        <div className={st.row}>

                                                            <div className={st.leftCol}>

                                                                <div style={{
                                                                    height: "100%",
                                                                    backgroundColor: "#c7c2c2",
                                                                    padding: "10px",
                                                                    maxWidth: "15vw",
                                                                    minWidth: "15vw"
                                                                }}>
                                                                    <div className={st.profileInfo}
                                                                         style={{
                                                                             color: "#c7c2c2",
                                                                             boxShadow: "5px 5px 5px grey"
                                                                         }}>

                                                                        {photo ? <img src={props.req.photo}
                                                                                      style={{width: "100%"}} alt=""/> :
                                                                            <svg width="100%" height="100%"
                                                                                 viewBox="0 0 32 32" fill="none"
                                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                                <path
                                                                                    d="M16 2C13.2311 2 10.5243 2.82109 8.22202 4.35943C5.91973 5.89777 4.12532 8.08427 3.06569 10.6424C2.00607 13.2006 1.72882 16.0155 2.26901 18.7313C2.80921 21.447 4.14258 23.9416 6.10051 25.8995C8.05845 27.8574 10.553 29.1908 13.2687 29.731C15.9845 30.2712 18.7994 29.9939 21.3576 28.9343C23.9157 27.8747 26.1022 26.0803 27.6406 23.778C29.1789 21.4757 30 18.7689 30 16C30 12.287 28.525 8.72601 25.8995 6.1005C23.274 3.475 19.713 2 16 2ZM16 7C16.89 7 17.7601 7.26392 18.5001 7.75839C19.2401 8.25285 19.8169 8.95566 20.1575 9.77792C20.4981 10.6002 20.5872 11.505 20.4135 12.3779C20.2399 13.2508 19.8113 14.0526 19.182 14.682C18.5527 15.3113 17.7508 15.7399 16.8779 15.9135C16.005 16.0872 15.1002 15.9981 14.2779 15.6575C13.4557 15.3169 12.7529 14.7401 12.2584 14.0001C11.7639 13.26 11.5 12.39 11.5 11.5C11.4987 10.9087 11.6142 10.3229 11.8399 9.77637C12.0655 9.22981 12.397 8.73321 12.8151 8.31508C13.2332 7.89695 13.7298 7.56554 14.2764 7.33986C14.8229 7.11418 15.4087 6.99868 16 7ZM24 24.92C21.807 26.9023 18.9562 27.9999 16 27.9999C13.0439 27.9999 10.193 26.9023 8.00001 24.92V24.34C7.96214 22.9708 8.46602 21.6419 9.40221 20.6421C10.3384 19.6423 11.6313 19.0522 13 19H19C20.3625 19.0547 21.6493 19.6414 22.5841 20.6342C23.5189 21.6269 24.0273 22.9466 24 24.31V24.92Z"
                                                                                    fill="#566885"/>
                                                                            </svg>}

                                                                        {/*<img src={props.req.photo} style={{width: "100%"}} alt=""/>*/}
                                                                        {/*<svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                                                                        {/*    <path*/}
                                                                        {/*        d="M16 2C13.2311 2 10.5243 2.82109 8.22202 4.35943C5.91973 5.89777 4.12532 8.08427 3.06569 10.6424C2.00607 13.2006 1.72882 16.0155 2.26901 18.7313C2.80921 21.447 4.14258 23.9416 6.10051 25.8995C8.05845 27.8574 10.553 29.1908 13.2687 29.731C15.9845 30.2712 18.7994 29.9939 21.3576 28.9343C23.9157 27.8747 26.1022 26.0803 27.6406 23.778C29.1789 21.4757 30 18.7689 30 16C30 12.287 28.525 8.72601 25.8995 6.1005C23.274 3.475 19.713 2 16 2ZM16 7C16.89 7 17.7601 7.26392 18.5001 7.75839C19.2401 8.25285 19.8169 8.95566 20.1575 9.77792C20.4981 10.6002 20.5872 11.505 20.4135 12.3779C20.2399 13.2508 19.8113 14.0526 19.182 14.682C18.5527 15.3113 17.7508 15.7399 16.8779 15.9135C16.005 16.0872 15.1002 15.9981 14.2779 15.6575C13.4557 15.3169 12.7529 14.7401 12.2584 14.0001C11.7639 13.26 11.5 12.39 11.5 11.5C11.4987 10.9087 11.6142 10.3229 11.8399 9.77637C12.0655 9.22981 12.397 8.73321 12.8151 8.31508C13.2332 7.89695 13.7298 7.56554 14.2764 7.33986C14.8229 7.11418 15.4087 6.99868 16 7ZM24 24.92C21.807 26.9023 18.9562 27.9999 16 27.9999C13.0439 27.9999 10.193 26.9023 8.00001 24.92V24.34C7.96214 22.9708 8.46602 21.6419 9.40221 20.6421C10.3384 19.6423 11.6313 19.0522 13 19H19C20.3625 19.0547 21.6493 19.6414 22.5841 20.6342C23.5189 21.6269 24.0273 22.9466 24 24.31V24.92Z"*/}
                                                                        {/*        fill="#566885"/>*/}
                                                                        {/*</svg>*/}
                                                                        <h3>{props.req.fio}</h3>
                                                                        <span>{props.req.sp}</span>

                                                                    </div>
                                                                    <h3 style={{fontWeight: "bold"}}>Контакты</h3>
                                                                    <div>
                                                                        <div>
                                                                            <i></i>
                                                                        </div>
                                                                        <div>

                                                                            <div style={{fontWeight: "bold"}}>
                                                                                Телефон: <i></i>
                                                                            </div>
                                                                            +{props.req.tel}
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div>
                                                                            <i></i>
                                                                        </div>
                                                                        <div>

                                                                            <div style={{fontWeight: "bold"}}>
                                                                                E-mail: <i></i>
                                                                            </div>
                                                                            {props.req.email}
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div>
                                                                            <i></i>
                                                                        </div>
                                                                        <div>

                                                                            <div style={{fontWeight: "bold"}}>
                                                                                Адрес: <i></i>
                                                                            </div>
                                                                            {props.req.address}
                                                                        </div>
                                                                    </div>

                                                                    <h4 style={{
                                                                        fontWeight: "bold",
                                                                        marginTop: "10px"
                                                                    }}>Рекомендатель:</h4>

                                                                    <div>
                                                                        <b>{props.req.recommender}</b>

                                                                    </div>


                                                                </div>
                                                                <div style={{
                                                                    width: "70%",
                                                                    height: "100%",
                                                                    backgroundColor: "#ffffff",
                                                                    paddingTop: "50px",
                                                                    paddingLeft: "10px",
                                                                    fontStyle: "italic"
                                                                }}>
                                                                    <div style={{
                                                                        width: "100%",
                                                                        display: "flex",
                                                                        justifyContent: "flex-start",
                                                                        alignItems: "flex-end",
                                                                        flexDirection: "column",
                                                                        borderBottom: "3px #e1d1d1 solid"
                                                                    }}>
                                                                        <h1>{props.req.fio}</h1>
                                                                        <h3>{props.req.sp}</h3>
                                                                        <h3>{props.req.bDay} {ageToStr(props.req.bDay)}</h3>

                                                                    </div>


                                                                    <div style={{
                                                                        display: "flex",
                                                                        flexDirection: "column"
                                                                    }} className="about">
                                                                        {worker ?
                                                                            <div style={{
                                                                                display: "flex",
                                                                                justifyContent: "end",
                                                                                background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(43,255,89,0) 61%, rgba(43,255,89,1) 80%, rgba(43,255,89,0) 100%)"
                                                                            }}>Бывший сотрудник ОАО "Белаз" </div>
                                                                            :
                                                                            <div style={{
                                                                                display: "flex",
                                                                                justifyContent: "end",
                                                                                background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,43,51,0) 61%, rgba(255,3,3,1) 80%, rgba(255,0,0,0) 100%)"
                                                                            }}>Ранее не работал в ОАО "Белаз"</div>}
                                                                        <div>
                                                                            <ul style={{
                                                                                display: "flex",
                                                                                justifyContent: "center",
                                                                                fontWeight: "400",
                                                                                color: "#007bff",
                                                                                backgroundColor: "transparent",
                                                                                listStyle: "none"
                                                                            }} className="btn-link">
                                                                                <li style={{
                                                                                    cursor: "pointer",
                                                                                    boxShadow: "5px 5px 5px grey",
                                                                                    float: "left",
                                                                                    marginTop: "15px",
                                                                                    padding: "5px 20px",
                                                                                    borderRadius: "15px",
                                                                                    border: "1px solid #888",
                                                                                    marginRight: "10px",
                                                                                    marginBottom: "10px",
                                                                                    color: "#888"
                                                                                }}>
                                                                                    <i className="fas fa-paper-plane"></i> Человек
                                                                                    в соцсетях
                                                                                </li>


                                                                                <li style={{
                                                                                    boxShadow: "5px 5px 5px grey",
                                                                                    cursor: "pointer",
                                                                                    float: "left",
                                                                                    marginTop: "15px",
                                                                                    padding: "5px 20px",
                                                                                    borderRadius: "15px",
                                                                                    border: "1px solid #888",
                                                                                    marginRight: "10px",
                                                                                    marginBottom: "10px",
                                                                                    color: "#888"
                                                                                }}>
                                                                                    <i className="fas fa-cloud-download-alt"></i> Скачать
                                                                                    резюме
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div style={{
                                                                            borderBottom: "1px solid #c3c2c2",
                                                                            borderTop: "1px solid #c3c2c2"
                                                                        }}>
                                                                            <h2 style={{
                                                                                left: "0",
                                                                                top: "0",
                                                                                display: "flex",
                                                                                justifyContent: "center"
                                                                            }}>Другие профессии</h2>
                                                                            <div style={{
                                                                                display: "flex",
                                                                                flexDirection: "column"
                                                                            }}>
                                                                                <h3><span style={{fontWeight: "bold"}}>Основная специальность:</span>
                                                                                    <span>{props.req.sp}</span></h3>

                                                                                <div><i style={{fontWeight: "bold"}}>Специальность
                                                                                    1: </i><i>{props.req.heldPosition1}</i>
                                                                                </div>
                                                                                <div><i style={{fontWeight: "bold"}}>Специальность
                                                                                    2: </i><i>{props.req.heldPosition2}</i>
                                                                                </div>
                                                                                <div><i style={{fontWeight: "bold"}}>Специальность
                                                                                    3: </i><i>{props.req.heldPosition3}</i>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        <Test/>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>


                                            );

                                        }

                                        function clickHand(e) {
                                            let values = []
                                            let attr = e.target.getAttribute('appId')
                                            console.log(e.target.getAttribute('appId'))


                                            rows.forEach(function (values, item) {
                                                (item.id === attr) && values.push(item.value);

                                            });

                                            return values;
                                            console.log(values)
                                            // Object.keys(rows).forEach(key => {
                                            //      console.log(rows[key])
                                            // })

                                        }

                                        return (


                                            <TableRow

                                                id={index} isOpen={false}
                                                fio={row.surname + ' ' + row.name + ' ' + row.middlename}
                                                surname={row.surname}
                                                name={row.name}
                                                photo={row.photo}
                                                sp={row.speciality}
                                                bDay={getAge(row.bday)}
                                                heldPosition1={row.heldPosition1}
                                                heldPosition2={row.heldPosition2}
                                                heldPosition3={row.heldPosition3}
                                                education={row.education}
                                                tel={row.telNumber}
                                                email={row.email}
                                                address={row.address}
                                                recommender={row.recommender}
                                                workInBelaz={row.workInBelaz}
                                                hover

                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.tel}
                                                selected={isItemSelected}
                                            >


                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        onClick={(event) => handleClick(event, row.telNumber)}
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                    <OpenCart id={index} isOpen={false}
                                                              fio={row.surname + ' ' + row.name + ' ' + row.middlename}
                                                              surname={row.surname}
                                                              name={row.name}
                                                              photo={row.photo}
                                                              sp={row.speciality}
                                                              bDay={getAge(row.bday)}
                                                              heldPosition1={row.heldPosition1}
                                                              heldPosition2={row.heldPosition2}
                                                              heldPosition3={row.heldPosition3}
                                                              education={row.education}
                                                              tel={row.telNumber}
                                                              email={row.email}
                                                              address={row.address}
                                                              recommender={row.recommender}
                                                              workInBelaz={row.workInBelaz}

                                                    />
                                                </TableCell>
                                                <TableCell
                                                    appId={row.id}
                                                    onClick={clickHand}
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row.surname + ' ' + row.name + ' ' + row.middlename}
                                                    {/*{number.surname + ' ' + number.name + ' ' + number.middlename}*/}
                                                </TableCell>
                                                <TableCell
                                                    onClick={clickHand}
                                                    align="right">{row.speciality}</TableCell>
                                                <TableCell
                                                    onClick={openCartState}
                                                    align="right">{getAge(row.bday)}</TableCell>
                                                <TableCell
                                                    onClick={openCartState}
                                                    align="right">{row.education}</TableCell>
                                                <TableCell
                                                    onClick={openCartState}
                                                    align="right">{row.telNumber}</TableCell>
                                            </TableRow>

                                            // )
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[15, 30, 50]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>

            </Box>
        );
    }

    return <EnhancedTable/>
}

