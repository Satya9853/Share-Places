const { getPlaceByID, getPlacesByUserID, createPlace, updatePlaceByID, deletePlaceByID } = require("../controller/places-controller");

const router = require("express").Router();

router.route("/").post(createPlace);
router.route("/:placeID").get(getPlaceByID).patch(updatePlaceByID).delete(deletePlaceByID);
router.route("/user/:userID").get(getPlacesByUserID);

module.exports = router;
