import React from "react";
import s from "../contentHome/contentContainer.module.css";
import { API_URL } from '../../config';
import { NavLink } from "react-router-dom";
import ContentContainer from "../contentHome/contentContainer";
import { style } from "@mui/system";
import { fn } from "moment";
import server from '../../actions/server';

class Administration extends React.Component {
  constructor(props) {
    super(props);
	this.state = {list: []}
  }
  readAdministration(){
	server.send_post_request(`${API_URL}api/offers/readAdministration`)
	.then((res) => {
			this.setState({list:  res.data}
					
			)});
			
  }

  render() {
	
    return (
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
            width:"100%"
        }}
      >
        <ContentContainer />
		
        <div
          style={{

            backgroundColor: "white",
            // backgroundColor: "#ffffffd1",
            position: "absolute",
            top: "0",
            transform: "translate(-0.4vw)",
            width: "65vw",
            height: "100%",
			overflowY:"scroll"
          }}
        >
			<div style={{width:"100%", display:"flex", justifyContent:"center"}}>
          <h2>Руководство</h2>
		  </div>
          <div id={s.list4}>
            <ul style={{ listStyle: "none"}}>
              <li
                style={{ listStyle: "none",display: "flex",justifyContent: "center",}}>
                <a
                  href="#"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    
                    padding: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="http://isi.belaz.minsk.by:5000/files/photos/54857.jpg"
                    style={{ width: "200px" }}
                  ></img>
				  <span>Никифорович Сергей Олегович</span>
                  <span style={{color:"black"}}>ГЕНЕРАЛЬНЫЙ ДИРЕКТОР</span>
                  
                </a>
              </li>
              <li>
                <ul style={{display:"flex", listStyle:"none", alignItems: "baseline", flexWrap:"wrap"}}>
                  <li
                    style={{
                      listStyle: "none",
                      display: "flex",
                      justifyContent: "center",
					  width:"150px",
					  margin:"5px"
                    }}
                  >
                    <a
                      href="#"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        
                        padding: "5px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >

						<div style={{
							backgroundImage: `url("${"http://isi.belaz.minsk.by:5000/files/photos/40415.jpg"}")`, 
							backgroundSize: "cover",
							width: "150px", 
							height:"200px" 
						}}>
						</div>
						<span>Ботвинник Александр Мирославович</span>
                      <span style={{color:"black"}}>Первый заместитель генерального директора по стратегическому развитию, 
						  инновационной деятельности и информационным технологиям</span>
                      
