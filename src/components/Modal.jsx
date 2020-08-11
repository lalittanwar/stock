import React,{ useState } from 'react';
import { IonHeader,IonTitle,IonToolbar,IonButton,IonModal,IonItem,IonLabel,IonInput,IonGrid,IonCol,IonRow } from '@ionic/react';
import './Modal.css';
import { db } from '../firebaseConfig';

function Modal ( props ) {
    const { showModal } = props;
    const [ items,setItem ] = useState( '' );
    const [ quantitys,setQuantity ] = useState( 0 );


    const addItem = () => {
        db.collection( 'items' ).add( { item: items,quantity: quantitys } )
    }

    return (
        <IonModal isOpen={ showModal } cssClass="modal">
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Add Item</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonItem>
                <IonLabel position="stacked">Item</IonLabel>
                <IonInput value={ items } onIonChange={ e => setItem( e.target.value ) }></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="stacked">Quantity</IonLabel>
                <IonInput value={ quantitys } onIonChange={ e => setQuantity( e.target.value ) }></IonInput>
            </IonItem>
            <IonGrid>
                <IonRow>
                    <IonCol> <IonButton onClick={ () => addItem() } >Add</IonButton></IonCol>
                    <IonCol> <IonButton >Close</IonButton></IonCol>
                </IonRow>
            </IonGrid>
        </IonModal>
    )
}

export default Modal
