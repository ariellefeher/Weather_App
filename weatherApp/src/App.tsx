
import { IonApp, setupIonicReact, IonItem, IonInput, IonGrid, IonRow, IonCol, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonLabel } from '@ionic/react';
import axios from 'axios';
import './App.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Theme variables */
import './theme/variables.css';
import { useState, useEffect } from 'react';

setupIonicReact();

const App: React.FC = () => {
  // const [city, setCity] = useState<string>('');
  // const [weather, setWeather] = useState<string>('');

  // const handleCityChange = async (e: any) => {
  //   setCity(e.detail.value);

  // const API_KEY = '6050edbb54b73571254d1ea2c2f5cca5';

  // const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${e.detail.value}&units=metric&appid=${API_KEY}`;

  //   try {
  //     const response = await axios.get(API_URL);

  //     setWeather(response.data.main.temp);
  //   } catch (error) {
  //     console.error("Error fetching weather data: ", error);
  //   }
  // };
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city]);

  const fetchWeather = async (city: string) => {
    const API_KEY = '6050edbb54b73571254d1ea2c2f5cca5';

    try {
      const currentWeatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
      const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

      const [currentWeatherRes, forecastRes] = await Promise.all([
        axios.get(currentWeatherURL),
        axios.get(forecastURL),
      ]);

      const forecastData = forecastRes.data.list
        .filter((forecast: any, index: number) => index % 8 === 0)
        .slice(0, 4)
        .map((forecast: any) => ({
          date: new Date(forecast.dt * 1000),
          temp: forecast.main.temp,
          icon: forecast.weather[0].icon,
        }));

      setWeatherData({
        current: {
          temp: currentWeatherRes.data.main.temp,
          icon: currentWeatherRes.data.weather[0].icon,
        },
        forecast: forecastData,
      });
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  };

  const handleCityChange = (e: any) => {
    setCity(e.detail.value);
  };

  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Weather App</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonItem>
        <IonLabel>City</IonLabel>
        <IonSelect value={city} placeholder="Select One" onIonChange={handleCityChange}>
          <IonSelectOption value="Paris">Paris</IonSelectOption>
          <IonSelectOption value="London">London</IonSelectOption>
          <IonSelectOption value="Tel Aviv">Tel Aviv</IonSelectOption>
          <IonSelectOption value="Sydney">Sydney</IonSelectOption>
        </IonSelect>
      </IonItem>
      {weatherData && (
        <>
          <IonItem>
            <IonLabel>Current Weather: </IonLabel>
            <img src={`http://openweathermap.org/img/w/${weatherData.current.icon}.png`} alt="Weather Icon" />
            <IonLabel>{weatherData.current.temp}°C</IonLabel>
          </IonItem>
          <IonGrid>
            {weatherData.forecast.map((forecast: any, index: number) => (
              <IonRow key={index}>
                <IonCol>{forecast.date.toLocaleDateString()}</IonCol>
                <IonCol>
                  <img src={`http://openweathermap.org/img/w/${forecast.icon}.png`} alt="Weather Icon" />
                </IonCol>
                <IonCol>{forecast.temp}°C</IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </>
      )}
      <h2 className="ion-text-center">App made by Arielle Feher</h2>
    </IonContent>
  </IonPage>
);
}; 
export default App;
