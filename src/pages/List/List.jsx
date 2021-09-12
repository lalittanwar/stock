import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonPopover,
  IonToolbar,
  IonChip,
  IonLabel,
  IonIcon,
  IonFabButton,
} from "@ionic/react";
import { person, add, pencil, trash, eye } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import firebase from "../../firebaseConfig";
import "./List.css";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Detail from "../Detail/Detail";

export default function List(props) {
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [items, setItems] = useState([]);

  const setAdmin = () => {
    if (username === "naresh@mail.com") {
      setIsAdmin(true);
    }
  };

  const getItems = () => {
    const todoRef = firebase.database().ref("items");
    todoRef.on("value", (snapshot) => {
      const todos = snapshot.val();
      const todoList = [];
      for (let i in todos) {
        todoList.push({ id: i, ...todos[i] });
      }
      setItems(todoList);
    });
  };

  const addItem = () => {
    setShowModal(true);
    setIsUpdated(false);
  };

  useEffect(() => {
    setUsername(localStorage.getItem("loggedIn"));
    getItems();
  }, []);

  useEffect(() => {
    setAdmin();
  }, [username]);

  const deleteItem = (id) => {
    const todoRef = firebase.database().ref("items").child(id);
    todoRef.remove();
  };

  const editItem = (id) => {
    setShowModal(true);
    setId(id);
    setIsUpdated(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const logOut = () => {
    setShowPopover(false);
    localStorage.removeItem("loggedIn");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonChip
          className="profile-chip"
          color="secondary"
          onClick={() => setShowPopover(true)}
        >
          <IonLabel>
            {" "}
            {username.toLocaleUpperCase().substring(0, username.length - 9)}
            <IonIcon slot="end" icon={person} />
          </IonLabel>
          <IonPopover
            isOpen={showPopover}
            cssClass="popovers"
            onDidDismiss={(e) => setShowPopover(false)}
          >
            <Link to="/landing">
              <IonChip color="light" onClick={logOut}>
                {" "}
                <IonLabel> LogOut</IonLabel>
              </IonChip>
            </Link>
          </IonPopover>
        </IonChip>
        <Link to="/home">
          <IonChip className="profile-chip" color="danger">
            <IonLabel>Back</IonLabel>
          </IonChip>
        </Link>
        <Table striped hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Item</th>
              <th>Quantity</th>
            </tr>
          </thead>
          {items.map((item, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>{index}</td>
                  <td>{item.item}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <Link to="/detail">
                      <IonIcon
                        color="primary"
                        icon={eye}
                        onClick={() => props.viewDetail(item)}
                      />
                    </Link>
                  </td>

                  {isAdmin && (
                    <td>
                      <IonIcon
                        color="tertiary"
                        icon={pencil}
                        onClick={() => editItem(item.id)}
                      />
                    </td>
                  )}
                  {isAdmin && (
                    <td>
                      <IonIcon
                        color="danger"
                        icon={trash}
                        onClick={() => deleteItem(item.id)}
                      />
                    </td>
                  )}
                </tr>
              </tbody>
            );
          })}
        </Table>
        {isAdmin ? (
          <IonFabButton className="fab-button">
            <IonIcon icon={add} onClick={() => addItem()} />
          </IonFabButton>
        ) : null}
        <Modal
          showModal={showModal}
          id={id}
          isUpdated={isUpdated}
          closeModal={closeModal}
          getItems={props.getItems}
        />
      </IonContent>
    </IonPage>
  );
}
