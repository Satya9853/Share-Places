const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/index");

const getCoordsForAddress = require("../util/location");
const PlaceModel = require("../model/places-schema");

exports.getPlaceByID = async (req, res, next) => {
  const placeID = req.params.placeID;
  const place = await PlaceModel.findById(placeID);
  if (!place) throw new NotFoundError(`No place was found with placeID ${placeID}`);
  res.status(StatusCodes.OK).json({ place: place.toObject({ getters: true }) });
};

exports.getPlacesByUserID = async (req, res, next) => {
  const userID = req.params.userID;
  const places = await PlaceModel.find({ creator: userID });
  places = places.map((place) => place.toObject({ getters: true }));
  res.status(200).json({ places: places });
};

exports.createPlace = async (req, res, next) => {
  const place = await new PlaceModel.create({ ...req.body });
  await place.save();
  res.status(200).json({ ...place });
};

exports.updatePlaceByID = (req, res, next) => {
  const placeID = req.params;
  const data = req.body;
  // const updatedPlace = await PlaceModel.fin
  res.status(200).json({ message: "Working" });
};

exports.deletePlaceByID = (req, res, next) => {
  res.status(200).json({ message: "Working" });
};
