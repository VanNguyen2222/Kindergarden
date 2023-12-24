import React, { useContext } from 'react';
import { AuthContext } from '../../components/AuthContext';
import InfoDetail from './components/InfoDetail';

function InfoUserPage(props) {
    const user = useContext(AuthContext)

    return (
        <div className='grid wide' >
            {user && <InfoDetail user={user} />}
        </div>
    );
}

export default InfoUserPage;