import React, { useState, useEffect } from 'react';
import "./App.css"
function App() {
  const [etfs, setETFs] = useState([
    { symbol: 'MSFT', name: 'Microsoft', price: null },
    { symbol: 'AAPL', name: 'Apple', price: null },
    { symbol: 'NVDA', name: 'NVIDIA', price: null },
    { symbol: 'AMZN', name: 'AMAZON', price: null },
    { symbol: 'META', name: 'Meta', price: null },
    { symbol: 'GOOGL', name: 'Alphabet', price: null },
    { symbol: 'BRK.B', name: 'Berkshire_Hathaway', price: null },
    { symbol: 'LLY', name: 'Eli Lilly Co_', price: null },
    { symbol: 'AVGO', name: 'Broadcom Inc', price: null },
    { symbol: 'TSLA', name: 'Tesla Inc', price: null },
  ]);

  const API_KEY = 'X8LYCMTCQZSIWCRS.';

  const fetchETFPrices = async () => {
    try {
      const requests = etfs.map(async (etf) => {
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${etf.symbol}&apikey=${API_KEY}`);
        const data = await response.json();
        // Check if the response contains an error message
      if (data['Error Message']) {
        throw new Error(data['Error Message']);
      }

        const latestPrice = data['Global Quote']['05. price'];
        return { ...etf, price: latestPrice };
      });
      const updatedETFs = await Promise.all(requests);
      setETFs(updatedETFs);
    } catch (error) {
      console.error('Error fetching ETF prices:', error);
    }
  };

  useEffect(() => {
    fetchETFPrices();
  }, []);

  return (
    <div className="App">
  
      <h1>S&P 500 Stock Prices</h1>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {etfs.map((etf) => (
            <tr key={etf.symbol}>
              <td>{etf.symbol}</td>
              <td>{etf.name}</td>
              <td>{etf.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;