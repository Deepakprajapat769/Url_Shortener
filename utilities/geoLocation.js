import axios from "axios";

export const getGeoLocation = async (ip) => {
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    return response.data;
  } catch (error) {
    return { error: "Geo API failed" };
  }
};
