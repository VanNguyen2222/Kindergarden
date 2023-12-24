import { signOut } from 'firebase/auth';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import './UserInfo.scss';
import  IMG  from "../../constants/ImgUrl";
function UserInfo(props) {
    const { photoURL, displayName } = props
    const nagivate = useNavigate()

    const getName = (str) => {
        var arr = str.split(" ");
        return arr[Object.keys(arr).length - 1]
    }
    const handleLogOut = () => {
        signOut(auth).then(() => {
            nagivate('/')
        })
    }
    return (
        <>
            <div className='info-wrap'>
                <img className='info-img' src={photoURL?photoURL:IMG.ava} alt={displayName} />
                <span className='info-name'>{displayName ? getName(displayName) : ''}</span>
                <div className={`info-sub`}>
                    <ul>
                        <li>
                            <Link to='/profile' className='sub-item'>
                                Information manage
                            </Link>
                        </li>
                        <li>
                            <Link to='/my-classes' className='sub-item'>
                                My Classes
                            </Link>
                        </li>
                        <li>
                            <div className='sub-item' onClick={handleLogOut}>
                                Log out
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default UserInfo;