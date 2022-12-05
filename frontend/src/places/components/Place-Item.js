import { Fragment, useState } from "react";

import Card from "../../shared/components/UI-Elements/Card";
import Button from "../../shared/components/Form-Elements/Button";
import Modal from "../../shared/components/UI-Elements/Modal";
import Style from "./Place-Item.module.css";

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);

  const showMapHandler = (event) => {
    setShowMap(!showMap);
  };

  return (
    <Fragment>
      <Modal
        show={showMap}
        onCancel={showMapHandler}
        header={props.address}
        contentClass={Style["place-item__modal-content"]}
        footerClass={Style["place-item__modal-actions"]}
        footer={<Button onClick={showMapHandler}>CLOSE</Button>}
      >
        <div className={Style["map-container"]}>
          <h2>THE MAP</h2>
        </div>
      </Modal>
      <li className={Style["place-item"]}>
        <Card className={Style["place-item__content"]}>
          <div className={Style["place-item__image"]}>
            <img src={props.image} alt={props.title} />
          </div>
          <div className={Style["place-item__info"]}>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className={Style["place-item__actions"]}>
            <Button inverse onClick={showMapHandler}>
              VIEW ON MAP
            </Button>
            <Button to={`/places/${props.id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
          </div>
        </Card>
      </li>
    </Fragment>
  );
};

export default PlaceItem;
