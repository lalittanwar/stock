import {
    IonContent,IonHeader,IonPage,IonTitle,IonList,IonItem,IonLabel,
    IonToolbar,IonButton,IonIcon,IonFabButton
} from '@ionic/react';
import { person,add } from 'ionicons/icons';
import React,{ Component } from 'react';
import Modal from '../../components/Modal';
import './Home.css';
import { db } from '../../firebaseConfig';

export class Home extends Component {
    constructor( props ) {
        super( props )
        this.state = {
            username: '',
            showModal: false,
            items: []
        }
    }

    componentDidMount () {
        this.setState( { username: localStorage.getItem( 'loggedIn' ) } );
        this.getItems();
    }

    getItems = () => {
        db.collection( 'items' ).onSnapshot( snapshot => {
            this.setState( { items: snapshot.docs.map( doc => doc.data() ) } )
        } )
    }

    render () {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>Home</IonTitle>
                        <IonButton slot="end" color="light">
                            <IonIcon slot="end" icon={ person } />
                            { this.state.username.substring( 0,this.state.username.length - 9 ) }
                        </IonButton>
                    </IonToolbar>
                </IonHeader>
                <IonContent>

                    { this.state.items.map( ( item,index ) => {
                        return (
                            <IonList key={ index }>
                                <IonItem>
                                    <IonLabel>{ item.item }-{ item.quantity }</IonLabel>
                                </IonItem>
                            </IonList> )
                    } ) }
                    <IonFabButton className="fab-button" >
                        <IonIcon icon={ add } onClick={ () => this.setState( { showModal: true } ) } /></IonFabButton>
                    <Modal showModal={ this.state.showModal } />
                </IonContent>
            </IonPage>
        )
    }
}

export default Home
