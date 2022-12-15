const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const { validationResult } = require("express-validator");

const { BadRequestError, NotFoundError, CustomApiError } = require("../errors/index");
const getCoordsForAddress = require("../util/location");
const PlaceModel = require("../model/places-schema");
const UserModel = require("../model/users-schema");

exports.getPlaceByID = async (req, res, next) => {
  const placeID = req.params.placeID;

  const place = await PlaceModel.findById(placeID);

  if (!place) throw new NotFoundError(`No place was found with placeID ${placeID}`);

  res.status(StatusCodes.OK).json({ place: place.toObject({ getters: true }) });
};

exports.getPlacesByUserID = async (req, res, next) => {
  const userID = req.params.userID;

  const places = await PlaceModel.find({ creator: userID });

  if (!places || places.length === 0) throw new NotFoundError(`No place was found with userID ${userID}`);

  places = places.map((place) => place.toObject({ getters: true }));
  res.status(StatusCodes.OK).json({ places: places });
};

exports.createPlace = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) throw new BadRequestError("Invalid inputs passed, please check your data");

  const { address, creator } = req.body;

  const user = await UserModel.findById(creator);
  if (!user) throw new NotFoundError("User Not Found ");

  // if we dont get any result for location coordinates recieves a badrequest object
  const coordinates = await getCoordsForAddress(address);
  if (coordinates instanceof BadRequestError) throw coordinates;

  const newPlace = {
    ...req.body,
    location: coordinates,
  };

  //  setting a transaction session which will roll back is any of the task fails
  const transaction_session = await mongoose.startSession();
  transaction_session.startTransaction();
  const createdPlace = await PlaceModel.create([newPlace], { session: transaction_session });
  await user.updateOne({ $push: { places: createdPlace } }, { session: transaction_session });
  transaction_session.commitTransaction();

  if (!createdPlace) throw new Error();
  console.log(createdPlace);

  res.status(StatusCodes.CREATED).json({ place: createdPlace });
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

  //  setting a transaction session which will roll back is any of the task fails
  const transaction_session = await mongoose.startSession();
  transaction_session.startTransaction();
  const deletedPlace = await PlaceModel.findOneAndRemove({ _id: placeID }, { session: transaction_session }).populate("creator");
  if (!deletedPlace) throw new NotFoundError(`No place was found with placeID :${placeID}`);
  await deletedPlace.creator.places.pull(deletedPlace);
  await deletedPlace.creator.save({ session: transaction_session });
  await transaction_session.commitTransaction();

  res.status(StatusCodes.OK).json({ message: "Place Delete Successfully" });
};
