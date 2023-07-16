'use strict';

function StateForDom() {
  this.startTimeOpening = 6;
  this.timeShopCloses = 19;
  this.main = document.querySelector('main');
  this.table = document.createElement('table');
  this.thead = document.createElement('thead');
  this.theadRow = document.createElement('tr');
  this.form = document.querySelector('form');
  this.form.addEventListener('submit', addLocationForm);
  this.cities = [];
}

function City(name, minCust, maxCust, avgSales) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgSales = avgSales;
  this.totalSales = 0;
  this.hourlySalesArray = [];
}

City.prototype.hourlySales = function () {
  return Math.ceil(
    Math.random() * (this.maxCust - this.minCust) + this.minCust,
  );
};

StateForDom.prototype.addTableToDom = function () {
  this.main.appendChild(this.table);
  this.table.appendChild(this.thead);
  this.thead.appendChild(this.theadRow);
};

StateForDom.prototype.createHeader = function () {
  const thCities = document.createElement('th');
  const thTotal = document.createElement('th');
  thCities.innerText = 'Cities';
  thTotal.innerText = 'Total';
  this.theadRow.appendChild(thCities);

  for (let i = this.startTimeOpening; i < this.timeShopCloses + 1; i++) {
    const th = document.createElement('th');
    if (i < 13) {
      th.innerText = i + 'AM';
    } else {
      th.innerText = i - 12 + 'PM';
    }

    this.theadRow.appendChild(th);
  }

  this.theadRow.appendChild(thTotal);
};

StateForDom.prototype.addCitiesToDom = function () {
  for (let i = 0; i < this.cities.length; i++) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.innerText = this.cities[i].name;
    tr.appendChild(td);
    let hourlyTotals = 0;
    for (let j = 0; j < this.timeShopCloses - this.startTimeOpening + 1; j++) {
      const td = document.createElement('td');
      const hourlySales = this.cities[i].hourlySales();
      td.innerText = hourlySales;
      this.cities[i].hourlySalesArray.push(hourlySales);
      tr.appendChild(td);
      hourlyTotals += hourlySales;
    }
    const tdTotal = document.createElement('td');
    tdTotal.innerText = hourlyTotals;
    this.cities[i].totalSales += hourlyTotals;
    tr.appendChild(tdTotal);
    this.table.appendChild(tr);
  }
};

StateForDom.prototype.addOneCityToDom = function () {
  let cityToAddIndex = this.cities.length - 1;
  this.main.appendChild(this.cities[cityToAddIndex]);
};

StateForDom.prototype.createFooter = function () {
  const oldTfoot = document.querySelector('tfoot');
  if (oldTfoot) {
    oldTfoot.remove();
  }

  const tfoot = document.createElement('tfoot');
  const td = document.createElement('td');
  td.innerText = 'Totals';
  const totalOfTotals = Array(14).fill(0);
  tfoot.appendChild(td);
  for (let i = 0; i < this.cities.length - 1; i++) {
    for (let j = 0; j < 14; j++) {
      totalOfTotals[j] += this.cities[i].hourlySalesArray[j];
    }
  }
  let finalTotal = 0;
  for (let i = 0; i < 14; i++) {
    finalTotal += totalOfTotals[i];
    const td = document.createElement('td');
    td.innerText = totalOfTotals[i];
    tfoot.appendChild(td);
  }
  if (finalTotal > 0) {
    let td = document.createElement('td');
    td.innerText = finalTotal;
    tfoot.appendChild(td);
  }
  this.table.appendChild(tfoot);
};

StateForDom.prototype.addNewCityToDOM = function () {
  //
};

let seattle = new City('Seattle', 23, 65, 6.3);
let tokyo = new City('Tokyo', 3, 24, 1.2);
let dubai = new City('Dubai', 11, 38, 3.7);
let paris = new City('Paris', 2, 16, 4.6);
let lima = new City('Lima', 2, 16, 4.6);

let stateForDom = new StateForDom();
stateForDom.cities.push(seattle, tokyo, dubai, paris, lima);
stateForDom.createHeader();
stateForDom.addTableToDom();
stateForDom.addCitiesToDom();
stateForDom.createFooter();

function addLocationForm(e) {
  e.preventDefault();
  const location = e.target.location.value;
  const maxCust = e.target['max-cust'].value;
  const minCust = e.target['min-cust'].value;
  const avgSales = e.target['avg-sales'].value;
  const newCity = new City(location, minCust, maxCust, avgSales);
  stateForDom.cities.push(newCity);
  stateForDom.createFooter();
}
