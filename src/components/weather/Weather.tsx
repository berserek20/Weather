import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WeatherResponseType } from "./type";
function Weather() {
  const { lon, lat } = useParams();
  const [weatherData, setWeatherData] = useState<WeatherResponseType>();

  useEffect(() => {
    const ApiKey=import.meta.env.VITE_ApiKey;
    console.log(ApiKey)
    async function ApiCall() {
      const link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ApiKey}`;
      try {
        const Wdata = await fetch(link);
        const response: WeatherResponseType = await Wdata.json();

        if (response) {
          setWeatherData(response);
        } else {
          console.log("couldn't find Data");
        }
      } catch (err) {
        console.log(err);
      }
    }
    ApiCall();
  });
  return (
    <div>
      <p>Longitude:{lon}</p>
      Latitude:{lat}
      <p>Weather:{weatherData?.weather[0].description}</p>
      <p>temperature:{weatherData?.main.temp},</p>
      <p>humidity:{weatherData?.main.humidity},</p>
      <p>wind speed:{weatherData?.wind.speed},</p>
      <p>and atmospheric pressure:{weatherData?.main.pressure}</p>
    </div>
  );
}

export default Weather;
