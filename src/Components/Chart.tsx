import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import { AreaChart, Area, CartesianGrid, YAxis, XAxis,Tooltip, Legend } from 'recharts';
import { Select } from './Styles'

export interface Props {
  chartData:any;
}

const Chart : React.FC<Props> = ({chartData}) => {
const [compare, setComare] = useState<any>([])
const [firstCountry, setFirstCountry] = useState<any>(chartData[0])
const [secondCountry, setSecondCountry] = useState<any>(chartData[1])

useEffect(() => {
const compareCountries = () => {
let dataArray = []
for (const [key, value] of Object.entries(firstCountry)) {
let date: any = new Date(key)
if (date != 'Invalid Date'){
let obj = {
date: key,
[firstCountry['Province/State'] ? firstCountry['Province/State'] : firstCountry['Country/Region']]: value,
[secondCountry['Province/State'] ? secondCountry['Province/State'] : secondCountry['Country/Region']]: secondCountry[key]
}
dataArray.push(obj)
}
}
setComare(dataArray)
}; compareCountries();
}, [firstCountry, secondCountry])


  return (
<div>
<h1>Compare number of cases</h1>
  <Select
  background='#e4a3a3'
  value={firstCountry['Province/State'] ? firstCountry['Province/State'] : firstCountry['Country/Region']}
  id="first"
  name="First Country"
  onChange={(event: any) => setFirstCountry(chartData.find((country: { [x: string]: any; }) => country['Province/State'] === event.target.value || country['Country/Region'] === event.target.value))}
  >
{chartData.map((e: { [x: string]: any; }) => {
return (
<option
value={e['Province/State'] ? e['Province/State'] : e['Country/Region']}
label={e['Province/State'] ? e['Province/State'] + ', ' + e['Country/Region'] : e['Country/Region'] }
/>
)
})}
  </Select>

    <Select
    background='#a3a4e4'
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
  </Select>
  <br/> <br/> <br/>
<AreaChart width={1000} height={500} data={compare}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="red" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="red" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="blue" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="blue" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="date" />
  <YAxis />
<CartesianGrid strokeDasharray="3 3" />
  <Area type="monotone" dataKey={firstCountry['Province/State'] ? firstCountry['Province/State'] : firstCountry['Country/Region']} stroke="red" fillOpacity={1} fill="url(#colorUv)" />
  <Area type="monotone" dataKey={secondCountry['Province/State'] ? secondCountry['Province/State'] : secondCountry['Country/Region']} stroke="blue" fillOpacity={1} fill="url(#colorPv)" />
  <Tooltip />
  <Legend verticalAlign="bottom" height={50} />
</AreaChart>
</div>
  );
  
}

export default Chart;
