import { color } from "@mui/system";
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
            
    }}> 
        <div style={{
                    display: "flex",
                     flexDirection:"column",
                    height: "fit-content",
                     overflowY:"scroll"
    }}>
            <div style={{display:"flex"}}> 
                 <Budget style={{width:"33.3%"}} name="Всего предложений" amount="65"/>
                 <Budget style={{width:"33.3%"}} name="За год" amount="65" />
                 <Budget style={{width:"33.3%"}} name="Предложений за месяц" amount="7"/>
            </div>
             <div style={{display:"flex"}}> 
                 <Budget style={{width:"33.3%", backgroundColor:"#ffffab"}} name="В обработке" amount="64"/>
                 <Budget style={{width:"33.3%", backgroundColor:"#b0ffb0"}} name="Обработано" amount="1" />
                 <Budget style={{width:"33.3%", backgroundColor:"#ffbaba"}} name="Отклонено" amount="0"/>
            </div>
            <LatestOrders style={{marginTop:"3px"}}/>
        </div>
    </div>

    )
}
export default TopComission