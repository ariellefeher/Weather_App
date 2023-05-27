import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import axios from 'axios';
import './App.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useState } from 'react';

setupIonicReact();

const App: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<string>('');

  const handleCityChange = async (e: any) => {
    setCity(e.detail.value);
    
     // Define YQL query
     const yql_query = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${e.detail.value}") and u='c'`;

     // Construct the request URL
     const url = `https://query.yahooapis.com/v1/public/yql?q=${encodeURIComponent(yql_query)}&format=json`;
 
     try {
       const response = await fetch(url);
       const data = await response.json();
 
       if (!data.query.results) {
         throw new Error("Empty results from Yahoo");
       }
 
       let condition = data.query.results.channel.item.condition;
 
       // Update the weather state
       setWeather(condition.temp);
 
     } catch (error) {
       console.error("Error fetching weather data: ", error);
     }

    // // Yahoo Weather API URL (replace with actual)
    // const API_URL = `https://weather-yahooapis-com/YOUR_API_KEY/forecasts/${e.detail.value},fr`;

    // try {
    //   const response = await axios.get(API_URL);
    //   // Here we're assuming the API returns the temperature in Celsius
    //   setWeather(response.data.forecasts[0].high);
    // } catch (error) {
    //   console.error("Error fetching weather data: ", error);
    // }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Select a City</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonLabel>City</IonLabel>
        <IonSelect value={city} placeholder="Select One" onIonChange={handleCityChange}>
          <IonSelectOption value="Paris">Paris</IonSelectOption>
          <IonSelectOption value="London">London</IonSelectOption>
          <IonSelectOption value="Tel Aviv">Tel Aviv</IonSelectOption>
          <IonSelectOption value="Sydney">Sydney</IonSelectOption>
        </IonSelect>
        <h2>Weather: {weather}°C</h2>
        <h2>App made by Arielle Feher!</h2>
      </IonContent>
    </IonPage>
  );
  };
  
export default App;
