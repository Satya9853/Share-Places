const { getPlaceByID, getPlacesByUserID, createPlace, updatePlaceByID, deletePlaceByID } = require("../controller/places-controller");

const router = require("express").Router();
const fileUpload = require("../middleware/file-upload");

router.route("/").post(fileUpload.single("image"), createPlace);
router.route("/:placeID").get(getPlaceByID).patch(updatePlaceByID).delete(deletePlaceByID);
router.route("/user/:userID").get(getPlacesByUserID);

module.exports = router;
