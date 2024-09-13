import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import weatherService from './services/weather'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [weatherInfo, setWeatherInfo] = useState(null)
  const [countrySearch, setCountrySearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countriesService
      .getAll()
      .then(response => {
        setAllCountries(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const handleCountrySearchChange = event => {
    setCountrySearch(event.target.value)
    setSelectedCountry(null)
    setWeatherInfo(null)
  }

  const handleShowCountry = country => {
    if (country !== selectedCountry) {
      setSelectedCountry(country)
    }
  }

  const filteredCountries = allCountries.filter(country =>
    country.name.common.toLowerCase().includes(countrySearch.toLowerCase())
  )

  useEffect(() => {
    const fetchWeather = (lat, lng) => {
      weatherService
        .getWeather(lat, lng)
        .then(response => {
          console.log(response.data)
          setWeatherInfo(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }

    if (selectedCountry && !weatherInfo) {
      fetchWeather(selectedCountry.latlng[0], selectedCountry.latlng[1])
    }
    if (filteredCountries.length === 1 && !weatherInfo) {
      fetchWeather(
        filteredCountries[0].latlng[0],
        filteredCountries[0].latlng[1]
      )
    }
  }, [selectedCountry, filteredCountries])

  const CountryInfo = ({ country }) => {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img
          src={country.flags.png}
          alt={`flag of ${country.name.common}`}
          width="150"
        />
        {weatherInfo ? (
          <div>
            <h2>Weather in {country.capital}</h2>
            <p>temperature {weatherInfo.main.temp} °C</p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
              alt={`Weather icon for ${weatherInfo.weather[0].description}`}
            />
            <p>wind {weatherInfo.wind.speed} m/s</p>
          </div>
        ) : (
          <p>No weather info</p>
        )}
      </div>
    )
  }

  return (
    <>
      <div>
        find countries{' '}
        <input value={countrySearch} onChange={handleCountrySearchChange} />
      </div>
      <div>
        {selectedCountry ? (
          <CountryInfo country={selectedCountry} />
        ) : filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filteredCountries.length > 1 ? (
          filteredCountries.map(country => (
            <div key={country.cca3}>
              {country.name.common}
              <button onClick={() => handleShowCountry(country)}>Show</button>
            </div>
          ))
        ) : filteredCountries.length === 1 ? (
          <CountryInfo country={filteredCountries[0]} />
        ) : (
          <p>No matches found</p>
        )}
      </div>
    </>
  )
}

export default App
