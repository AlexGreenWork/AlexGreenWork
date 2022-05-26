


export function ToolTip(x, y, mouse, data, idElem, idContainer){
   
    let block = document.createElement("div")
 
    block.className = "tool-tip"
    block.style.position = "fixed" ;
    block.style.top = `${0}px`;
    block.style.left = `${0}px`;
    block.style.zIndex = 500;
    
   
    if(!document.querySelector('.tool-tip')){
        var canvas = document.getElementById(idElem);
        document.querySelector('#'+idContainer).appendChild(block)
       
    } else {
        var canvas = document.getElementById(idElem);
        const {left, top, height} = canvas.getBoundingClientRect()
      if(mouse !== undefined){
        document.querySelector('.tool-tip').style.left = `${x+mouse.padding_mouse_left}px`;
        document.querySelector('.tool-tip').style.top = `${y+mouse.padding_mouse_top}px`;
      }
        
        // console.log(y, top, y-top,  document.querySelector('.tool-tip').style.top)   
    }
   
}

export function InputDataTool(idElem, x, y, nameData, color, elemData, x_type, property){
   
    let block = document.createElement('div')
    block.className = elemData
   
    const elem = document.querySelector('.' + elemData)
      
   
    const container = document.querySelector('.tool-tip')
  
    if(container){
      
        if(!elem){
            
            try{
                if(container){
                   
                    container.appendChild(block)
                    (x!== 0) ? elem.innerHTML = x : elem.innerHTML = ''
                }
            }catch(e){
                // console.log(e)
            }
           
            
        
        } else {
            
            let xName = x
           
            if(x_type === "year"){
                switch(x){
                    case 1: xName =  "Январь"; 
                    break;
                    case 2: xName =  "Февраль"; 
                    break;
                    case 3: xName =  "Март"; 
                    break;
                    case 4: xName =  "Апрель"; 
                    break;
                    case 5: xName =  "Май"; 
                    break;
                    case 6: xName =  "Июнь"; 
                    break;
                    case 7: xName =  "Июль"; 
                    break;
                    case 8: xName =  "Август"; 
                    break;
                    case 9: xName =  "Сентябрь"; 
                    break;
                    case 10: xName =  "Октябрь"; 
                    break;
                    case 11: xName =  "Ноябрь"; 
                    break;
                    case 12: xName =  "Декабрь"; 
                    break;
                    default: xName = null;
                    break;
            }
           
             }

           
            elem.innerHTML = 
            '<div class = "content-tooltip" >' +
                //  nameData + 
                '<div style = " display: flex; flex-direction: row; align-items: center;">'+
                 `<div style="width : 25px; height: 25px; background-color:${color}; border-radius: 5px; "></div>`+

                     ` <div style = " display: flex; flex-direction: column; margin-left: 10px">  
                        <div> ${xName} </div>
                        <div >${property.toolTipText.type === "amount" ? 'Количество' : nameData} ${y} </div>                          
                      </div>` + 
                        
           '</div>' + '</div>'
            
        }
        // document.querySelector('.tool-tip').innerHTML = x
    }else{
        console.log(false)
    }
}

export function DestroyTool(){
  
    // console.log(document.querySelector('.tool-tip'))
    if(document.querySelector('.tool-tip') !== null){
       
         document.querySelector('.tool-tip').remove()
        // console.log(123)
    } else {

    }
     
}