import countriesService from './services/countries'
import { useState} from 'react'

const DisplayCountries = ({countries}) => {
  if(countries === null || countries === '') return<div>No countries</div>

  let countriesList
  if(countries.length > 1){
    countriesList = countries.map((country) =>  (<li>{country.name.common}</li>))
  } else {
    const {languages, name, flags, capital, area} = countries[0]
    const languageKeys = Object.keys(languages)
    countriesList = <div>{name.common}
    <p>capital: {capital[0]}</p>
    <p>area: {area}</p>
    <p>Languages:
      {languageKeys.map(languageKey => <li>{languages[languageKey]}</li>)}
    </p>
      <img alt={name.common} src={flags.png}/>
    </div>
  }
  return<div>{countriesList}</div>
}

const CountriesForm = ({setCountries}) => {
  const countryChange =(e) => {
    e.preventDefault()
    const query = e.target.value
    if(query === null || query === '' || query.length < 3) return 

    console.log('query', query)
    countriesService.getListByName(query).then((response) => {
      if (response.data.length < 10){
        console.log(response.data)
        setCountries(response.data)
      }
    })
  }
  return <input type="text" onChange={countryChange}/>
}

function App() {
  const [countries, setCountries] = useState(null)
  return (
    <div >
      Find countries <CountriesForm setCountries={setCountries}/>
      <DisplayCountries countries={countries}/>
    </div>
  );
}

export default App;
