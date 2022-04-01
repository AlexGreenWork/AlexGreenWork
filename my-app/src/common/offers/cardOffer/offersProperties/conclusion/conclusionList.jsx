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
        console.log("wwwwwwwwwwwwwwwwwwwwww", props)
        this.state = {items:  props.responsibles};
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.add = this.add.bind(this)
    }

    componentDidUpdate(props)
    {
        console.log("Upgrade")
        console.log(props.responsibles)
        console.log(this.props.responsibles)
        console.log(this.state.items)

        if(this.props.responsibles !== this.state.items && this.props.responsibles.length !== 0)
        {
            this.setState({items: this.props.responsibles})
        }
    }

    add(e)
    {
        this.props.onChange(e)
    }

    handleRemove(index)
	{
        const newItems = this.state.items.filter(( item, i ) => i !== index);
		this.props.onChange(newItems);
    }

    render() {
        return this.state.items.map(( item, i ) => (
            <ConclusionCard name={i+1} id={item} resp={item.fiofull} tabel={item.responsible_tabnum} open = {item.open} close = {item.close} rating = {item.rating}
                            mark = {item.mark}
                            onAdded = {this.add}
                            handleRemove={ () => this.handleRemove(i) }
            />


        )).reverse();
    }
}

const maping = (state) => {return {offer: state.offers}}
export default connect(maping)(ConclusionList)
