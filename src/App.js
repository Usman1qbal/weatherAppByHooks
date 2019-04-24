import React, { useState, useRef, useEffect } from "react";
import Header from "./component/header/header";
import UpperSection from "./component/upperSection/upperSection";
import WeatherApi from "./action/weatherApi";
import * as R from "ramda";
import LowerSection from "./component/lowerSection/lowerSection";

const App = props => {
  const [totalTemp, setTotalTemp] = useState([]);
  const [weekTemp, setWeekTemp] = useState([]);
  const [dayTemp, setdayTemp] = useState({});
  const [cityName, setCityName] = useState(null);
  const [degree, setDegree] = useState("");
  const dayList = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

const childRef = useRef();

const celciusToFarenhietFormula = value => 
{
  return Math.floor((value * 9) / 5 + 32);
};

const farenhietToCelciusFormula = value =>
{
  return Math.floor(((value - 32) * 5) / 9);
};

const convertToCelcius = () => {
  let list = R.map(item => 
    {
      item.maxTemp = farenhietToCelciusFormula(item.maxTemp);
      item.minTemp = farenhietToCelciusFormula(item.minTemp);
      return item;
    }, totalTemp);
  
  return list;
};

  const convertToFarenhiet = () => {
    let list = R.map(item => {
      item.maxTemp = celciusToFarenhietFormula(item.maxTemp);
      item.minTemp = celciusToFarenhietFormula(item.minTemp);
      return item;
    }, totalTemp);

    return list;
  };

  const temperatureConversion = e => {
    let list;

    if ( R.equals(e.target.id, "celciusBtn") && !R.equals(degree, "C")) 
    {
      setDegree("C");
      list = convertToCelcius();
      setTotalTemp(list);
      rearrangeWeekData(list);
    } 
    else if ( R.equals(e.target.id, "farenhietBtn") && !R.equals(degree, "F")) 
    {
      setDegree("F");
      list = convertToFarenhiet();
      setTotalTemp(list);
      rearrangeWeekData(list);
    }
  };

const getRequiredDayData = dayName => {
    let data;
    R.filter(item => 
      {
        if (R.equals(item.dayName, dayName)) 
        {
          data = item;
        }return item;
      }, weekTemp);
    return data;
  };

  const getGraphCoordinate = (data, dayName) => {
    let catogeries = [];
    let tempList = [];
    R.filter(item => 
    {
      if (R.equals(item.dayName, dayName)) 
      {
        catogeries.push(item.dateTime.getHours());
        tempList.push(Math.floor(item.maxTemp));
      }
      return item;
    }, totalTemp);
    data["catogeries"] = catogeries;
    data["tempList"] = tempList;
    return data;
  };

  const rearrangeDayData = dayName => {
    if (!R.equals(weekTemp, [])) 
    {
      let data;
      data = getRequiredDayData(dayName);
      data = getGraphCoordinate(data, dayName);
      setdayTemp(data);
    }
    childRef.current.graph();
  };

  const rearrangeWeekData = data => {
    let todayDetail = [];
    todayDetail.push(data[0]);

    let week = R.filter(item => 
      {
        let day = dayList[item.dateTime.getDay()];
        let hour = item.dateTime.getHours();
        return R.equals(hour, 12) && !R.equals(day, todayDetail[0].dayName);
      }, data);
    
    todayDetail = todayDetail.concat(week);
    todayDetail = todayDetail.splice(0, 5);
    setWeekTemp(todayDetail);
    rearrangeDayData(data[0].dayName);
  };

  const rearrangeTotalData = data => {
    setCityName(data.city.name + " , " + data.city.country);
    let weekTempList = R.map(item => 
      {
        let date = new Date(item.dt_txt);
        return {
          dayName: dayList[date.getDay()],    dateTime: date,
          humidity: item.main.humidity,       pressure: item.main.pressure,
          maxTemp: item.main.temp_max,        minTemp: item.main.temp_min,
          description: item.weather[0].main,  windSpeed: item.wind.speed,
          icon: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`
        };
      }, data.list);
    
    setTotalTemp(weekTempList);
    setDegree("C");
    rearrangeWeekData(weekTempList);
  };

  const fetchData = async (searchType, searchInput) => 
  {
    let data = await WeatherApi(searchType, searchInput);
    return data;
  };
  useEffect(() => 
  {    
    fetchData();
  }, []);

  const extractDataFromApi = async e => {
    
    e.preventDefault();
    const [searchType, searchInput] = e.target;
    if (!R.equals(searchType.value,"Search By")) {
      
      let data;
      data = await fetchData(searchType.value, searchInput.value);
      
      if (!R.equals(data.cod, "404")) {
        rearrangeTotalData(data);
      } 
      else {
        setWeekTemp([]);
        alert("please Add correct entry");
      }
    } 
    else {
      alert("please select search Type");
    }
  };


  return (
    <div>
      <Header />
      <UpperSection extractDataFromApi={extractDataFromApi} />
      {
        !R.equals(weekTemp.length, 0) && 
        (<LowerSection weekTemp={weekTemp}       cityName={cityName} dayTemp={dayTemp}
          rearrangeDayData={rearrangeDayData}    temperatureConversion={temperatureConversion}
          ref={childRef}                         visibility={"visible"} />)
      }
    </div>
  );
};
export default App;
