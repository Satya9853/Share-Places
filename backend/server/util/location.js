require("dotenv").config();
const axios = require("axios");

const getCoordsForAddress = async (address) => {
  const uriEncodedAddress = encodeURIComponent(address);
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${uriEncodedAddress}&key=${process.env.GOOGLE_API_KEY}`;
  const response = await axios.get(URL);
  const data = response.data;
  if (!data || data.status === "ZERO_RESULTS") {
    // provide new Error Could Not Find Location
    console.log("error");
  }

  const coordinates = data.results[0].geometry.location;
  return coordinates;
};

module.exports = getCoordsForAddress;
