import Card from "../../shared/components/UI-Elements/Card";
import PlaceItem from "./Place-Item";
import Style from "./Place-List.module.css";

const PlaceList = (props) => {
  //! if No Items or places are found
  if (props.items.length === 0) {
    return (
      <div className={`${Style["place-list"]} center`}>
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <button>Share Place</button>
        </Card>
      </div>
    );
  }
  //* if we found places then we render the list of places
  const PlacesList = props.items.map((place) => {
    return (
      <PlaceItem
        key={place.id}
        id={place.id}
        image={place.imageUrl}
        title={place.title}
        description={place.description}
        address={place.address}
        creatorId={place.creator}
        coordinated={place.location}
      />
    );
  });
  return <ul className={Style["place-list"]}>{PlacesList}</ul>;
};

export default PlaceList;
