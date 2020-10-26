import React, { useState, useEffect, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import AnotherChart from './Components/AnotherChart';
const Chart = React.lazy(() => import('./Components/Chart'));

const App : React.FC = () => {
const [chartData, setChartData] = useState<any>(undefined)

useEffect(() => {
const fetchData = async () => {
const { data } = await axios.get(`https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`)
let arrayData = data
.replace('Sint Maarten,', ' ,Sint Maarten ')
.replace('"Bonaire, Sint Eustatius and Saba"', 'Bonaire Sint Eustatius and Saba')
.replace('"Korea, South"', 'South Korea')
.replace(/\r?\n|\r/g, ',')
.split(',')

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
}; fetchData();
}, [])

  return (
<div style={{margin:'5%'}}>
  <Suspense fallback={<div>Loading Chart...</div>}>
{chartData && <Chart chartData={chartData}/>}
  </Suspense>
<AnotherChart/>
</div>
  );
  
}

export default App;
