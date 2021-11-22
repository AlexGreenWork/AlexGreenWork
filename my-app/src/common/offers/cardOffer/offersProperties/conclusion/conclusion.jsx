import React from "react";
import {NavLink} from "react-router-dom";
import s from "./conclusion.module.css"
import ViewFileDoc from "../../../../../Pics/svg/ViewFiles/docFileSvg";


const ConclusionOffer = () => {

    return (
        <div className={s.cardOfferContainer}>



            <div className={s.header}>
                <div className={s.date}>
                    <div>Дата:</div>
                    <div> 12/09/21</div>
                </div>
                <div className={s.nameWorkGroup}>
                    <div>Подразделение:</div>
                    <div> Рабочая группа</div>
                </div>

                <div className={s.ExecutWorker}>
                    <div>Ответственный сотрудник:</div>
                    <div> Петров Петр Петрович</div>
                </div>
                <div className={s.filesConclusion}>
                    <div>Файлы заключения подразделения:</div>
                    <div className={s.conclusionFilesArea}> files area:
                        <div>
                           <ViewFileDoc/>
                            <div>Заключение</div>
                        </div>
                        <div>
                            <ViewFileDoc/>
                            <div>Заключение</div>
                        </div>
                        <div className={s.fileUpload}>
                            <input type="file" name="filename"/>
                        </div>
                    </div>
                </div>
                <div className={s.shortAnotation}>
                    <div>Краткая аннотация заключения подразделения:</div>
                    <div className={s.conclusionTextArea}> text of conclusion area: Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit. Autem dolore excepturi hic nemo nihil quae reiciendis sunt
                        voluptatum. A autem et iusto, nam numquam officia optio provident quas quibusdam voluptatem.
                    </div>
                </div>
            </div>


            <div className={s.header}>
                <div className={s.date}>
                    <div>Дата:</div>
                    <div> 12/09/21</div>
                </div>
                <div className={s.nameWorkGroup}>
                    <div>Подразделение:</div>
                    <div> УГК</div>
                </div>

                <div className={s.ExecutWorker}>
                    <div>Ответственный сотрудник:</div>
                    <div> Василий Петрович Василевский</div>
                </div>
                <div className={s.filesConclusion}>
                    <div>Файлы заключения подразделения:</div>
                    <div className={s.conclusionFilesArea}> files area:
                        <div>
                            <ViewFileDoc/>
                            <div>Заключение</div>
                        </div>
                        <div className={s.fileUpload}>
                            <input  type="file" name="filename"/>
                        </div>
                    </div>
                </div>
                <div className={s.shortAnotation}>
                    <div>Краткая аннотация заключения подразделения:</div>
                    <div className={s.conclusionTextArea}> text of conclusion area: Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit. Doloremque eaque earum eum iusto minima numquam optio, pariatur
                        possimus provident quae quas rerum sint soluta sunt suscipit tempore ullam velit? Tenetur. Lorem
                        ipsum dolor sit amet, consectetur adipisicing elit. Aliquid atque blanditiis delectus
                        dignissimos dolore eius, enim error eum, ex fuga magnam minima obcaecati omnis pariatur quas quo
                        sapiente veritatis voluptatibus?
                    </div>
                </div>
            </div>
        </div>

    )
}
export default ConclusionOffer;