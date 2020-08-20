import React,{ useState } from 'react';
import { IonContent,IonLabel,IonItem,IonHeader,IonPage,IonTitle,IonToolbar,IonInput,IonButton,IonRow } from '@ionic/react';
import { loginUser } from '../../firebaseConfig';
import { useHistory,Link } from 'react-router-dom';
import Toast from '../../components/Toast';

function Login () {
    const [ username,setUsername ] = useState( '' );
    const [ password,setPassword ] = useState( '' );
    const [ message,setMessage ] = useState( '' );
    const [ showToast,setShowToast ] = useState( false );

    let history = useHistory();

    async function login () {
        const res = await loginUser( username,password );
        if ( res.user ) {
            setMessage( 'Successfully Logged in' );
            setShowToast( true );
            localStorage.setItem( 'loggedIn',res.user.email );
            history.push( '/home' );
        } else {
            let errorMessage = res.code.substring( 5 );
            setMessage( errorMessage );
            setShowToast( true );
        }
    }

    return (
        <IonPage className="bg-page">
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="bg-page">
                <IonItem>
                    <IonLabel position="floating">User Name</IonLabel>
                    <IonInput value={ username } onIonChange={ e => setUsername( e.target.value ) }></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput type="password" alue={ password } onIonChange={ e => setPassword( e.target.value ) }></IonInput>
                </IonItem><br />
                <IonRow className="login-btn">
                    <IonButton color="danger" onClick={ () => login() }>Login</IonButton>
                    <IonButton color="tertiary" onClick={ () => history.push( '/signup' ) }>Create an Account</IonButton>
                </IonRow>
                <Toast showToast={ showToast } message={ message } setShowToast={ setShowToast } />
            </IonContent>
        </IonPage>
    )
}

export default Login
