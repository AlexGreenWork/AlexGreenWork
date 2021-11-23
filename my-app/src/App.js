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





function App(props) {
    const [change, setCounter] = useState(0)
    const contextFunction = (n) => setCounter(n)

    const value = {
        change,
        contextFunction,
    };

    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
    }, [])

    return (
        <Context.Provider value = {value}>
        <BrowserRouter>
            <div className={'container1'} id="container1">
                <Header/>


                <div className='app-wrapper-content' id="wrapperContent">
                    {!isAuth ?
                        <Switch>
                            <Route exact path='/' component={ContentContainer} />
                            <Route path='/workerVariable' component={WorkerVariable}/>
                            <Route path='/sendOfferWorker' component={OffersForm}/>
                            <Route path='/sendOfferFree' component={OffersFormFree}/>
                            <Route path="/registration" component={Registration}/>

                            <Redirect to='/authorization'/>
                        </Switch>
                        :
                        <Switch>
                            <Route path='/sendOfferWorker' component={OffersForm}/>
                            <Route path='/sendOfferFree' component={OffersFormFree}/>
                            <Redirect to="/"/>

                        </Switch>
                    }
                    <Route path="/authorization" component={AuthorizationWorker}/>
                    {/*<Route path="/adminPanel" component={AdminPanel}/>*/}
                    <Route exact path='/' component={ContentContainer}/>
                    <Route path='/workerVariable' component={WorkerVariable}/>
                    <Route path='/personalCabinet/myOffers' component={MyOffers} />
                    <Route path='/personalCabinet/findWorkers' component={FindWorkers}/>
                    <Route path='/personalCabinet/tasks' component={Tasks}/>
                    <Route path='/profile' component={Profile}/>
                    <Route path='/personalCabinet' component={PersonalCabinet}/>
                    <Route exact path="/personalCabinet/disk" component={Disk}/>
                    <Route path='/cardOffer' component={CardOffer} />
                    <Route path='/cardOffer/infoAboutAuthor' component={InfoAboutAuthor}/>
                    <Route path='/cardOffer/conclusion' component={ConclusionOffer}/>
                    <Route path='/personalCabinet' component={PersonalCabinet}/>
                    <Route path='/personalCabinet/messages' component={Messages}/>
                    <Route path='/personalCabinet/offers' component={Offers}/>

                </div>

                <Navfooter/>


            </div>
        </BrowserRouter>
        </Context.Provider>
    );
}


export default App;
