import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import {Text, CartesianGrid, BarChart, YAxis, XAxis,Bar, Tooltip, Legend } from 'recharts';
import { Button, Select } from './Styles'

const AnotherChart : React.FC = () => {
const [chartData, setChartData] = useState<any>([])
const [sortBy, setSortBy] = useState<string>('TotalConfirmed')
const [page, setPage] = useState<number>(0)

useEffect(() => {
const fetchData = async () => {
const { data } = await axios.get(`https://api.covid19api.com/summary`)

setChartData(data["Countries"])
}; fetchData();
}, [])

  return (
<div>
<h1>Get all kind of information!</h1>
      <Select
  background='#cdcaf8'
  id="first"
  name="First Country"
  onChange={(event) => setSortBy(event.target.value)}>

 <option value='TotalConfirmed' label='Total Confirmed'/>
 <option value='NewConfirmed' label='New Confirmed' />
 <option value='NewDeaths' label='New Deaths'/>
 <option value='TotalDeaths' label='Total Deaths'/>
 <option value='NewRecovered' label='New Recovered'/>
 <option value='TotalRecovered' label='Total Recovered'/>
  </Select>
<br/> <br/> <br/>
  <BarChart width={1000} height={500} data={chartData.slice(page, page + 10)}>
    <XAxis allowDataOverflow={true} tickFormatter={val => val.substr(0, 11)} dataKey={"Country"} />
    <YAxis tickFormatter={val => val/1000 + 'K'} />
    <Tooltip />
    <CartesianGrid strokeDasharray="3, 3" />
    <Bar dataKey={sortBy} barSize={30} fill="#8884d8"
      />
  </BarChart>
 <br/>
<div style={{width:'1200px'}}>
<Button style={{marginRight:'5px'}} onClick={() => setPage(page > 0 ? page - 10 : 0)}>Back</Button>
{chartData.slice(0, chartData.length/10 + 1).map((e: any) => {
return (
<Button focus={chartData.indexOf(e) * 10 === page} onClick={() => setPage(chartData.indexOf(e) * 10)}>{chartData.indexOf(e)}</Button>
)
})}
<Button onClick={() => setPage(page + 10 < chartData.length ? page + 10 : chartData.length - 9)}>Next</Button>
</div>

</div>
  );
  
}

export default AnotherChart;
