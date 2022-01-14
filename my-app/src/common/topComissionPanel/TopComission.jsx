import {Budget} from "../../components/dashboard/budget";
import {LatestOrders} from "../../components/dashboard/latest-orders";
import {Sales} from "../../components/dashboard/sales";



const TopComission = () => {
    return(<div style={{
        gridColumn: "2/6",
            gridRow: "2/6",
            display: "flex",
            flexDirection:"column",
            height: "fit-content",
            overflowY:"scroll"
    }}>
         <Budget />

        <LatestOrders/>
    </div>

    )
}
export default TopComission