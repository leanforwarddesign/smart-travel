import React, { useEffect } from "react";
import { HomepageMvp } from "./components/screens/homepage_mockup/homepage_mockup";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { loadCurrencyData, loadCostData } from "./store/currencySlice";
import { Provider } from "@/components/ui/provider"


const App = () => {
    const dispatch = useAppDispatch();
    const { graph, costManager, loading, error, lastUpdated } = useAppSelector((state) => state.currency);

    useEffect(() => {
    // Load currency data when component mounts
        dispatch(loadCurrencyData('/src/utils/currency-data.json'));
        dispatch(loadCostData('src/utils/cost-of-living-data.json'));
    }, []);

    useEffect(() => {
    console.log('Graph updated:', graph);
    console.log('Loading state:', loading);
    console.log('Error state:', error);
    console.log('Last updated:', lastUpdated);
    console.log('Cost Manager:', costManager);
    }, [graph, costManager, loading, error, lastUpdated]);

    return (
        <Provider>
            <HomepageMvp />
        </Provider>
    );
};

export default App;