                    </a>
                  </li>
                  <li
                   style={{
					listStyle: "none",
					display: "flex",
					justifyContent: "center",
					width:"150px",
					margin:"5px"
				  }}
                  >
                    <a
                      href="#"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        
                        padding: "5px",
                        justifyContent: "center",
                        alignItems: "center",
						width:"150px"
                      }}
                    >
						<div style={{
							backgroundImage: `url("${"http://isi.belaz.minsk.by:5000/files/photos/13744.jpg"}")`, 
							width: "150px", 
							height:"200px" 
						}}>

						</div>

						<span>Лесин Сергей Иванович</span>
                      <span style={{color:"black"}}>Заместитель генерального директора по технической политике - главный инженер</span>
                      
                    </a>
                  </li>
                  <li
                    style={{
                      listStyle: "none",
                      display: "flex",
                      justifyContent: "center",
					  margin:"5px"
                    }}
                  >
                    <a
                      href="#"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "5px",
                        justifyContent: "center",
                        alignItems: "center",
						width:"150px"
                      }}
                    >
						<div style={{
							backgroundImage: `url("${"http://isi.belaz.minsk.by:5000/files/photos/42541.jpg"}")`, 
							backgroundSize: "cover",
							width: "150px", 
							height:"200px" 
						}}>
						</div>
						<span>Васько Леонид Михайлович</span>
                      <span style={{color:"black"}}>Заместитель генерального директора по коммерческому импорту и материальному обеспечению</span>
                      
                    </a>
                  </li>
				  <li
                    style={{
                      listStyle: "none",
                      display: "flex",
                      justifyContent: "center",
					  margin:"5px"
                    }}
                  >
                    <a
                      href="#"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "5px",
                        justifyContent: "center",
                        alignItems: "center",
						width:"150px"
                      }}
                    >
						<div style={{
							backgroundImage: `url("${"http://isi.belaz.minsk.by:5000/files/photos/14747.jpg"}")`, 
							backgroundSize: "cover",
							width: "150px", 
							height:"200px" 
						}}>
						</div>
						<span>Шостак Василий Григорьевич</span>
                      <span style={{color:"black"}}>Заместитель генерального директора по маркетинговой и экспортной политике - директор маркетинг-центра</span>
                      
                    </a>
                  </li>

				  <li
                    style={{
                      listStyle: "none",
                      display: "flex",
                      justifyContent: "center",
					  margin:"5px"
                    }}
                  >
                    <a
                      href="#"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "5px",
                        justifyContent: "center",
                        alignItems: "center",
						width:"150px"
                      }}
                    >
						<div style={{
							backgroundImage: `url("${"http://isi.belaz.minsk.by:5000/files/photos/14242.jpg"}")`, 
							backgroundSize: "cover",
							width: "150px", 
							height:"200px" 
						}}>
						</div>
						<span>Морозов Юрий Александрович</span>
                      <span style={{color:"black"}}>Заместитель генерального директора по организации производства</span>
                      
                    </a>
                  </li>

				  <li
                    style={{
                      listStyle: "none",
                      display: "flex",
                      justifyContent: "center",
					  margin:"5px"
                    }}
                  >
                    <a
                      href="#"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "5px",
                        justifyContent: "center",
                        alignItems: "center",
						width:"150px"
                      }}
                    >
						<div style={{
							backgroundImage: `url("${"http://isi.belaz.minsk.by:5000/files/photos/42226.jpg"}")`, 
							backgroundSize: "cover",
							width: "150px", 
							height:"200px" 
						}}>
						</div>
						<span>Коротун Анатолий Васильевич</span>
                      <span style={{color:"black"}}>Заместитель генерального директора по капитальному строительству и ремонту</span>
                      
                    </a>
                  </li>

				  <li
                    style={{
                      listStyle: "none",
                      display: "flex",
                      justifyContent: "center",
					  margin:"5px"
                    }}
                  >
                    <a
                      href="#"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "5px",
                        justifyContent: "center",
                        alignItems: "center",
						width:"150px"
                      }}
                    >
						<div style={{
							backgroundImage: `url("${"http://isi.belaz.minsk.by:5000/files/photos/11326.jpg"}")`, 
							backgroundSize: "cover",
							width: "150px", 
							height:"200px" 
						}}>
						</div>
						<span>Батюк Александр Антонович</span>
                      <span style={{color:"black"}}>Заместитель генерального директора по обеспечению социальной политики</span>
                    </a>
                  </li>
				  <li
                    style={{
                      listStyle: "none",
                      display: "flex",
                      justifyContent: "center",
					  margin:"5px"
                    }}
                  >
                    <a
                      href="#"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "5px",
                        justifyContent: "center",
                        alignItems: "center",
						width:"150px"
                      }}
                    >
						<div style={{
							backgroundImage: `url("${"http://isi.belaz.minsk.by:5000/files/photos/54978.jpg"}")`, 
							backgroundSize: "cover",
							width: "150px", 
							height:"200px" 
						}}>
						</div>
						<span>Минич Павел Петрович</span>
                      <span style={{color:"black"}}>Заместитель генерального директора по организации труда, кадровой политике и идеологии</span>
                    </a>
                  </li>
				  <li
                    style={{
                      listStyle: "none",
                      display: "flex",
                      justifyContent: "center",
					  margin:"5px"
                    }}
                  >
                    <a
                      href="#"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "5px",
                        justifyContent: "center",
                        alignItems: "center",
						width:"150px"
                      }}
                    >
						<div style={{
							backgroundImage: `url("${"http://isi.belaz.minsk.by:5000/files/photos/47999.jpg"}")`, 
							backgroundSize: "cover",
							width: "150px", 
							height:"200px" 
						}}>
						</div>
						<span>Рыльцов Константин Витальевич</span>
                      <span style={{color:"black"}}>Заместитель генерального директора по экономике и финансам</span>
                    </a>
                  </li>
				  <li
                    style={{
                      listStyle: "none",
                      display: "flex",
                      justifyContent: "center",
					  margin:"5px"
                    }}
                  >
                    <a
                      href="#"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "5px",
                        justifyContent: "center",
                        alignItems: "center",
						width:"150px"
                      }}
                    >
						<div style={{
							backgroundImage: `url("${"http://isi.belaz.minsk.by:5000/files/photos/56235.jpg"}")`, 
							backgroundSize: "cover",
							width: "150px", 
							height:"200px" 
						}}>
						</div>
						<span>Былицкий Виталий Валерьевич</span>
                      <span style={{color:"black"}}>Заместитель генерального директора по управлению системой качества</span>
                    </a>
                  </li>
				  <li
                    style={{
                      listStyle: "none",
                      display: "flex",
                      justifyContent: "center",
					  margin:"5px"
                    }}
                  >
                    <a
                      href="#"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "5px",
                        justifyContent: "center",
                        alignItems: "center",
						width:"150px"
                      }}
                    >
						<div style={{
							backgroundImage: `url("${"http://isi.belaz.minsk.by:5000/files/photos/36189.jpg"}")`, 
							backgroundSize: "cover",
							width: "150px", 
							height:"200px" 
						}}>
						</div>
						<span>Степук Олег Георгиевич</span>
                      <span style={{color:"black"}}>Генеральный конструктор – начальник научно-технического центра им.А.Н.Егорова</span>
                    </a>
                  </li>
				  <li
                    style={{
                      listStyle: "none",
                      display: "flex",
                      justifyContent: "center",
					  margin:"5px"
                    }}
                  >
                    <a
                      href="#"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "5px",
                        justifyContent: "center",
                        alignItems: "center",
						width:"150px"
                      }}
                    >
						<div style={{
							backgroundImage: `url("${"http://isi.belaz.minsk.by:5000/files/photos/34605.jpg"}")`, 
							backgroundSize: "cover",
							width: "150px", 
							height:"200px" 
						}}>
						</div>
						<span>Шкуратенко Виктор Иванович</span>
                      <span style={{color:"black"}}>Помощник генерального директора по управлению субъектами собственности</span>
                    </a>
                  </li>
				  <li
                    style={{
                      listStyle: "none",
                      display: "flex",
                      justifyContent: "center",
					  margin:"5px"
                    }}
                  >
                    <a
                      href="#"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "5px",
                        justifyContent: "center",
                        alignItems: "center",
						width:"150px"
                      }}
                    >
						<div style={{
							backgroundImage: `url("${"http://isi.belaz.minsk.by:5000/files/photos/33171.jpg"}")`, 
							backgroundSize: "cover",
							width: "150px", 
							height:"200px" 
						}}>
						</div>
						<span>Рудый Виктор Викторович</span>
                      <span style={{color:"black"}}>Первый заместитель главного инженера – главный технолог</span>
                    </a>
                  </li>
				  <li
                    style={{
                      listStyle: "none",
                      display: "flex",
                      justifyContent: "center",
					  margin:"5px"
                    }}
                  >
                    <a
                      href="#"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "5px",
                        justifyContent: "center",
                        alignItems: "center",
						width:"150px"
                      }}
                    >
						<div style={{
							backgroundImage: `url("${"http://isi.belaz.minsk.by:5000/files/photos/21834.jpg"}")`, 
							backgroundSize: "cover",
							width: "150px", 
							height:"200px" 
						}}>
						</div>
						<span>Семашко Владимир Михайлович</span>
                      <span style={{color:"black"}}>Помощник генерального директора по сельско - хозяйственному производству</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Administration;
