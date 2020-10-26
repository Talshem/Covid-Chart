import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import {CartesianGrid, BarChart, YAxis, XAxis,Bar, Tooltip, Legend } from 'recharts';

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
      <select
  id="first"
  name="First Country"
  onChange={(event) => setSortBy(event.target.value)}>

 <option value='TotalConfirmed' label='Total Confirmed'/>
 <option value='NewConfirmed' label='New Confirmed' />
 <option value='NewDeaths' label='New Deaths'/>
 <option value='TotalDeaths' label='Total Deaths'/>
 <option value='NewRecovered' label='New Recovered'/>
 <option value='TotalRecovered' label='Total Recovered'/>
  </select>
<br/>
<button style={{marginRight:'5px'}} onClick={() => setPage(page > 0 ? page - 10 : 0)}>Back</button>

{chartData.slice(0, chartData.length/10 + 1).map((e: any) => {
return (
<button style={{marginRight:'5px', border:'1px solid black', background:chartData.indexOf(e) * 10 === page ? 'grey' : 'white'}} onClick={() => setPage(chartData.indexOf(e) * 10)}>{chartData.indexOf(e) * 10}</button>
)
})}
<button onClick={() => setPage(page + 10 < chartData.length ? page + 10 : chartData.length - 10)}>Next</button>

  <BarChart width={1000} height={500} data={chartData.slice(page, page + 10)}>
    <XAxis dataKey={"Country"} />
    <YAxis />
    <Tooltip />
    <CartesianGrid strokeDasharray="3 3" />
    <Legend verticalAlign="bottom" height={50} />
    <Bar dataKey={sortBy} barSize={30} fill="#8884d8"
      />
  </BarChart>
</div>
  );
  
}

export default AnotherChart;
