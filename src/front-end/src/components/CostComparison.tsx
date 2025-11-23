import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadCurrencyData, loadCostData } from '../store/currencySlice';

export const CostComparison = () => {
  const dispatch = useAppDispatch();
  const { graph, costManager, loading, error } = useAppSelector((state) => state.currency);
  const [comparison, setComparison] = useState<any>(null);
  const [tripComparison, setTripComparison] = useState<any>(null);

  useEffect(() => {
    // Load both currency and cost data
    dispatch(loadCurrencyData('/src/utils/currency-data.json'));
    dispatch(loadCostData('/src/utils/cost-of-living-data.json'));
  }, [dispatch]);

  const handleCompareCosts = () => {
    if (costManager && graph) {
      const result = (costManager as any).compareCosts('USA', 'EU', graph);
      setComparison(result);
    }
  };

  const handleCompareTrips = () => {
    if (costManager && graph) {
      const result = (costManager as any).compareTrips('USA', 'EU', 7, 'moderate', graph);
      setTripComparison(result);
    }
  };

  const getDailyBudget = (countryCode: string, style: string) => {
    if (!costManager) return null;
    return (costManager as any).getDailyBudget(countryCode, style);
  };

  if (loading) {
    return <div className="p-4">Loading cost data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold">Cost of Living Comparison</h2>

      {costManager && (
        <div className="space-y-4">
          {/* Daily Budgets */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">Daily Budgets by Travel Style</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['USA', 'EU', 'UK', 'Japan'].map((country) => (
                <div key={country} className="border p-3 rounded">
                  <h4 className="font-semibold mb-2">{country}</h4>
                  <div className="space-y-1 text-sm">
                    <p>Budget: ${getDailyBudget(country, 'budget')?.toFixed(2)}</p>
                    <p>Moderate: ${getDailyBudget(country, 'moderate')?.toFixed(2)}</p>
                    <p>Luxury: ${getDailyBudget(country, 'luxury')?.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compare Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleCompareCosts}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Compare USA vs EU Costs
            </button>
            <button
              onClick={handleCompareTrips}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Compare 7-Day Trips
            </button>
          </div>

          {/* Cost Category Comparison */}
          {comparison && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">
                Cost Category Comparison: USA vs EU
              </h3>
              <div className="space-y-2">
                {Object.entries(comparison.percentageDifference).map(([category, diff]: [string, any]) => (
                  <div key={category} className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium capitalize">{category}</span>
                    <span className={`font-semibold ${diff > 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {diff > 0 ? '+' : ''}{diff.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm text-gray-600">
                USA: ${comparison.country1.costs.food} food/day in {comparison.country1.currency}
                <br />
                EU: €{(costManager as any).getCountryCosts('EU').costs.food} food/day in EUR
              </p>
            </div>
          )}

          {/* Trip Comparison */}
          {tripComparison && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">
                7-Day Trip Comparison (Moderate Style)
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="border p-3 rounded">
                  <h4 className="font-semibold text-blue-600">USA</h4>
                  <p>Daily: ${tripComparison.trip1.dailyBudget.toFixed(2)}</p>
                  <p className="text-xl font-bold">
                    Total: ${tripComparison.trip1.totalCost.toFixed(2)}
                  </p>
                </div>
                <div className="border p-3 rounded">
                  <h4 className="font-semibold text-green-600">EU</h4>
                  <p>Daily: ${tripComparison.trip2.dailyBudget.toFixed(2)}</p>
                  <p className="text-xl font-bold">
                    Total: ${tripComparison.trip2.totalCost.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-lg">
                  <strong>{tripComparison.cheaperCountry}</strong> is cheaper by{' '}
                  <span className="text-green-600 font-semibold">
                    ${Math.abs(tripComparison.savings).toFixed(2)}
                  </span>{' '}
                  ({Math.abs(tripComparison.percentageDifference).toFixed(1)}% less)
                </p>
              </div>
            </div>
          )}

          {/* All Countries Overview */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">All Countries Overview</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Country
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Currency
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Food
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Transport
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Accommodation
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Entertainment
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(costManager as any).getAllCountries().map((country: any) => (
                    <tr key={country.code}>
                      <td className="px-3 py-2 whitespace-nowrap font-medium">{country.countryCode}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{country.currency}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{country.costs.food}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{country.costs.transportation}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{country.costs.accommodation}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{country.costs.entertainment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
