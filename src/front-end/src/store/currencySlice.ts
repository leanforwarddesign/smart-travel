import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CurrencyGraph, CostOfLivingManager } from '../utils/currency';

interface CurrencyState {
  graph: CurrencyGraph | null;
  costManager: CostOfLivingManager | null;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

const initialState: CurrencyState = {
  graph: null,
  costManager: null,
  loading: false,
  error: null,
  lastUpdated: null,
};

// Async thunk to load currency data from JSON
export const loadCurrencyData = createAsyncThunk(
  'currency/loadData',
  async (filePath: string = '/src/utils/currency-data.json') => {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error('Failed to load currency data');
    }
    const data = await response.json();
    return data;
  }
);

// Async thunk to load cost of living data from JSON
export const loadCostData = createAsyncThunk(
  'currency/loadCostData',
  async (filePath: string = '/src/utils/cost-of-living-data.json') => {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error('Failed to load cost data');
    }
    const data = await response.json();
    return data;
  }
);

// Async thunk to fetch live exchange rates (example with exchangerate-api)
export const fetchLiveRates = createAsyncThunk(
  'currency/fetchLiveRates',
  async (baseCurrency: string = 'USD') => {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
    if (!response.ok) {
      throw new Error('Failed to fetch live rates');
    }
    const data = await response.json();
    return { rates: data.rates, timestamp: Date.now() };
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    // Initialize graph manually
    initializeGraph: (state: any) => {
      state.graph = new CurrencyGraph() as any;
      state.costManager = new CostOfLivingManager() as any;
      state.lastUpdated = Date.now();
    },
    
    // Add a currency to the graph
    addCurrency: (state: any, action: PayloadAction<{
      code: string;
      name: string;
      country: string;
      decimalPlaces: number;
    }>) => {
      if (state.graph) {
        const { code, name, country, decimalPlaces } = action.payload;
        (state.graph as any).addCurrency(code, name, country, decimalPlaces);
      }
    },
    
    // Add country costs
    addCountryCosts: (state: any, action: PayloadAction<{
      countryCode: string;
      currency: string;
      costs: any;
    }>) => {
      if (state.costManager) {
        const { countryCode, currency, costs } = action.payload;
        (state.costManager as any).addCountryCosts(countryCode, currency, costs);
      }
    },
    
    // Add an exchange rate
    addExchangeRate: (state: any, action: PayloadAction<{
      from: string;
      to: string;
      rate: number;
      timestamp?: number;
    }>) => {
      if (state.graph) {
        const { from, to, rate, timestamp } = action.payload;
        (state.graph as any).addExchangeRate(from, to, rate, timestamp);
        state.lastUpdated = Date.now();
      }
    },
    
    // Update an existing exchange rate
    updateExchangeRate: (state: any, action: PayloadAction<{
      from: string;
      to: string;
      rate: number;
      timestamp?: number;
    }>) => {
      if (state.graph) {
        const { from, to, rate, timestamp } = action.payload;
        (state.graph as any).updateExchangeRate(from, to, rate, timestamp);
        state.lastUpdated = Date.now();
      }
    },
    
    // Clear error
    clearError: (state: any) => {
      state.error = null;
    },
  },
  extraReducers: (builder: any) => {
    builder
      // Load currency data
      .addCase(loadCurrencyData.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCurrencyData.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.graph = CurrencyGraph.fromJSON(action.payload) as any;
        state.lastUpdated = Date.now();
      })
      .addCase(loadCurrencyData.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load currency data';
      })
      // Load cost data
      .addCase(loadCostData.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCostData.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.costManager = CostOfLivingManager.fromJSON(action.payload) as any;
      })
      .addCase(loadCostData.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load cost data';
      })
      // Fetch live rates
      .addCase(fetchLiveRates.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLiveRates.fulfilled, (state: any, action: any) => {
        state.loading = false;
        if (state.graph) {
          const { rates, timestamp } = action.payload;
          // Update all rates for the base currency
          Object.entries(rates).forEach(([currency, rate]) => {
            if ((state.graph as any).currencies.has(currency)) {
              (state.graph as any).updateExchangeRate('USD', currency, rate as number, timestamp);
            }
          });
          state.lastUpdated = timestamp;
        }
      })
      .addCase(fetchLiveRates.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch live rates';
      });
  },
});

export const {
  initializeGraph,
  addCurrency,
  addCountryCosts,
  addExchangeRate,
  updateExchangeRate,
  clearError,
} = currencySlice.actions;

export default currencySlice.reducer;
