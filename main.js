'use strict';

let currencyRatio = {
  USD: {
    KRW: 1381.66,
    USD: 1,
    JPY: 156.8,
    unit: '달러',
    img: './img/us.png',
  },
  KRW: {
    KRW: 1,
    USD: 0.00072,
    JPY: 0.11,
    unit: '원',
    img: './img/kr.png',
  },
  JPY: {
    KRW: 8.81,
    USD: 0.0064,
    JPY: 1,
    unit: '엔',
    img: './img/jp.png',
  },
};

let fromCurrency = 'USD';
let toCurrency = 'USD';
let splitUnit = 10000;
let unitWords = ['', '만', '억', '조', '경'];

document.querySelectorAll('#from-currency-list a').forEach((menu) =>
  menu.addEventListener('click', function () {
    fromCurrency = this.textContent;
    // document.getElementById('from-button').textContent = this.textContent;
    document.getElementById(
      'from-button'
    ).innerHTML = `<img class='flag-img' src=${currencyRatio[fromCurrency].img}>${fromCurrency}`;
    console.log('fromcurrency는 ', fromCurrency);
    convert('from');
  })
);

document.querySelectorAll('#to-currency-list a').forEach((menu) => {
  menu.addEventListener('click', function () {
    toCurrency = this.textContent;
    // document.getElementById('to-button').textContent = this.textContent;
    document.getElementById(
      'to-button'
    ).innerHTML = `<img class='flag-img' src=${currencyRatio[toCurrency].img}>${toCurrency}`;
    console.log('tocurrency는 ', toCurrency);
    convert('from');
  });
});

function convert(type) {
  if (type === 'from') {
    let amount = document.getElementById('from-input').value;
    let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
    document.getElementById('to-input').value = convertedAmount;
    readKoreanNumber(amount, convertedAmount);
  } else {
    let amount = document.getElementById('to-input').value;
    let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];
    document.getElementById('from-input').value = convertedAmount;
    readKoreanNumber(convertedAmount, amount);
  }
}

function resultValue(num) {
  let resultArray = [];
  for (let i = 0; i < unitWords.length; i++) {
    let unitResult =
      (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) resultArray[i] = unitResult;
  }
  let resultString = '';
  for (let i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString = String(resultArray[i]) + unitWords[i] + resultString;
  }

  return resultString;
}

function readKoreanNumber(from, to) {
  document.getElementById('from-currency-type').textContent =
    resultValue(from) + currencyRatio[fromCurrency]['unit'];

  document.getElementById('to-currency-type').textContent =
    resultValue(to) + currencyRatio[toCurrency]['unit'];
}
