import React,{ useState } from 'react';
import { IonContent,IonLabel,IonItem,IonHeader,IonPage,IonTitle,IonToolbar,IonInput,IonButton } from '@ionic/react';
import { signupUser } from '../../firebaseConfig';
import { useHistory,Link } from 'react-router-dom';
import Toast from '../../components/Toast';

function Signup () {
    const [ username,setUsername ] = useState( '' );
    const [ password,setPassword ] = useState( '' );
    const [ message,setMessage ] = useState( '' );
    const [ showToast,setShowToast ] = useState( false );

    let history = useHistory();

    async function signup () {
        const res = await signupUser( username,password );
        if ( res.user ) {
            setMessage( 'Account created successfully ' );
            setShowToast( true );
            history.push( '/login' );
        } else {
            let errorMessage = res.code.substring( 5 );
            setMessage( errorMessage );
            setShowToast( true );
        }
    }

    return (

        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>SignUp</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                <IonItem>
                    <IonLabel position="stacked">User Name*</IonLabel>
                    <IonInput value={ username } onIonChange={ e => setUsername( e.target.value ) }></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Password*</IonLabel>
                    <IonInput value={ password } onIonChange={ e => setPassword( e.target.value ) }></IonInput>
                </IonItem>
                <IonButton onClick={ () => signup() }>Signup</IonButton><br />
                <Link to='/login'>Already have an Account</Link>
                <Toast showToast={ showToast } message={ message } setShowToast={ setShowToast } />
            </IonContent>
        </IonPage>
    )
}

export default Signup
