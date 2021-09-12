import React, { useState, useEffect } from "react";
import {
  IonHeader,
  IonTitle,
  IonActionSheet,
  IonToolbar,
  IonButton,
  IonModal,
  IonItem,
  IonLabel,
  IonInput,
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/react";
import "./Modal.css";
import firebase from "../firebaseConfig";
import { camera, close, image } from "ionicons/icons";

function Modal(props) {
  const { id, showModal, isUpdated, closeModal } = props;
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [showActionSheet, setShowActionSheet] = useState(false);

  useEffect(() => {
    if (isUpdated) {
      const todoRef = firebase.database().ref("items");
      todoRef.on("value", (snapshot) => {
        const todos = snapshot.val();
        setItem(todos[id].item);
        setQuantity(todos[id].quantity);
      });
    } else {
      setItem(null);
      setQuantity(null);
    }
  }, [id, isUpdated]);

  const addItem = () => {
    const todoRef = firebase.database().ref("items");
    const todo = { item, quantity };
    todoRef.push(todo);
    props.getItems();
    closeModal();
  };

  const updateItem = () => {
    const todoRef = firebase.database().ref("items").child(id);
    const todo = { item, quantity };
    todoRef.update(todo);
    closeModal();
  };

  const openCamera = () => {};

  return (
    <IonModal
      isOpen={showModal}
      showBackdrop={true}
      swipeToClose={true}
      animated={true}
    >
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Add Item</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonItem>
        <IonLabel position="stacked">Item</IonLabel>
        <IonInput
          value={item}
          onIonChange={(e) => setItem(e.target.value)}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Quantity</IonLabel>
        <IonInput
          value={quantity}
          onIonChange={(e) => setQuantity(e.target.value)}
        ></IonInput>
      </IonItem>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonButton color="success" onClick={() => setShowActionSheet(true)}>
              Upload Photo
            </IonButton>
          </IonCol>
          {isUpdated ? (
            <IonCol>
              {" "}
              <IonButton color="secondary" onClick={() => updateItem()}>
                Update
              </IonButton>
            </IonCol>
          ) : (
            <IonCol>
              {" "}
              <IonButton color="tertiary" onClick={() => addItem()}>
                Add
              </IonButton>
            </IonCol>
          )}
          <IonCol>
            {" "}
            <IonButton color="secondary" onClick={() => closeModal()}>
              Close
            </IonButton>
          </IonCol>
        </IonRow>
        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          cssClass="my-custom-class"
          buttons={[
            {
              text: "Camera",
              icon: camera,
              handler: () => {
                openCamera();
              },
            },
            {
              text: "Gallery",
              icon: image,
              handler: () => {
                openCamera();
              },
            },
            {
              text: "Cancel",
              role: "destructive",
              icon: close,
              handler: () => {
                console.log("Delete clicked");
              },
            },
          ]}
        ></IonActionSheet>
      </IonGrid>
    </IonModal>
  );
}

export default Modal;
