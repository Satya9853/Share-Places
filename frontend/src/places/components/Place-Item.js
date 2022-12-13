import { Fragment, useState } from "react";

import Card from "../../shared/components/UI-Elements/Card";
import Button from "../../shared/components/Form-Elements/Button";
import Modal from "../../shared/components/UI-Elements/Modal";
import Map from "../../shared/components/UI-Elements/Map";
import Style from "./Place-Item.module.css";

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showMapHandler = (event) => {
    setShowMap(!showMap);
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("DELETING....");
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
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>

      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure"
        footerClass={Style["place-item__modal-actions"]}
        footer={
          <Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </Fragment>
        }
      >
        <p>Do you want to proceed and delete this place ? Please not that it can't br undone thereafter.</p>
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
            <Button danger onClick={showDeleteWarningHandler}>
              DELETE
            </Button>
          </div>
        </Card>
      </li>
    </Fragment>
  );
};

export default PlaceItem;
