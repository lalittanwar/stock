import { IonToast } from '@ionic/react';
import React from 'react';

function Toast ( props ) {

    const { showToast,setShowToast,message } = props;
    return (
        <div>
            <IonToast
                isOpen={ showToast }
                onDidDismiss={ () => setShowToast( false ) }
                message={ message }
                duration={ 4000 }
            />
        </div>
    )
}

export default Toast
