

class Currency {
  constructor(name, country, decimalPlaces) {
    this.name = name;
    this.country = country;
    this.decimalPlaces = decimalPlaces;
  }
}

class ExchangeRate {
  constructor(fromCurrency, toCurrency, rate, timestamp = Date.now()) {
    this.fromCurrency = fromCurrency;
    this.toCurrency = toCurrency;
    this.rate = rate;
    this.timestamp = timestamp;
  }

  getInverseRate() {
    return 1 / this.rate;
  }
}

class CurrencyGraph {
  constructor() {
    this.currencies = new Map(); // currency code -> Currency object
    this.adjacencyList = new Map(); // currency code -> array of {to, rate, timestamp}
  }

  addCurrency(code, name, country, decimalPlaces) {
    if (!this.currencies.has(code)) {
      const currency = new Currency(name, country, decimalPlaces);
      this.currencies.set(code, currency);
      this.adjacencyList.set(code, []);
    }
    return this.currencies.get(code);
  }

  addExchangeRate(fromCode, toCode, rate, timestamp = Date.now()) {
    // Ensure both currencies exist
    if (!this.currencies.has(fromCode) || !this.currencies.has(toCode)) {
      throw new Error('Both currencies must be added before creating an exchange rate');
    }

    // Add directed edge
    this.adjacencyList.get(fromCode).push({
      to: toCode,
      rate: rate,
      timestamp: timestamp
    });

    // Optionally add reverse edge with inverse rate
    this.adjacencyList.get(toCode).push({
      to: fromCode,
      rate: 1 / rate,
      timestamp: timestamp
    });
  }

  getDirectRate(fromCode, toCode) {
    const edges = this.adjacencyList.get(fromCode);
    if (!edges) return null;

    const edge = edges.find(e => e.to === toCode);
    return edge ? edge.rate : null;
  }

  // Find exchange rate path using BFS (Breadth-First Search)
  findExchangePath(fromCode, toCode) {
    if (fromCode === toCode) return { rate: 1, path: [fromCode] };

    const queue = [{ code: fromCode, rate: 1, path: [fromCode] }];
    const visited = new Set([fromCode]);

    while (queue.length > 0) {
      const { code, rate, path } = queue.shift();

      const edges = this.adjacencyList.get(code) || [];
      for (const edge of edges) {
        if (edge.to === toCode) {
          return {
            rate: rate * edge.rate,
            path: [...path, edge.to]
          };
        }

        if (!visited.has(edge.to)) {
          visited.add(edge.to);
          queue.push({
            code: edge.to,
            rate: rate * edge.rate,
            path: [...path, edge.to]
          });
        }
      }
    }

    return null; // No path found
  }

  convert(amount, fromCode, toCode) {
    const result = this.findExchangePath(fromCode, toCode);
    if (!result) {
      throw new Error(`No exchange path found from ${fromCode} to ${toCode}`);
    }

    return {
      amount: amount * result.rate,
      rate: result.rate,
      path: result.path
    };
  }

  // Get all currencies connected to a given currency
  getConnectedCurrencies(code) {
    const edges = this.adjacencyList.get(code);
    if (!edges) return [];

    return edges.map(edge => ({
      code: edge.to,
      currency: this.currencies.get(edge.to),
      rate: edge.rate,
      timestamp: edge.timestamp
    }));
  }

  // Get all currencies in the graph
  getAllCurrencies() {
    return Array.from(this.currencies.entries()).map(([code, currency]) => ({
      code,
      ...currency
    }));
  }

  // Remove outdated exchange rates (older than specified time)
  pruneOldRates(maxAge = 24 * 60 * 60 * 1000) { // default 24 hours
    const now = Date.now();
    
    for (const [code, edges] of this.adjacencyList.entries()) {
      this.adjacencyList.set(
        code,
        edges.filter(edge => now - edge.timestamp < maxAge)
      );
    }
  }

