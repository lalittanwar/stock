import React from "react";
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { Link } from "react-router-dom";

export default function Detail({ selectedItem }) {
  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>{selectedItem.item}</IonCardSubtitle>
          <IonCardTitle>{selectedItem.quantity}</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <img src={selectedItem.photo} />
        </IonCardContent>
      </IonCard>
      {/* <h2>Item Name-{selectedItem.item}</h2>
      <h4>Quantity-{selectedItem.quantity}</h4>
      <img src={selectedItem.photo} /> */}

      <Link to="/list">
        <IonButton color="success">Back</IonButton>
      </Link>
    </>
  );
}
