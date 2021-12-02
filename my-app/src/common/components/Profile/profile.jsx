import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteAvatar, uploadAvatar} from "../../../actions/user";
import s from "./profile.module.css"
import {API_URL} from "../../../config";
import avatarLogo from '../../../assets/img/avatar.svg'

const Profile = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    function changeHandler(e) {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }
    localStorage.getItem("avatar")
    const avatar = currentUser.avatar ? `${API_URL + 'files/avatar/' + currentUser.avatar}` : avatarLogo
    return (
        <div className={s.profile}>
            <div>Профиль</div>
            <div className={s.headerProfile}>
                <div className={s.uploadAva}>

                    <div className={s.avatarContainer} style={{
                        backgroundImage: `url("${avatar}")`,
                        backgroundSize: "cover",
                        borderRadius:10
                    }}></div>
                    <button onClick={() => dispatch(deleteAvatar())}>Удалить аватар</button>
                    <input accept="image/*" onChange={e => changeHandler(e)} type="file"
                           placeholder="Загрузить аватар"/>
                </div>
                <div>

                    <div>Фамилия: {currentUser.name}</div>
                    <div>Имя: {currentUser.surname}</div>
                    <div>Отчество:{currentUser.middlename}</div>
                    <div>Табельный номер: {currentUser.tabelNum}</div>
                    <div>Телефон: {currentUser.phoneNumber}</div>
                    <div>Роль: {currentUser.adminOptions}</div>
                </div>
            </div>


        </div>
    );
};

export default Profile;
