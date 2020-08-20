import React from 'react'
// import './currenceyCon.css'

function currencycon(props) {
    const {
        currencyOption,
        selectedCurrency,
        onChangeCurrency,
        amount,
        onChangeAmount,
    } = props

    return (
        <div>
             {/* <title>{props.Title}</title> */}
           <input type="number" className="input" value={amount} onChange={onChangeAmount} />
           <select value={selectedCurrency} onChange={onChangeCurrency}>
               {currencyOption.map(option => (
                   <option key={option} value={option}>{option}</option>
               ))}
               <option value="hi">Hi</option>
           </select>
        </div>
    )
}

export default currencycon

