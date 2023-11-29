import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLinkPosition } from '../hooks/useLinkPosition';
import { useCities } from '../contexts/CitiesContext';
import Message from './Message';
import Button from './Button';
import BackBN from './BackBN';
import Loader from './Loader';
import styles from './Form.module.css';

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const GeoCodeAPI = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
  const [lat, lng] = useLinkPosition();
  const { addCity, isLoading } = useCities();
  const navigate = useNavigate();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [emoji, setEmoji] = useState('');
  const [geocodingError, setGeocodingError] = useState('');

  useEffect(() => {
    if (!lat && !lng) return;

    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError('');

        const res = await fetch(
          `${GeoCodeAPI}?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();

        if (!data.countryCode) throw new Error(' '); //Message.jsx

        setCityName(data.city || data.locality || '');
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeocodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const currADDedCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await addCity(currADDedCity);
    navigate('/your-city-maps/maps/cities');
  }

  if (isLoadingGeocoding) return <Loader />;

  if (!lat && !lng) return <Message />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.linkFormCS} ${isLoading ? styles.loadingCS : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.infoDivCS}>
        <label htmlFor='cityName'>City</label>
        <input
          disabled
          id='cityName'
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flagCS}>{emoji}</span>
      </div>

      <div className={styles.infoDivCS}>
        <label htmlFor='date'>First Visit Date</label>

        <DatePicker
          id='date'
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat='MM/dd/yyyy'
        />
      </div>

      <div className={styles.infoDivCS}>
        <label htmlFor='notes'>Notes About {cityName}</label>
        <textarea
          id='notes'
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.BNsCS}>
        <Button>
          <span className='material-symbols-rounded'>heart_plus</span> Add
        </Button>
        <BackBN />
      </div>
    </form>
  );
}

export default Form;
