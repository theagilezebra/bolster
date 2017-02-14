import React from 'react';

const budget = {
  'Transfer': 200,
  'Shops': 45,
  'Food and Drink': 450,
  'Interest': 30
}

const renderRows = function(mappedObj){
  let elements = [];
  for(let key in mappedObj) {
    elements.push(    
     <tr>
      <td>{key}</td>
      <td>{mappedObj[key]}</td>
      <td>{budget[key]}</td>
      <td>{budget[key] - mappedObj[key]}</td>
    </tr>
    )
  }
  return elements; 
}

//this function does not add transactions that lack a category. it ignores.
const mapCategories = function(data){
  let mapped = {};
  data.transactions.forEach((item) => {
    if(item.category){
        if(mapped[item.category[0]] === undefined){
          mapped[item.category[0]] = 0;
        } 
        else {
          mapped[item.category[0]] = Math.round(mapped[item.category[0]] + item.amount);
        }
      }
  })
  return mapped;
}

const mapAndRender = function(data){
  return renderRows(mapCategories(data))
}

const labelize = function(data){
  const labels = [];
    data.transactions.forEach((item) => {
    if(item.category){
        if(labels.includes(item.category[0]) === false){
          console.log(item.category[0])
          labels.push(item.category[0]);
        } 
      }
  })
  return labels;
}

const populateChart = function(data){
  const chartData = [];
  const chartConfig = {
        labels: [],
        datasets: [
            {
            data: [],
            fillColor: "#90EE90"
            },
            {
              //hardcoded budget. Refactor
            data:[200, 45, 450, 30],
            fillColor: "#2E8B57",
            }
         ]
  };
  chartData.labels = labelize(data);
  let mapped = mapCategories(data);
  for (var key in mapped) {
    chartData.push(mapped[key])
  }
  chartConfig.datasets[0].data = chartData;
  return chartConfig;
}

module.exports = {
    budget: budget,
    mapAndRender: mapAndRender,
    populateChart: populateChart
}
