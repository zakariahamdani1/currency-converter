import React, {useState, useEffect} from "react";

function Currency() {
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [amount, setAmount] = useState(0);
    const [result, setResult] = useState(null);
    const [rates, setRates] = useState({});
    
    let API_key = "your API key" // copy your API key here  

    useEffect(() => {
        fetch(`https://v6.exchangerate-api.com/v6/${API_key}/latest/USD`)
            .then(res => res.json())
            .then(data => {
                setCurrencies(Object.keys(data.conversion_rates));
                setRates(data.conversion_rates);
            })
            .catch(err => console.error(err));
    }, []);

    const handleConvert = () => {
        const rateFrom = rates[fromCurrency];
        const rateTo = rates[toCurrency];

        const result = (amount / rateFrom) * rateTo;
        setResult(result.toFixed(2));
    };


    return(
        <div>
            <h1>Currency Converter</h1>
            <input type="number" min={0} placeholder="Enter the amount / أدخل المبلغ" onChange={(e) => setAmount(e.target.value)}/>

            <label htmlFor="from">
                <span>From: </span>
                <select name="from" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                    {currencies.map(cur => (<option key={cur} value={cur}>{cur}</option>))}
                </select>
            </label>
            
            <label htmlFor="to">
                <span>To: </span> 
                <select name="to" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                    {currencies.map(cur => (<option key={cur} value={cur}>{cur}</option>))}
                </select>
            </label>
            

            <button onClick={handleConvert}>Convert</button>
            {result && <p>Result: {result}</p>}
            
        </div>
    );
}

export default Currency;