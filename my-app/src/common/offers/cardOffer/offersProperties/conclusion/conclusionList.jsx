import React from "react"
import {store} from "../../../../../reducers";
import ConclusionCard from "./conclusionCard";
import {connect} from "react-redux";



const Item = ({ index, handleRemove }) => (

    store.getState().offers.offer.responsibles.map((index) =>
        <ConclusionCard name={index} id={index} resp={index.fiofull} tabel={index.responsible_tabnum} /> ).reverse()
);


class ConclusionList extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {items:  store.getState().offers.offer.responsibles};
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.update = this.update.bind(this);
        this.update(props);
    }

    componentDidUpdate(props)
    {
        console.log("Upgrade")
    }

    update(props)
    {
       this.state.items = props.responsibles

    }

    handleRemove = index => this.setState({
        items: this.state.items.filter(( item, i ) => i !== index)
    });

    render() {
        return this.state.items.map(( item, i ) => (
            <ConclusionCard name={i} id={item} resp={item.fiofull} tabel={item.responsible_tabnum} open = {item.open} close = {item.close} rating = {item.rating}  mark = {item.mark}
                            handleRemove={ () => this.handleRemove(i) }
            />


        )).reverse();
    }
}

const maping = (state) => {return {offer: state.offers}}
export default connect(maping)(ConclusionList)
