import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteAvatar, uploadAvatar} from "../../../actions/user";
import s from "./profile.module.css"
import {API_URL} from "../../../config";
// import avatarLogo from '../../../assets/img/avatar.svg'

// eslint-disable-next-line react-hooks/rules-of-hooks

/////////// Это доработать для удаления авы disabled button

const Profile = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    function changeHandler(e) {

        const file = e.target.files[0]

        document.querySelector('input[type=file]').value = ''

        if ( /\.(jpe?g|png)$/i.test(file.name) === false ) {
            return alert('Выберите картинку формата jpg, jpeg, png')
        }

         if (file.size > 2000000){
            return alert('Выберите картинку меньшего размера')
        }

        dispatch(uploadAvatar(file))
    }

    localStorage.getItem("avatar")
    const avatar = currentUser.avatar  ? `${API_URL + 'files/avatar/' + currentUser.avatar}` : `${API_URL + 'files/photos/' + currentUser.tabelNum + ".jpg"}`
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
                    <button  onClick={() => dispatch(deleteAvatar())}>Удалить аватар</button>
                    <input accept="image/*" onChange={e => changeHandler(e)} type="file"
                           placeholder="Загрузить аватар"/>
                </div>
                <div>

                    <div>Фамилия: {currentUser.surname}</div>
                    <div>Имя: {currentUser.name}</div>
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
