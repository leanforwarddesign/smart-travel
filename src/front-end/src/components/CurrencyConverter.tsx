import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadCurrencyData, addExchangeRate } from '../store/currencySlice';

export const CurrencyConverter = () => {
  const dispatch = useAppDispatch();
  const { graph, loading, error, lastUpdated } = useAppSelector((state) => state.currency);

  useEffect(() => {
    // Load currency data when component mounts
    dispatch(loadCurrencyData('/src/utils/currency-data.json'));
  }, [dispatch]);

  const handleConvert = () => {
    if (graph) {
      try {
        // Example: Convert 100 USD to EUR
        const result = (graph as any).convert(100, 'USD', 'EUR');
        console.log('Conversion result:', result);
        alert(`100 USD = ${result.amount.toFixed(2)} EUR\nPath: ${result.path.join(' → ')}`);
      } catch (err) {
        console.error('Conversion error:', err);
        alert('Could not convert currencies');
      }
    }
  };

  const handleAddRate = () => {
    // Example: Add a new exchange rate
    dispatch(addExchangeRate({
      from: 'USD',
      to: 'MXN',
      rate: 17.5,
      timestamp: Date.now()
    }));
    alert('Added USD to MXN exchange rate');
  };

  if (loading) {
    return <div className="p-4">Loading currency data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Currency Converter</h2>
      
      {lastUpdated && (
        <p className="text-sm text-gray-600">
          Last updated: {new Date(lastUpdated).toLocaleString()}
        </p>
      )}

      {graph && (
        <div className="space-y-2">
          <p>Total currencies loaded: {(graph as any).currencies.size}</p>
          
          <div className="flex gap-2">
            <button 
              onClick={handleConvert}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Convert 100 USD to EUR
            </button>
            
            <button 
              onClick={handleAddRate}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add USD/MXN Rate
            </button>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Available Currencies:</h3>
            <div className="grid grid-cols-2 gap-2">
              {(() => {
                const entries = Array.from((graph as any).currencies.entries()) as Array<[string, any]>;
                return entries.map(([code, currency]) => (
                  <div key={code} className="p-2 border rounded">
                    <strong>{code}</strong> - {currency.name}
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
