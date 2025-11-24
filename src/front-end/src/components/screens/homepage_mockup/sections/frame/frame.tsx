import React, { useState, useEffect } from "react";
import { Badge } from "../../../../ui/badge.tsx";
import { Button } from "../../../../ui/Button.tsx";
import { Card, CardContent, CardFooter } from "../../../../ui/card.tsx";
import { DropDown } from "../../../../ui/dropdown/DropDown.tsx";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { loadCurrencyData, loadCostData } from "../../../../../store/currencySlice";
import { CurrencyInput } from "../../../../ui/CurrencyInput.tsx";
import { Button as ChakraButton } from "@chakra-ui/react";

export const FrameByAnima = () => {
    const dispatch = useAppDispatch();
    const { graph, costManager } = useAppSelector((state) => state.currency);
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [selectedRefCountry, setSelectedRefCountry] = useState<string>("");
    const [countries, setCountries] = useState<Array<{ code: string; country: string; currency: string }>>([]);
    const [selectedAmount, setSelectedAmount] = useState<number | undefined>("");
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
    const [exchangeRate, setExchangeRate] = useState<number | null>(null);
    const [calculationError, setCalculationError] = useState<string>("");
    const [pppComparison, setPppComparison] = useState<any>(null);
    const [cityStatsData, setCityStatsData] = useState<any>(null);
    const [currentCityStats, setCurrentCityStats] = useState<any>(null);

    // Check if all fields are filled
    const isFormValid = selectedCountry && selectedRefCountry && selectedAmount && Number(selectedAmount) > 0;

    useEffect(() => {
        // Load currency data when component mounts
        dispatch(loadCurrencyData('/src/utils/currency-data.json'));
    }, [dispatch]);

    useEffect(() => {
        // Load cost of living data
        if (graph) {
            dispatch(loadCostData('/src/utils/cost-of-living-data.json'));
        }
    }, [graph, dispatch]);

    useEffect(() => {
        // Update countries list when graph is loaded
        if (graph) {
            const countryList = Array.from((graph as any).currencies.entries()).map(
                ([code, currency]: [string, any]) => ({
                    code,
                    country: currency.country,
                    currency: currency.name
                })
            );
            setCountries(countryList);
            if (countryList.length > 0 && !selectedCountry) {
                setSelectedCountry(countryList[0].code);
            }
        }
    }, [graph]);

    useEffect(() => {
        // Load city stats data
        fetch('/src/utils/city-stats-data.json')
            .then(response => response.json())
            .then(data => setCityStatsData(data))
            .catch(error => console.error('Error loading city stats:', error));
    }, []);

    useEffect(() => {
        // Update current city stats when destination country changes
        if (cityStatsData && selectedRefCountry && graph) {
            const countryName = getCountryCodeFromCurrency(selectedRefCountry);
            const stats = cityStatsData.cityStats.find(
                (stat: any) => stat.countryCode === countryName
            );
            
            if (stats && costManager) {
                // Get cost data for both countries
                const homeCostData = (costManager as any).getCountryCosts(getCountryCodeFromCurrency(selectedCountry));
                const destCostData = (costManager as any).getCountryCosts(countryName);
                
                if (homeCostData && destCostData && selectedCountry && selectedRefCountry) {
                    // Convert destination costs to home currency for display
                    const destCostsConverted = (costManager as any).getCountryCostsInCurrency(
                        countryName,
                        selectedCountry,
                        graph
                    );

                    if (destCostsConverted) {
                        const homeTotalCost = Object.values(homeCostData.costs).reduce((a: any, b: any) => a + b, 0) as number;
                        const destTotalCost = Object.values(destCostsConverted.costs).reduce((a: any, b: any) => a + b, 0) as number;

                        // Calculate weekly costs (assuming monthly data)
                        const homeWeeklyCost = (homeTotalCost / 4).toFixed(0);
                        const destWeeklyCost = (destTotalCost / 4).toFixed(0);

                        setCurrentCityStats({
                            ...stats,
                            locations: [
                                {
                                    ...stats.locations[0],
                                    cost: `${selectedCountry} ${homeWeeklyCost}/Week`
                                },
                                {
                                    ...stats.locations[1],
                                    cost: `${selectedRefCountry} ${destWeeklyCost}/Week`
                                }
                            ]
                        });
                    }
                }
            } else {
                setCurrentCityStats(stats || null);
            }
        }
    }, [cityStatsData, selectedRefCountry, selectedCountry, costManager, graph]);

    const getCountryCodeFromCurrency = (currencyCode: string) => {
        if (!graph) return null;

        console.log("Graph object:", currencyCode);
            console.log(graph);
        console.log("Graph currencies:", (graph as any).currencies);
        const currencies = (graph as any).currencies;
        const obj = currencies.get(currencyCode);  
        console.log("Currency object:", obj);     
        if (obj) {
            return obj.country;
        }
        return null;
    };

    const handleCalculate = () => {
        setCalculationError("");
        setConvertedAmount(null);
        setExchangeRate(null);
        setPppComparison(null);

        if (!graph || !selectedCountry || !selectedRefCountry || !selectedAmount) {
            setCalculationError("Please fill all fields");
            return;
        }

        try {
            // Convert currency using the graph
            const amount = Number(selectedAmount);
            const result = (graph as any).convert(amount, selectedCountry, selectedRefCountry);
            
            if (!result) {
                setCalculationError("Unable to convert between these currencies");
                return;
            }

            setConvertedAmount(result.amount);
            setExchangeRate(result.rate);

            // Calculate PPP if cost data is available
            console.log("Cost Manager:", costManager);
            console.log("Selected Country:", selectedCountry);
            console.log("Selected Reference Country:", selectedRefCountry);
            const countrCode = getCountryCodeFromCurrency(selectedCountry);
            const refCountryCode = getCountryCodeFromCurrency(selectedRefCountry);
            console.log("Country Code:", countrCode);
            console.log("Reference Country Code:", refCountryCode);

            if (costManager) {
                const homeCosts = (costManager as any).getCountryCosts(countrCode);
                const destCosts = (costManager as any).getCountryCosts(refCountryCode);
                console.log("Home Costs:", homeCosts);
                console.log("Destination Costs:", destCosts);
                if (homeCosts && destCosts) {
                    // Get destination costs in home currency for comparison
                    const destCostsConverted = (costManager as any).getCountryCostsInCurrency(
                        refCountryCode,
                        selectedCountry,
                        graph
                    );

                    console.log("Destination Costs Converted:", destCostsConverted);
                    if (destCostsConverted) {
                        // Calculate total cost of living
                        const homeTotalCost = Object.values(homeCosts.costs).reduce((a: any, b: any) => a + b, 0);
                        const destTotalCost = Object.values(destCostsConverted.costs).reduce((a: any, b: any) => a + b, 0);
                        
                        // Calculate PPP adjustment factor
                        const pppAdjustment = homeTotalCost / destTotalCost;
                        
                        // Calculate purchasing power in HOME currency terms
                        const purchasingPowerInHomeCurrency = Number(selectedAmount) * pppAdjustment;

                        setPppComparison({
                            nominalAmount: result.amount,
                            purchasingPowerAmount: purchasingPowerInHomeCurrency,
                            pppAdjustment: pppAdjustment,
                            costDifference: ((destTotalCost - homeTotalCost) / homeTotalCost) * 100,
                            homeCosts: homeTotalCost,
                            destCosts: destTotalCost
                        });
                    }
                }
            }
        } catch (error: any) {
            setCalculationError(error?.message || "Error performing calculation");
            console.error("Calculation error:", error);
        }
    };

    // Data for city comparisons
    const cityComparisons = [
        {
            name: "Gold coast",
            cost: "$200/week",
            suburb: "Byron bay",
            imageUrl: "https://c.animaapp.com/ma9eugodIUDWMx/img/image-1.svg",
        },
        {
            name: "Melbourne",
            cost: "$190/week",
            suburb: "Suburb name",
            imageUrl: "https://c.animaapp.com/ma9eugodIUDWMx/img/image-1.svg",
        },
        {
            name: "City name",
            cost: "$150/week",
            suburb: "Suburb name",
            imageUrl: "https://c.animaapp.com/ma9eugodIUDWMx/img/image-1.svg",
        },
    ];

    // Data for comparison cards
    const comparisonCards = [
        {
            title: "🏠 Housing",
            status: "good",
            borderColor: "border-[#23f938]",
            locations: [
                { country: "🇳 In Auckland (New Zealand)", cost: "$300/Week" },
                { country: "🇳 In Sydney (Australia)", cost: "$200/Week" },
            ],
        },
        {
            title: "💵 Income",
            status: "good",
            borderColor: "border-[#23f938]",
            locations: [
                { country: "🇳 In Auckland (New Zealand)", cost: "$300/Week" },
                { country: "🇳 In Sydney (Australia)", cost: "$200/Week" },
            ],
        },
        {
            title: "💼 Jobs",
            status: "medium",
            borderColor: "border-[#fab23d]",
            locations: [
                { country: "🇳 In Auckland (New Zealand)", cost: "$300/Week" },
                { country: "🇳 In Sydney (Australia)", cost: "$200/Week" },
            ],
        },
        {
            title: "⚡ Power",
            status: "medium",
            borderColor: "border-[#fab23d]",
            locations: [
                { country: "🇳 In Auckland (New Zealand)", cost: "$300/Week" },
                { country: "🇳 In Sydney (Australia)", cost: "$200/Week" },
            ],
        },
        {
            title: " 🍔 Food",
            status: "bad",
            borderColor: "border-[#f23f3f]",
            locations: [
                { country: "🇳 In Auckland (New Zealand)", cost: "$300/Month" },
                { country: "🇳 In Sydney (Australia)", cost: "$200/Month" },
            ],
        },
        {
            title: " 🙋 Inflation",
            status: "bad",
            borderColor: "border-[#f23f3f]",
            locations: [
                { country: "🇳 In Auckland (New Zealand)", cost: "400,000 people" },
                { country: "🇳 In Sydney (Australia)", cost: "800,000 people" },
            ],
        },
        {
            title: " 🍔 Rent",
            status: "bad",
            borderColor: "border-[#f23f3f]",
            locations: [
                { country: "🇳 In Auckland (New Zealand)", cost: "$300/Month" },
                { country: "🇳 In Sydney (Australia)", cost: "$200/Month" },
            ],
        },
    ];

    return (
        <section className="flex flex-col items-start gap-10 py-0 pb-10 px-10 w-full">
            {/* Hero Section */}
            <div className="flex items-center w-full relative">
                <div className="flex flex-col min-w-[705px] items-start gap-2.5 p-2.5 flex-1 grow">
                    <img
                        className="w-full h-[752px] object-cover"
                        alt="Travel destination"
                        src="https://c.animaapp.com/ma9eugodIUDWMx/img/image.png"
                    />
                </div>

                <Card className="flex flex-col max-w-[570px] items-start gap-4 p-10 flex-1 grow ml-[-300px] rounded-[40px] bg-white shadow-[4px_4px_8px_#00000040]">
                    <CardContent className="p-0 space-y-4 w-full">
                        <div className="flex items-center justify-center gap-2.5 p-2.5 w-full">
                            <h1 className="flex-1 mt-[-1.00px] [font-family:'Geist',Helvetica] font-medium text-black text-5xl">
                                Welcome to Smart Travel
                            </h1>
                        </div>

                        <div className="flex items-center justify-center gap-2.5 p-2.5 w-full">
                            <p className="flex-1 mt-[-1.00px] [font-family:'Geist',Helvetica] font-extralight text-black text-xl">
                                SMRT | TRVL is a smart travel and relocation tool that helps you
                                understand how far your money can go in different countries.
                                Simply enter your home country and income, and SMRT | TRVL
                                converts your currency and shows you what your dollar is worth
                                abroad. The platform offers insights into local economies, cost
                                of living, and housing options you could afford in your
                                destination. Whether you're planning a vacation, considering a
                                remote work move, or just curious about global lifestyles, SMRT
                                | TRVL gives you the data to compare, plan, and travel smarter.
                            </p>
                        </div>

                        <Button className="bg-[#c64cff] rounded-[32px] px-6 py-2.5 flex items-center gap-2.5">
              <span className="[font-family:'Geist',Helvetica] font-medium text-[#fffdfd] text-base">
                Sign up
              </span>
                            <img
                                className="w-6 h-6"
                                alt="Person"
                                src="https://c.animaapp.com/ma9eugodIUDWMx/img/person.svg"
                            />
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* How it works section */}
            <div className="flex flex-col max-w-[920px] items-start gap-4 w-full">
                <h2 className="mt-[-1.00px] [font-family:'Geist',Helvetica] font-medium text-black text-[32px]">
                    How it works
                </h2>

                <p className="[font-family:'Geist',Helvetica] font-extralight text-black text-base">
                    Put in your countries dollar and your current annual salary, savings
                    or what ever amount you are wanting. then put in the countries dollar
                    you want to see, add the country or city related in the search and
                    click calculate to see how far the amount of money you have will can
                    take you somewhere else 🚀
                </p>
            </div>

            {/* SearchIcon and Results Section */}
            <div className="flex items-start gap-10 w-full">
                <div className="flex flex-col items-start gap-4 flex-1 grow">
                    <div className="flex flex-col h-[184.11px] items-start justify-center gap-4 w-full">
                        <div className="w-full">
                            <DropDown
                                options={countries.map(c => ({
                                    value: c.code,
                                    label: `${c.country} (${c.code})`
                                }))}
                                placeholder="Select country"
                                value={selectedCountry}
                                onChange={(value) => setSelectedCountry(value)}
                                size="lg"
                            />
                        </div>

                        <CurrencyInput
                            value={selectedAmount}
                            onChange={(e) => setSelectedAmount(e.target.value)}
                            placeholder="Add Budget"
                            currency={selectedCountry}
                            size="lg"
                        />
                        
                        <DropDown
                                options={countries.map(c => ({
                                    value: c.code,
                                    label: `${c.country} (${c.code})`
                                }))}
                                placeholder="Select country"
                                value={selectedRefCountry}
                                onChange={(value) => setSelectedRefCountry(value)}
                                size="lg"
                            />
                    </div>

                    <div className="flex items-start gap-4 w-full">
                        <ChakraButton 
                            bg="#c64cff"
                            color="white"
                            _hover={{ bg: "#b03ee6" }}
                            _disabled={{ bg: "#d9d9d9", cursor: "not-allowed" }}
                            px={6}
                            py={2.5}
                            rounded="2"
                            width='full'
                            isDisabled={!isFormValid}
                            onClick={handleCalculate}
                        >
                            Calculate
                        </ChakraButton>
                    </div>
                </div>

                <Card className="flex flex-col max-w-[692px] items-start gap-4 p-10 flex-1 grow rounded-[40px] shadow-[4px_4px_8px_#00000040]">
                    <CardContent className="p-0 space-y-4 w-full">
                        {calculationError ? (
                            <div className="flex px-0 py-2.5 w-full items-center justify-center gap-2.5">
                                <p className="flex-1 mt-[-1.00px] [font-family:'Geist',Helvetica] font-medium text-red-600 text-xl text-center">
                                    {calculationError}
                                </p>
                            </div>
                        ) : convertedAmount !== null ? (
                            <>
                                {pppComparison ? (
                                    <>
                                        <div className="flex px-0 py-2.5 w-full items-center justify-center gap-2.5">
                                            <h3 className="flex-1 mt-[-1.00px] [font-family:'Geist',Helvetica] font-bold text-[#c64cff] text-3xl text-center">
                                                💰 {pppComparison.purchasingPowerAmount.toFixed(2)} {selectedCountry}
                                            </h3>
                                        </div>

                                        <div className="flex items-center justify-center gap-2.5 w-full">
                                            <p className="flex-1 [font-family:'Geist',Helvetica] font-medium text-black text-lg text-center">
                                                Equivalent Purchasing Power (in {selectedCountry} terms)
                                            </p>
                                        </div>
                                        
                                        <div className="flex items-center justify-center gap-2.5 w-full border-t border-gray-200 pt-4 mt-2">
                                            <div className="flex-1">
                                                <p className="[font-family:'Geist',Helvetica] font-extralight text-black text-base mb-3">
                                                    Your {selectedAmount} {selectedCountry} converts to {convertedAmount.toFixed(2)} {selectedRefCountry} at current exchange rates.
                                                </p>
                                                <p className="[font-family:'Geist',Helvetica] font-extralight text-black text-base mb-3">
                                                    However, based on cost of living differences, your {selectedAmount} {selectedCountry} has the <span className="font-bold">purchasing power</span> equivalent to{' '}
                                                    <span className="font-bold text-[#c64cff]">
                                                        {pppComparison.purchasingPowerAmount.toFixed(2)} {selectedCountry}
                                                    </span>
                                                    {' '}when living in {getCountryCodeFromCurrency(selectedRefCountry)}.
                                                </p>
                                                <p className="[font-family:'Geist',Helvetica] font-extralight text-black text-sm text-center p-3 bg-gray-50 rounded-lg">
                                                    {pppComparison.costDifference > 0 
                                                        ? `⚠️ Living costs are ${Math.abs(pppComparison.costDifference).toFixed(1)}% higher in ${getCountryCodeFromCurrency(selectedRefCountry)} - your money goes less far`
                                                        : `🎉 Living costs are ${Math.abs(pppComparison.costDifference).toFixed(1)}% lower in ${getCountryCodeFromCurrency(selectedRefCountry)} - your money goes further!`
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex px-0 py-2.5 w-full items-center justify-center gap-2.5">
                                            <h3 className="flex-1 mt-[-1.00px] [font-family:'Geist',Helvetica] font-medium text-black text-2xl text-center">
                                                {selectedAmount} {selectedCountry} = {convertedAmount.toFixed(2)} {selectedRefCountry}
                                            </h3>
                                        </div>

                                        <div className="flex items-center justify-center gap-2.5 w-full">
                                            <p className="flex-1 mt-[-1.00px] [font-family:'Geist',Helvetica] font-extralight text-black text-base">
                                                At current exchange rates, {selectedAmount} {selectedCountry} converts to {convertedAmount.toFixed(2)} {selectedRefCountry}.
                                                {exchangeRate && ` The exchange rate is 1 ${selectedCountry} = ${exchangeRate.toFixed(4)} ${selectedRefCountry}.`}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-center gap-2.5 w-full mt-4 p-3 bg-gray-50 rounded-lg">
                                            <p className="flex-1 [font-family:'Geist',Helvetica] font-extralight text-gray-600 text-sm text-center">
                                                ℹ️ Cost of living data not available for purchasing power analysis
                                            </p>
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="flex px-0 py-2.5 w-full items-center justify-center gap-2.5">
                                    <h3 className="flex-1 mt-[-1.00px] [font-family:'Geist',Helvetica] font-medium text-black text-2xl text-center">
                                        Enter values to see conversion
                                    </h3>
                                </div>

                                <div className="flex items-center justify-center gap-2.5 w-full">
                                    <p className="flex-1 mt-[-1.00px] [font-family:'Geist',Helvetica] font-extralight text-black text-base">
                                        Select your home country, enter an amount, choose a destination country, and click Calculate to see the purchasing power comparison.
                                    </p>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* City Stats Section */}
            <div className="flex flex-col items-start gap-10 w-full">
                {currentCityStats && (
                    <Card className="flex flex-col items-center justify-center gap-4 w-full bg-[#ae53da] rounded-[40px] shadow-[6px_4px_8px_#00000040]">
                        <CardContent className="p-0 w-full">
                            <div className="flex items-start gap-4 w-full">
                                <div className="flex flex-col items-start gap-4 p-10 flex-1 grow rounded-[60px]">
                                    <div className="flex items-start gap-8 w-full">
                                        <div className="flex flex-col items-start gap-4 flex-1 grow">
                                            <div className="inline-flex items-center justify-center gap-2.5">
                                                <h2 className="mt-[-1.00px] [font-family:'Geist',Helvetica] font-medium text-white text-5xl">
                                                    📈 City stats
                                                </h2>
                                            </div>

                                            <div className="flex flex-col items-start w-full">
                                                <div className="flex flex-col items-start w-full">
                                                    <h3 className="mt-[-1.00px] [font-family:'Geist',Helvetica] font-medium text-white text-4xl text-center">
                                                        Overall cost of living
                                                    </h3>

                                                    <div className="flex items-center justify-center gap-2.5 w-full">
                                                        <p className="flex-1 mt-[-1.00px] [font-family:'Geist',Helvetica] font-normal text-white text-2xl">
                                                            Estimated costs without rent
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {currentCityStats.locations.map((location: any, index: number) => (
                                                <div key={index} className="flex flex-col items-center justify-center w-full">
                                                    <div className="flex flex-col items-start w-full">
                                                        <p className="mt-[-1.00px] [font-family:'Geist',Helvetica] font-normal text-white text-2xl">
                                                            {location.flag} In {location.city} ({location.country})
                                                        </p>

                                                        <p className="[font-family:'Geist',Helvetica] font-normal text-white text-2xl">
                                                            {location.cost}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex flex-col max-w-[920px] items-start gap-4 flex-1 grow">
                                            <p 
                                                className="mt-[-1.00px] [font-family:'Geist',Helvetica] text-base"
                                                dangerouslySetInnerHTML={{ __html: currentCityStats.description.replace(/<br\/>/g, '<br/>').replace(/<strong>/g, '<span class="font-bold text-white">').replace(/<\/strong>/g, '</span>').replace(/class='underline'/g, 'class="font-medium text-white underline"').replace(/<strong class=/g, '<span class=') }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </section>
    );
};
