import * as constant from "../constants/index";

const weatherApi = async (searchType, searchInput) => {
  let value = "";
  switch (searchType) {
    case "City Name":
      value = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&units=metric&appid=${constant.API_KEY}`;
      break;

    case "City Zip":
      value = `https://api.openweathermap.org/data/2.5/forecast?zip=${searchInput},pk&units=metric&appid=${constant.API_KEY}`;
      break;

    default:
      return 0;
  }

  const apiCall = await fetch(`${value}`);
  const data = await apiCall.json();
  return data;
};

export default weatherApi;
