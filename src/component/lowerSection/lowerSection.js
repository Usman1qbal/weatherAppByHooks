import React, { forwardRef, useImperativeHandle } from "react";
import WeatherPanel from "../weatherPanel/weatherPanel";
import "./lowerSection.css";
import Highcharts from "highcharts";

const LowerSection = forwardRef((props, ref) => {

useImperativeHandle(ref, () => ({
  graph() {
    let charts = new Highcharts.chart("chartsContainer", {
      chart: {
        events: {
          redraw: function() {
            var label = this.renderer
              .label("The chart was just redrawn", 100, 120)
              .attr({
                fill: Highcharts.getOptions().colors[0],
                zIndex: 8
              })
              .css({
                color: "black",
                height: "10px"
              })
              .add();

            setTimeout(function() {
              label.fadeOut();
            }, 1000);
          }
        },
        height: 200
      },
      title: "",
      xAxis: {
        categories: props.dayTemp.catogeries,
        title: ""
      },
      yAxis: {
        visible: false
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: [
        {
          name: "time ->",
          data: props.dayTemp.tempList
        }
      ]
    });
  }
}));

return (
  <div className="detailSection" style={{ visibility: props.visibility }}>
    <section className="lowerSection">
      <div className="upperGrid">
        <p id="cityName">{props.cityName}</p>
        <p id="cityDay">{props.dayTemp.dayName}</p>
        <p id="cityStatus"> {props.dayTemp.description} </p>
      </div>

      <div className="middleGrid">
        <div className="middleImgDiv">
          {" "}
          <img src={props.dayTemp.icon} alt="Today Weather" />
        </div>

        <label id="temperature">{Math.floor(props.dayTemp.maxTemp)}</label>

        <div className="temperatureType" onClick={props.temperatureConversion} >
          <span id="celciusBtn">ºC</span> <label> | </label>
          <span id="farenhietBtn"> ºF </span>
        </div>

        <div className="showDetail">
          <p>
            Pressure: <label id="pressure"> {props.dayTemp.pressure} </label>{" "}
            hPa{" "}
          </p>
          <p>
            Humidity: <label id="humidity"> {props.dayTemp.humidity} </label>{" "}
            %{" "}
          </p>
          <p>
            Wind Speed: <label id="wind"> {props.dayTemp.windSpeed} </label>{" "}
            mph{" "}
          </p>
        </div>
      </div>

      <div className="graphType">
        <div className="graphPanel">Temperature</div>
        <div className="graphPanel">Precipitation</div>
        <div className="graphPanel">Wind</div>
      </div>

      <div id="chartsContainer" name="chartsContainer" className="Chart" />

      <div className="lowerGrid">
        {
          props.weekTemp.map((item,key) => 
            (
              <WeatherPanel dayName={item.dayName} key={item+key} icon={item.icon} minTemp={item.minTemp} maxTemp={item.maxTemp}
                day={props.rearrangeDayData} />
            )
            )
        }
      </div>
    </section>
  </div>
  );
});

export default React.memo(LowerSection,(prevProps, nextProps) =>
{
  return prevProps.dayTemp === nextProps.dayTemp
});
