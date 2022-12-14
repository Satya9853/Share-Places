const { StatusCodes } = require("http-status-codes");
const { validationResult } = require("express-validator");

const { BadRequestError, NotFoundError, CustomApiError } = require("../errors/index");
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

  if (!places) throw new NotFoundError(`No place was found with userID ${userID}`);

  places = places.map((place) => place.toObject({ getters: true }));
  res.status(StatusCodes.OK).json({ places: places });
};

exports.createPlace = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) throw new BadRequestError("Invalid inputs passed, please check your data");

  const { address } = req.body;

  const coordinates = getCoordsForAddress(address);
  if (!coordinates) throw new Error();

  const newPlace = {
    ...req.body,
    location: coordinates,
  };

  const createdPlace = await PlaceModel.create(newPlace);

  if (!createdPlace) throw new Error();

  res.status(StatusCodes.CREATED).json({ place: createdPlace.toObject({ getters: true }) });
};

exports.updatePlaceByID = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) throw new BadRequestError("Invalid inputs passed, please check your data");

  const placeID = req.params;
  const updatedPlace = await PlaceModel.findByIdAndUpdate({ _id: placeID }, req.body, { new: true, runValidators: true });

  if (!updatedPlace) throw new NotFoundError(`No place was found with placeID :${placeID}`);

  res.status(StatusCodes.OK).json({ place: updatedPlace.toObject({ getters: true }) });
};

exports.deletePlaceByID = async (req, res, next) => {
  const placeID = req.params.placeID;

  const deletedPlace = await PlaceModel.findOneAndRemove({ _id: placeID });

  if (!deletedPlace) throw new NotFoundError(`No place was found with placeID :${placeID}`);

  res.status(StatusCodes.OK).json({ place: deletedPlace.toObject({ getters: true }) });
};
