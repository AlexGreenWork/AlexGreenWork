import React, {useEffect, useState} from "react";
import Header from "./common/header/header";
import Navfooter from "./common/navFooter/navfooter";
import ContentContainer from "./common/contentHome/contentContainer";
import './App.css';
import {Route, BrowserRouter, Switch, Redirect} from "react-router-dom";
import WorkerVariable from "./common/workerVariable/workerVariable";
import PersonalCabinet from "./common/personalCabinet/personalCabinet";
import Messages from "./common/personalCabinet/messages/messages";
import Offers from "./common/offers/offers";
import CardOffer from "./common/offers/cardOffer/cardOffer";
import AuthorizationWorker from "./common/autorization/authorization";
import InfoAboutAuthor from "./common/offers/cardOffer/offersProperties/InfoAuthor/infoAboutAuthor";
import ConclusionOffer from "./common/offers/cardOffer/offersProperties/conclusion/conclusion";
import Registration from "./common/autorization/registration";
import {auth} from "./actions/user";
import {useDispatch, useSelector} from "react-redux";
import MyOffers from "./common/offers/myOffers";
import Profile from "./common/components/Profile/profile";
import Disk from "./common/components/disk/Disk";
import OffersFormFree from "./common/offers/sendOffer/FormOffersFree";
import OffersForm from "./common/offers/sendOffer/FormOffers";
import Tasks from "./common/personalCabinet/tasks/tasks";
import FindWorkers from "./common/personalCabinet/findWorkers/findWorkers";
import Context from "./common/context/Context";
import MyFiles from "./common/personalCabinet/myFiles/myFiles";
import OffersResponsible from "./common/personalCabinet/responsible/responsible";
import {Budget} from "./common/topComissionPanel/TopComission";
import TopComission from "./common/topComissionPanel/TopComission";
import Administration from "./common/administration/administration";
import Management from "./common/administration/Management";
import Contacts from "./common/contacts/contacts";
import News from "./common/news/news";
import PublicServices from "./common/publicServices/publicServices";
import Excursion from "./common/excursion/excursion";






function App(props) {
    const [change, setChange] = useState(0)
    const [secondCotext, setSecondCotext] = useState(0)
    const contextFunction = (n , f) => {
        setChange(n);
        setSecondCotext(f)};

    const value = {
        change,
        secondCotext,
        contextFunction,

    };

    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
    })

    return (

        <BrowserRouter>
            <Context.Provider value = {value}>
            <div className={'container1'} id="container1">
                <Header/>


                <div className='app-wrapper-content' id="wrapperContent">
                    {!isAuth ?
                        <Switch>
                            <Route exact path='/' component={ContentContainer}/>
                            <Route path='/news' component={News}/>
                            <Route path='/publicServices' component={PublicServices}/>
                            <Route path='/excursion' component={Excursion}/>
                            <Route path='/contacts' component={Contacts}/>
                            <Route path='/management' component={Management}/>
                            <Route path='/workerVariable' component={WorkerVariable}/>
                            <Route path='/sendOfferWorker' component={OffersForm}/>
                            <Route path='/sendOfferFree' component={OffersFormFree}/>
                            <Route path="/registration" component={Registration}/>
                            <Route path="/authorization" component={AuthorizationWorker}/>
                            <Redirect to='/authorization'/>

                        </Switch>
                        :
                        <Switch>
                            <Route path='/sendOfferWorker' component={OffersForm}/>
                            <Route path='/sendOfferFree' component={OffersFormFree}/>

                            <Redirect to="/"/>
                            <Route path="/authorization" component={AuthorizationWorker}/>
                            <Redirect to="/"/>
                            <Route path="/registration" component={Registration}/>
                            <Redirect to='/authorization'/>
                        </Switch>

                    }
                    <Route path='/personalCabinet' component={PersonalCabinet}/>
                    {isAuth ?
                        <Switch>

                            <Route exact path='/' component={ContentContainer}/>
                            <Route path='/news' component={News}/>
                            <Route path='/excursion' component={Excursion}/>

                            <Route path='/workerVariable' component={WorkerVariable}/>
                            <Route path='/administration' component={Administration}/>
                            <Route path='/management' component={Management}/>
                            <Route path='/contacts' component={Contacts}/>
                            <Route path='/publicServices' component={PublicServices}/>

                            <Route path='/personalCabinet/myOffers' component={MyOffers} />
                            <Route path='/personalCabinet/findWorkers' component={FindWorkers}/>
                            <Route path='/personalCabinet/tasks' component={Tasks}/>
                            <Route path='/profile' component={Profile}/>

                            <Route exact path="/personalCabinet/disk" component={Disk}/>
                            <Route path='/cardOffer' component={CardOffer} />
                            <Route path='/cardOffer/infoAboutAuthor' component={InfoAboutAuthor}/>
                            <Route path='/cardOffer/conclusion' component={ConclusionOffer}/>

                            <Route path='/personalCabinet/messages' component={Messages}/>
                            <Route path='/personalCabinet/offers' component={Offers}/>
                            <Route path='/personalCabinet/myFiles' component={MyFiles}/>
                            <Route path='/personalCabinet/offersResponsible' component={OffersResponsible}/>
                            <Route path='/personalCabinet/adminPanelComission' component={TopComission}/>


                        </Switch>
                        :
                        <Switch>


                            {/*<Route path="/registration" component={Registration}/>*/}
                            {/*<Redirect to='/authorization'/>*/}
                        </Switch>

                    }


                    {/*<Route path='/personalCabinet/messages' component={Messages}/>*/}
                    {/*<Route path='/personalCabinet/offers' component={Offers}/>*/}
                    {/*<Route path='/personalCabinet/myFiles' component={MyFiles}/>*/}
                    {/*<Route path='/personalCabinet/offersResponsible' component={OffersResponsible}/>*/}
                    {/*<Route path='/personalCabinet/adminPanelComission' component={TopComission}/>*/}
                    {/*<Route path='/personalCabinet' component={PersonalCabinet}/>*/}

                    {/*<Route path="/adminPanel" component={AdminPanel}/>*/}



                    

                </div>

                <Navfooter/>


            </div>
            </Context.Provider>
        </BrowserRouter>

    );
}


export default App;