  // Update existing exchange rate
  updateExchangeRate(fromCode, toCode, newRate, timestamp = Date.now()) {
    const edges = this.adjacencyList.get(fromCode);
    if (!edges) return false;

    const edgeIndex = edges.findIndex(e => e.to === toCode);
    if (edgeIndex !== -1) {
      edges[edgeIndex].rate = newRate;
      edges[edgeIndex].timestamp = timestamp;

      // Update reverse edge
      const reverseEdges = this.adjacencyList.get(toCode);
      const reverseIndex = reverseEdges.findIndex(e => e.to === fromCode);
      if (reverseIndex !== -1) {
        reverseEdges[reverseIndex].rate = 1 / newRate;
        reverseEdges[reverseIndex].timestamp = timestamp;
      }

      return true;
    }

    return false;
  }

  // Export graph to JSON format
  toJSON() {
    const currencies = [];
    const exchangeRates = [];
    const processedPairs = new Set();

    // Export currencies
    for (const [code, currency] of this.currencies.entries()) {
      currencies.push({
        code: code,
        name: currency.name,
        country: currency.country,
        decimalPlaces: currency.decimalPlaces
      });
    }

    // Export exchange rates (avoid duplicates from bidirectional edges)
    for (const [fromCode, edges] of this.adjacencyList.entries()) {
      for (const edge of edges) {
        const pairKey = [fromCode, edge.to].sort().join('-');
        
        if (!processedPairs.has(pairKey)) {
          processedPairs.add(pairKey);
          exchangeRates.push({
            from: fromCode,
            to: edge.to,
            rate: edge.rate,
            timestamp: edge.timestamp
          });
        }
      }
    }

    return {
      currencies,
      exchangeRates
    };
  }

  // Load graph from JSON
  static fromJSON(jsonData) {
    const graph = new CurrencyGraph();

    // Load currencies
    if (jsonData.currencies) {
      for (const curr of jsonData.currencies) {
        graph.addCurrency(curr.code, curr.name, curr.country, curr.decimalPlaces);
      }
    }

    // Load exchange rates
    if (jsonData.exchangeRates) {
      for (const rate of jsonData.exchangeRates) {
        graph.addExchangeRate(rate.from, rate.to, rate.rate, rate.timestamp);
      }
    }

    return graph;
  }

  // Save to JSON file (for Node.js environments)
  async saveToFile(filePath) {
    const fs = await import('fs/promises');
    const jsonData = this.toJSON();
    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));
  }

  // Load from JSON file (for Node.js environments)
  static async loadFromFile(filePath) {
    const fs = await import('fs/promises');
    const data = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(data);
    return CurrencyGraph.fromJSON(jsonData);
  }
}

class CostOfLivingManager {
  constructor() {
    this.countryCosts = new Map(); // country code -> costs data
  }

  // Add or update country costs
  addCountryCosts(countryCode, currency, costs, timestamp = Date.now()) {
    const existingCosts = this.countryCosts.get(countryCode);
    
    const defaultCosts = {
      food: 0,
      transportation: 0,
      accommodation: 0,
      entertainment: 0,
      utilities: 0
    };

    this.countryCosts.set(countryCode, {
      countryCode,
      currency,
      costs: { ...defaultCosts, ...existingCosts?.costs, ...costs },
      lastUpdated: timestamp
    });
  }

  // Get costs for a specific country
  getCountryCosts(countryCode) {
    return this.countryCosts.get(countryCode) || null;
  }

  // Get costs in a different currency
  getCountryCostsInCurrency(countryCode, targetCurrency, currencyGraph) {
    const costs = this.getCountryCosts(countryCode);
    console.log(this.countryCosts);
    console.log("Costs for", countryCode, ":", costs);
    if (!costs) return null;

    if (costs.currency === targetCurrency) return costs;

    // Convert all costs to target currency
    const conversionResult = currencyGraph.findExchangePath(costs.currency, targetCurrency);
    console.log("Conversion Result:", conversionResult);
    if (!conversionResult) return null;

    const convertedCosts = {
      food: costs.costs.food * conversionResult.rate,
      transportation: costs.costs.transportation * conversionResult.rate,
      accommodation: costs.costs.accommodation * conversionResult.rate,
      entertainment: costs.costs.entertainment * conversionResult.rate,
      utilities: costs.costs.utilities * conversionResult.rate
    };

    return {
      countryCode: costs.countryCode,
      currency: targetCurrency,
      costs: convertedCosts,
      lastUpdated: costs.lastUpdated
    };
  }

