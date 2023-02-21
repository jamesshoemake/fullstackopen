import countriesService from './services/countries'
import { useState} from 'react'

const DisplayCountries = ({countries}) => {
  if(countries === null || countries === '') return<div>No countries</div>

  const countriesList = countries.map((country) =>  (<li>{country.name.common}</li>))
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
