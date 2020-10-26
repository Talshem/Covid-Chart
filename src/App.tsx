import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import Chart from './Components/Chart'
import AnotherChart from './Components/AnotherChart';

const App : React.FC = () => {
const [chartHeaders, setChartHeaders] = useState([])
const [chartData, setChartData] = useState<any>([])
const [firstCountry, setFirstCountry] = useState<any>('')
const [secondCountry, setSecondCountry] = useState<any>('')
const [compare, setComare] = useState<any>([])



useEffect(() => {
const fetchData = async () => {
const { data } = await axios.get(`https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`)
let arrayData = data
.replace('Sint Maarten,', ' ,Sint Maarten ')
.replace('"Bonaire, Sint Eustatius and Saba"', 'Bonaire Sint Eustatius and Saba')
.replace('"Korea, South"', 'South Korea')
.replace(/\r?\n|\r/g, ',')
.split(',')
setChartHeaders(arrayData.slice(0,arrayData.indexOf('Afghanistan')-1))

for( let j=0; j <= arrayData.length; j++){
if (!isNaN(Number(arrayData[j]))) { arrayData[j] = Number(arrayData[j])}
}

let countriesData: any = [];
for(let i=arrayData.slice(0,arrayData.indexOf('Afghanistan')).length-1; i <= arrayData.slice(arrayData.indexOf('Afghanistan'), data.length).length; i += arrayData.slice(0,arrayData.indexOf('Afghanistan')-1).length)
{
countriesData.push(arrayData.slice(i, i + arrayData.slice(0 ,arrayData.indexOf('Afghanistan')).length-2))
}


let arrayCountriesData: any = [];

for( let country of countriesData){
var object:any = {}
for( let j=0; j <= arrayData.slice(0,arrayData.indexOf('Afghanistan')).length; j++){
object[arrayData.slice(0,arrayData.indexOf('Afghanistan')-1)[j]] = country[j]
if(!isNaN(country[0])) object[arrayData.slice(0,arrayData.indexOf('Afghanistan')-1)[0]] = null
}
arrayCountriesData.push(object)
}
setChartData(arrayCountriesData)
setFirstCountry(arrayCountriesData[0])
setSecondCountry(arrayCountriesData[1])
}; fetchData();
}, [])

  return (
<div>
  <select
  value={firstCountry['Province/State'] ? firstCountry['Province/State'] : firstCountry['Country/Region']}
  id="first"
  name="First Country"
  onChange={(event) => setFirstCountry(chartData.find((country: { [x: string]: any; }) => country['Province/State'] === event.target.value || country['Country/Region'] === event.target.value))}
  >
{chartData.map((e: { [x: string]: any; }) => {
return (
<option
value={e['Province/State'] ? e['Province/State'] : e['Country/Region']}
label={e['Province/State'] ? e['Province/State'] + ', ' + e['Country/Region'] : e['Country/Region'] }
/>
)
})}
  </select>

    <select
    value={secondCountry['Province/State'] ? secondCountry['Province/State'] : secondCountry['Country/Region']}
    id="second"
    name="Second Country"
    onChange={(event) => setSecondCountry(chartData.find((country: { [x: string]: any; }) => country['Province/State'] === event.target.value || country['Country/Region'] === event.target.value))}
    >
{chartData.map((e: { [x: string]: any; })  => {
return (
<option
onChange={() => setSecondCountry(chartData.find((country: { [x: string]: any; }) => country['Province/State'] ? country['Province/State'] === e['Province/State'] : country['Country/Region'] === e['Country/Region']))}
value={e['Province/State'] ? e['Province/State'] : e['Country/Region']}
label={e['Province/State'] ? e['Province/State'] + ', ' + e['Country/Region'] : e['Country/Region'] }
/>

)
})}
  </select>
<Chart firstCountry={firstCountry} secondCountry={secondCountry}/>
<AnotherChart/>
</div>
  );
  
}

export default App;