  // Compare costs between two countries
  compareCosts(country1, country2, currencyGraph) {
    const costs1 = this.getCountryCosts(country1);
    const costs2 = this.getCountryCosts(country2);

    if (!costs1 || !costs2) return null;

    // Convert country2 costs to country1's currency for comparison
    const costs2Converted = this.getCountryCostsInCurrency(
      country2,
      costs1.currency,
      currencyGraph
    );

    if (!costs2Converted) return null;

    const percentageDifference = {};
    for (const key of Object.keys(costs1.costs)) {
      const diff = ((costs2Converted.costs[key] - costs1.costs[key]) / costs1.costs[key]) * 100;
      percentageDifference[key] = diff;
    }

    return {
      country1: costs1,
      country2: costs2Converted,
      percentageDifference
    };
  }

  // Get average daily budget for a country
  getDailyBudget(countryCode, style = 'moderate') {
    const costs = this.getCountryCosts(countryCode);
    if (!costs) return null;

    const multipliers = {
      budget: 0.5,
      moderate: 1,
      luxury: 2.5
    };

    const multiplier = multipliers[style] || 1;
    
    return (
      costs.costs.food * multiplier +
      costs.costs.transportation * multiplier +
      costs.costs.accommodation * multiplier +
      costs.costs.entertainment * multiplier
    );
  }

  // Get trip cost estimate
  getTripCost(countryCode, days, style = 'moderate') {
    const dailyBudget = this.getDailyBudget(countryCode, style);
    if (!dailyBudget) return null;

    return {
      dailyBudget,
      totalCost: dailyBudget * days,
      days,
      style,
      countryCode
    };
  }

  // Compare trip costs between countries
  compareTrips(country1, country2, days, style, currencyGraph) {
    const trip1 = this.getTripCost(country1, days, style);
    const trip2 = this.getTripCost(country2, days, style);

    if (!trip1 || !trip2) return null;

    const costs1 = this.getCountryCosts(country1);
    const costs2InCurrency1 = this.getCountryCostsInCurrency(
      country2,
      costs1.currency,
      currencyGraph
    );

    if (!costs2InCurrency1) return null;

    const trip2Converted = {
      dailyBudget: this.getDailyBudgetFromCosts(costs2InCurrency1.costs, style),
      totalCost: this.getDailyBudgetFromCosts(costs2InCurrency1.costs, style) * days,
      days,
      style,
      countryCode: country2
    };

    const savings = trip1.totalCost - trip2Converted.totalCost;
    const percentageDifference = ((trip2Converted.totalCost - trip1.totalCost) / trip1.totalCost) * 100;

    return {
      trip1,
      trip2: trip2Converted,
      currency: costs1.currency,
      savings,
      percentageDifference,
      cheaperCountry: savings > 0 ? country2 : country1
    };
  }

  getDailyBudgetFromCosts(costs, style = 'moderate') {
    const multipliers = {
      budget: 0.5,
      moderate: 1,
      luxury: 2.5
    };

    const multiplier = multipliers[style] || 1;
    
    return (
      costs.food * multiplier +
      costs.transportation * multiplier +
      costs.accommodation * multiplier +
      costs.entertainment * multiplier
    );
  }

  // Get all countries with cost data
  getAllCountries() {
    return Array.from(this.countryCosts.entries()).map(([code, data]) => ({
      code,
      ...data
    }));
  }

  // Export to JSON
  toJSON() {
    return {
      countryCosts: Array.from(this.countryCosts.entries()).map(([code, data]) => ({
        countryCode: code,
        currency: data.currency,
        costs: data.costs,
        lastUpdated: data.lastUpdated
      }))
    };
  }

  // Load from JSON
  static fromJSON(jsonData) {
    const manager = new CostOfLivingManager();
    
    if (jsonData.countryCosts) {
      for (const country of jsonData.countryCosts) {
        manager.addCountryCosts(
          country.countryCode,
          country.currency,
          country.costs,
          country.lastUpdated
        );
      }
    }

    return manager;
  }

  // Load from JSON file (for Node.js environments)
  static async loadFromFile(filePath) {
    const fs = await import('fs/promises');
    const data = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(data);
    return CostOfLivingManager.fromJSON(jsonData);
  }
}

export { Currency, ExchangeRate, CurrencyGraph, CostOfLivingManager };