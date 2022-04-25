var axios = require("axios").default;

const getMapLink = async (address) => {
  let options = {
    method: "GET",
    url: "https://trueway-geocoding.p.rapidapi.com/Geocode",
    params: { address: address, language: "en" },
    headers: {
      "x-rapidapi-host": "trueway-geocoding.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
    },
  };

  let coordinates;
  try {
    await axios
      .request(options)
      .then(function (response) {
        coordinates = response.data.results[0].location;
      })
      .catch(function (error) {
        throw error;
      });
  } catch (error) {
    return undefined;
  }

  return `https://www.google.com/maps/place/${coordinates.lat},${coordinates.lng}`;
};

module.exports = getMapLink;
