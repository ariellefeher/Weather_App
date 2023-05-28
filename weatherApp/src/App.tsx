import { IonApp, setupIonicReact, IonItem, IonInput, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonLabel } from '@ionic/react';
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

  const API_KEY = '6050edbb54b73571254d1ea2c2f5cca5';

  const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${e.detail.value}&units=metric&appid=${API_KEY}`;

    try {
      const response = await axios.get(API_URL);

      setWeather(response.data.main.temp);
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
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
        <IonItem>
          <IonLabel>Weather: </IonLabel>
          <IonInput value={weather + '°C'} readonly />
        </IonItem>
        <h2 className="ion-text-center">App made by Arielle Feher</h2>
      </IonContent>
    </IonPage>
  );
  };
  
export default App;
