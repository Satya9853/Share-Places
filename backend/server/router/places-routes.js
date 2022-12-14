const { getPlaceByID, getPlacesByUserID, createPlace, updatePlaceByID, deletePlaceByID } = require("../controller/places-controller");

const Route = require("express").Router();

Route.route("/:placeID").get(getPlaceByID).patch(updatePlaceByID).delete(deletePlaceByID);
Route.route("/:userID").get(getPlacesByUserID);
Route.route("/").post(createPlace);

module.exports = Route;
