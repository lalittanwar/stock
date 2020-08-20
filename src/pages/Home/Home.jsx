import {
    IonContent,IonHeader,IonPage,IonTitle,IonPopover,
    IonToolbar,IonChip,IonLabel,IonIcon,IonFabButton
} from '@ionic/react';
import { person,add,pencil,trash } from 'ionicons/icons';
import React,{ Component } from 'react';
import Modal from '../../components/Modal';
import firebase from '../../firebaseConfig';
import './Home.css';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export class Home extends Component {

    constructor( props ) {
        super( props )
        this.state = {
            username: '',
            isAdmin: false,
            showModal: false,
            items: [],
            id: null,
            isUpdated: false,
            showPopover: false
        }
    }

    setAdmin = () => {
        if ( this.state.username === 'naresh@mail.com' ) {
            this.setState( { isAdmin: true } );
        }
    }

    addItem = () => {
        this.setState( { showModal: true } );
        this.setState( { isUpdated: false } );
    }

    componentDidMount () {
        this.setState( { username: localStorage.getItem( 'loggedIn' ) },
            () => {
                this.setAdmin()
            }
        );
        this.getItems();
    }

    getItems = () => {
        const todoRef = firebase.database().ref( 'items' );
        todoRef.on( 'value',( snapshot ) => {
            const todos = snapshot.val();
            const todoList = [];
            for ( let i in todos ) {
                todoList.push( { id: i,...todos[ i ] } )
            }
            this.setState( { items: todoList } )
        } )
    }

    deleteItem = ( id ) => {
        const todoRef = firebase.database().ref( 'items' ).child( id );
        todoRef.remove();
    }

    editItem = ( id ) => {
        this.setState( { showModal: true } );
        this.setState( { id: id } );
        this.setState( { isUpdated: true } );
    }

    closeModal = () => {
        this.setState( { showModal: false } )
    }

    logOut = () => {
        this.setState( { showPopover: false } )
        localStorage.removeItem( 'loggedIn' );
    }

    render () {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>Home</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonChip className="profile-chip" color="secondary" onClick={ () => this.setState( { showPopover: true } ) }>
                        <IonLabel > { this.state.username.toLocaleUpperCase().substring( 0,this.state.username.length - 9 ) }
                            <IonIcon slot="end" icon={ person } /></IonLabel>
                        <IonPopover
                            isOpen={ this.state.showPopover }
                            cssClass='popovers'
                            onDidDismiss={ e => this.setState( { showPopover: false } ) }
                        >
                            <Link to="/landing"><IonChip color="light" onClick={ this.logOut }> <IonLabel > LogOut</IonLabel></IonChip></Link>
                        </IonPopover>
                    </IonChip>
                    <Table striped hover  >
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Item</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        { this.state.items.map( ( item,index ) => {
                            return (
                                <tbody key={ index }>
                                    <tr>
                                        <td>{ index }</td>
                                        <td>{ item.item }</td>
                                        <td>{ item.quantity }</td>
                                        { this.state.isAdmin ? <td><IonIcon color="tertiary" icon={ pencil } onClick={ () => this.editItem( item.id ) } /></td> : null }
                                        { this.state.isAdmin ? <td><IonIcon color="danger" icon={ trash } onClick={ () => this.deleteItem( item.id ) } /></td> : null }
                                    </tr>
                                </tbody> )
                        } ) }
                    </Table>

                    { this.state.isAdmin ? ( <IonFabButton className="fab-button" >
                        <IonIcon icon={ add } onClick={ () => this.addItem() } /></IonFabButton> ) : null }
                    <Modal state={ this.state } closeModal={ this.closeModal } />
                </IonContent>
            </IonPage>
        )
    }
}

export default Home
