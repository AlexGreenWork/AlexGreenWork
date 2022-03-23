import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import pdfFile from "./../../../52179.pdf";



const Transition = React.forwardRef(function Transition(props, ref) {
    console.log(props)
    return <Slide direction="up" ref={ref} {...props} />;
});



const CardOfferUpload = () => {



        const [open, setOpen] = React.useState(false);

        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };


    return (

        <Card sx={{
            minWidth: 60,
            position: 'relative',
            width: 140,
            textAlign: 'center',
            padding: '3',
            ':hover': {backgroundColor: 'rgba(233,237,242,.3)'}
        }}

        >

            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="80">
                <g>
                    <title>Layer 1</title>
                    <line transform="rotate(-0.127169 0.359685 39.8914)" stroke="#000" fill="none" x1="0.4804"
                          y1="0.46905" x2="0.23897" y2="79.31369" id="svg_1" strokelinejoin="undefined"
                          strokelinecap="undefined"/>
                    <line transform="rotate(0.547855 29.5276 79.5283)" stroke="#000" fill="none" x1="-0.37434"
                          y1="79.8803" x2="59.42959" y2="79.17636" id="svg_2" strokelinejoin="undefined"
                          strokelinecap="undefined"/>
                    <line stroke="#000" fill="none" x1="60.18209" y1="80.55349" x2="60.60413" y2="19.00371" id="svg_3"
                          strokelinejoin="undefined" strokelinecap="undefined"/>
                    <line fill="none" x1="-0.10572" y1="0.12276" x2="44.16283" y2="0.36402" id="svg_4"
                          strokelinejoin="undefined" strokelinecap="undefined" stroke="#000"/>
                    <line stroke="#000" fill="none" x1="59.10101" y1="19.43253" x2="44.35038" y2="0.32736" id="svg_5"
                          strokelinejoin="undefined" strokelinecap="undefined"/>
                    <line fill="none" x1="44.11765" y1="-0.0648" x2="44.31373" y2="19.71782" id="svg_6"
                          strokelinejoin="undefined" strokelinecap="undefined" stroke="#000"/>
                    <line stroke="#000" fill="none" x1="59.16269" y1="19.21569" x2="44.11765" y2="19.21569" id="svg_7"
                          strokelinejoin="undefined" strokelinecap="undefined"/>
                    <line fill="none" stroke="#000" x1="-57.05882" y1="17.84314" x2="-56.86275" y2="17.64706" id="svg_9"
                          strokelinejoin="undefined" strokelinecap="undefined"/>
                    <line strokelinecap="undefined" strokelinejoin="undefined" id="svg_15" y2="79.09889" x2="58.82878"
                          y1="19.27917" x1="59.18914" stroke="#000" fill="none"/>
                    <text xmlspace="preserve" textanchor="start" fontfamily="Noto Sans JP" fontsize="24" strokewidth="0"
                          id="svg_16" y="75.85565" x="9.09914" stroke="#000" fill="#000000">.file
                    </text>
                    <line id="svg_17" y2="51.89173" x2="59.18914" y1="52.07191" x1="0.4505" stroke="#000" fill="none"/>
                    <line id="svg_18" y2="42.3422" x2="45.31529" y1="42.3422" x1="10.54058" stroke="#000" fill="none"/>
                    <line id="svg_19" y2="34.2341" x2="45.67565" y1="33.69356" x1="10.00004" stroke="#000" fill="none"/>
                    <line id="svg_20" y2="25.04493" x2="45.85583" y1="24.50439" x1="9.81986" stroke="#000" fill="none"/>
                    <line id="svg_21" y2="15.85576" x2="40.27025" y1="15.85576" x1="10.18022" stroke="#000"
                          fill="none"/>
                </g>

            </svg>
            <CardContent>

                <Typography variant="h5" component="div" sx={{fontSize: '.7vw'}}>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Протокол заседания комиссии
                    </Button>
                    <Dialog
                        fullScreen
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Transition}
                    >
                        <AppBar sx={{ position: 'relative' }}>
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={handleClose}
                                    aria-label="close"
                                >
                                    <CloseIcon />
                                </IconButton>
                                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                    Протокол заседания комиссии
                                </Typography>
                                <Button autoFocus color="inherit" >
                                    сохранить
                                </Button>
                            </Toolbar>
                        </AppBar>
                        <div className="headerProfile-menu-list" onClick={() => window.open(pdfFile)}><i className="mdi mdi-help-circle"></i> Протокол</div>
                    </Dialog>

                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">

                </Typography>

            </CardContent>


        </Card>
    );
}
export default CardOfferUpload;