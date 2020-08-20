import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import CurrencyCon from './currencycon';


const BASE_URL = 'https://api.ratesapi.io/api/latest'


function App() {
const [currencyOption, setCurrencyOption] = useState([])
const [fromCurrency, setFromCurrency] = useState()
const [toCurrency, setToCurrency] = useState()
const [exchangeRates, setExchangeRates] = useState()
const [amount, setAmount] = useState(1)
const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

let toAmount, fromAmount 
if (amountInFromCurrency) {
  fromAmount = amount
  toAmount = amount * exchangeRates
} else {
  toAmount = amount
  fromAmount = amount / exchangeRates
}

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOption([data.base, ...Object.keys(data.rates)])
        setFromCurrency(firstCurrency);
        setToCurrency(firstCurrency);
        setExchangeRates(data.rates[firstCurrency]);
      })
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRates(data.rates[toCurrency]))
    }  
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <>
      <h1>Convert</h1>
        <CurrencyCon 
        currencyOption ={currencyOption}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
        />
        <div className="equals">=</div>
        <CurrencyCon 
        currencyOption ={currencyOption}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
        />
    </>
  );
}

export default App;
