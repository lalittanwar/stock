import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Landing from "./pages/Landing/Landing";
import Detail from "./pages/Detail/Detail";
import firebase from "./firebaseConfig";
import List from "./pages/List/List";
import { Switch } from "react-router-dom";
import Home from "./pages/Home/Home";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    if (localStorage.getItem("loggedIn")) {
      setLoggedIn(true);
    }
    getItems();
  }, []);

  //   useEffect(() => {
  // setItems()
  //   }, [items]);

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

  const viewDetail = (item) => {
    console.log(item);
    setSelectedItem(item);
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            <Route path="/landing" component={Landing} exact={true} />
            <Route
              path="/list"
              component={() => (
                <List
                  items={items}
                  getItems={getItems}
                  viewDetail={viewDetail}
                />
              )}
              exact={true}
            />
            <Route
              path="/detail"
              component={(props) => (
                <Detail {...props} selectedItem={selectedItem} />
              )}
              exact={true}
            />
            <Route path="/home" component={Home} exact={true} />
            <Route path="/login" component={Login} exact={true} />
            <Route path="/signup" component={Signup} exact={true} />

            <Route exact path="/" render={() => <Redirect to="/landing" />} />
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
