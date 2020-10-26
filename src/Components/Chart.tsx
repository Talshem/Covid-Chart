import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import { AreaChart, Area, CartesianGrid, YAxis, XAxis,Tooltip, Legend } from 'recharts';

export interface Props {
  firstCountry: any;
  secondCountry: any;
}

const Chart : React.FC<Props> = ({firstCountry, secondCountry}) => {
const [compare, setComare] = useState<any>([])

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
<AreaChart width={850} height={500} data={compare}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="date" />
  <YAxis />
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Legend verticalAlign="bottom" height={50} />
  <Area type="monotone" dataKey={firstCountry['Province/State'] ? firstCountry['Province/State'] : firstCountry['Country/Region']} stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
  <Area type="monotone" dataKey={secondCountry['Province/State'] ? secondCountry['Province/State'] : secondCountry['Country/Region']} stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
</AreaChart>
</div>
  );
  
}

export default Chart;
