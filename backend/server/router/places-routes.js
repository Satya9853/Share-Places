const { getPlaceByID, getPlacesByUserID, createPlace, updatePlaceByID, deletePlaceByID } = require("../controller/places-controller");

const router = require("express").Router();

router.route("/:placeID").get(getPlaceByID).patch(updatePlaceByID).delete(deletePlaceByID);
router.route("/:userID").get(getPlacesByUserID);
router.route("/").post(createPlace);

module.exports = router;
