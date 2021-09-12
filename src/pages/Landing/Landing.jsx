import React, { useState } from "react";
import {
  IonChip,
  IonLabel,
  IonPage,
  IonContent,
  IonIcon,
  IonAlert,
} from "@ionic/react";
import "./Landing.css";
import { useHistory } from "react-router";
import { people, pricetags, lockOpen, fingerPrint } from "ionicons/icons";

function Landing() {
  let history = useHistory();
  const [showAlert, setShowAlert] = useState(false);

  function gotoItems() {
    if (localStorage.getItem("loggedIn")) {
      history.push("/list");
    } else {
      setShowAlert(true);
    }
  }

  return (
    <IonPage>
      <IonContent className="background">
        <div style={{ textAlign: "center" }}>
          <br />
          <h3 style={{ color: "white" }}>Welcome to</h3>
          <div className="text-box">
            <span className="one">G</span>
            <span className="one">A</span>
            <span className="one">Y</span>
            <span className="one">A</span>
            <span className="one">T</span>
            <span className="one">R</span>
            <span className="one">I</span>
          </div>
          <div className="text-box1">
            <span className="two">G</span>
            <span className="two">R</span>
            <span className="two">A</span>
            <span className="two">P</span>
            <span className="two">H</span>
            <span className="two">I</span>
            <span className="two">C</span>
            <span className="two">S</span>
          </div>
        </div>
        <div className="chip">
          <IonChip
            color="success"
            className="chip-size"
            onClick={() => history.push("/login")}
          >
            <IonLabel>
              Login <IonIcon slot="end" icon={lockOpen} />
            </IonLabel>
          </IonChip>
          <br />
          <br />
        </div>
        <IonAlert
          color="danger"
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Alert"}
          cssClass="alert-home"
          message={"Please login to see the items"}
          buttons={[
            {
              text: "Ok",
              cssClass: "ok-button",
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
}

export default Landing;
