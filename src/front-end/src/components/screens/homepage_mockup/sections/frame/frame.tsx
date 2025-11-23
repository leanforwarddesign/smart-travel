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
                        countrCode,
                        graph
                    );

                    console.log("Destination Costs Converted:", destCostsConverted);
                    if (destCostsConverted) {
                        // Calculate total cost of living
                        const homeTotalCost = Object.values(homeCosts.costs).reduce((a: any, b: any) => a + b, 0);
                        const destTotalCost = Object.values(destCostsConverted.costs).reduce((a: any, b: any) => a + b, 0);
                        
                        // Calculate PPP adjustment factor
                        const pppAdjustment = homeTotalCost / destTotalCost;
                        
                        // Calculate purchasing power equivalent
                        const purchasingPower = result.amount * pppAdjustment;

                        setPppComparison({
                            nominalAmount: result.amount,
                            purchasingPowerAmount: purchasingPower,
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
                                                💰 {pppComparison.purchasingPowerAmount.toFixed(2)} {selectedRefCountry}
                                            </h3>
                                        </div>

                                        <div className="flex items-center justify-center gap-2.5 w-full">
                                            <p className="flex-1 [font-family:'Geist',Helvetica] font-medium text-black text-lg text-center">
                                                Purchasing Power in Destination
                                            </p>
                                        </div>
                                        
                                        <div className="flex items-center justify-center gap-2.5 w-full border-t border-gray-200 pt-4 mt-2">
                                            <div className="flex-1">
                                                <p className="[font-family:'Geist',Helvetica] font-extralight text-black text-base mb-3">
                                                    Your {selectedAmount} {selectedCountry} converts to {convertedAmount.toFixed(2)} {selectedRefCountry} at current exchange rates.
                                                </p>
                                                <p className="[font-family:'Geist',Helvetica] font-extralight text-black text-base mb-3">
                                                    However, based on cost of living differences, your money has the <span className="font-bold">purchasing power</span> of{' '}
                                                    <span className="font-bold text-[#c64cff]">
                                                        {pppComparison.purchasingPowerAmount.toFixed(2)} {selectedRefCountry}
                                                    </span>
                                                    {' '}when adjusted for local prices.
                                                </p>
                                                <p className="[font-family:'Geist',Helvetica] font-extralight text-black text-sm text-center p-3 bg-gray-50 rounded-lg">
                                                    {pppComparison.costDifference > 0 
                                                        ? `⚠️ Living costs are ${Math.abs(pppComparison.costDifference).toFixed(1)}% higher in ${selectedRefCountry}`
                                                        : `🎉 Living costs are ${Math.abs(pppComparison.costDifference).toFixed(1)}% lower in ${selectedRefCountry}!`
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

                                        <div className="flex flex-col items-center justify-center w-full">
                                            <div className="flex flex-col items-start w-full">
                                                <p className="mt-[-1.00px] [font-family:'Geist',Helvetica] font-normal text-white text-2xl">
                                                    🇳 In Auckland (New Zealand)
                                                </p>

                                                <p className="[font-family:'Geist',Helvetica] font-normal text-white text-2xl">
                                                    $NZD 300/Week
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center justify-center w-full">
                                            <div className="flex flex-col items-start w-full">
                                                <p className="mt-[-1.00px] [font-family:'Geist',Helvetica] font-normal text-white text-2xl">
                                                    🇳 In Sydney (Australia)
                                                </p>

                                                <p className="[font-family:'Geist',Helvetica] font-normal text-white text-2xl">
                                                    $NZD 200/Week
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col max-w-[920px] items-start gap-4 flex-1 grow">
                                        <p className="mt-[-1.00px] [font-family:'Geist',Helvetica] text-base">
                      <span className="font-extralight text-white">
                        In cities like{" "}
                      </span>

                                            <span className="font-bold text-white">
                        Sydney or Melbourne,
                      </span>

                                            <span className="font-extralight text-white">
                        {" "}
                                                this is decent but not extravagant—expect tight budgets
                        on rent and daily costs.
                        <br />
                        <br />
                        In regional areas or smaller cities like{" "}
                      </span>

                                            <span className="font-bold text-white">
                        Adelaide, Hobart, or Perth
                      </span>

                                            <span className="font-extralight text-white">
                        , you could live quite comfortably.
                        <br />
                        <br />
                        Australia generally has higher average wages, so while
                        NZD 100K feels upper-middle class in NZ, it's more of a
                        comfortable middle-tier income in Australia.
                        <br />
                        <br />
                        To find out further information about cities in
                        Australia{" "}
                      </span>

                                            <span className="font-medium text-white underline">
                        sign up to SMRT | TRVL.{" "}
                      </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Comparison Cards Section */}
                <div className="flex flex-col items-start gap-10 w-full">
                    <div className="flex flex-col items-start gap-8 w-full">
                        {/* Legend */}
                        <div className="inline-flex items-center gap-4">
                            <Badge variant="outline" className="pt-2.5 pb-0 px-2.5">
                <span className="[font-family:'Geist',Helvetica] font-medium text-black text-xl">
                  Good ✅
                </span>
                            </Badge>

                            <Badge variant="outline" className="pt-2.5 pb-0 px-2.5">
                <span className="[font-family:'Geist',Helvetica] font-medium text-black text-xl">
                  Medium 🟧
                </span>
                            </Badge>

                            <Badge variant="outline" className="pt-2.5 pb-0 px-2.5">
                <span className="[font-family:'Geist',Helvetica] font-medium text-black text-xl">
                  Bad ❌
                </span>
                            </Badge>
                        </div>

                        {/* First row of cards */}
                        <div className="flex items-center gap-8 w-full">
                            {comparisonCards.slice(0, 2).map((card, index) => (
                                <Card
                                    key={index}
                                    className={`flex flex-col items-start gap-4 p-10 flex-1 grow bg-white rounded-[40px] border-[6px] border-solid ${card.borderColor} shadow-[4px_4px_8px_#00000040]`}
                                >
                                    <CardContent className="p-0 space-y-4 w-full">
                                        <div className="flex items-center gap-2.5 w-full">
                                            <h3 className="mt-[-1.00px] [font-family:'Geist',Helvetica] font-medium text-black text-2xl text-center">
                                                {card.title}
                                            </h3>
                                        </div>

                                        <div className="flex flex-col items-start gap-4 w-full">
                                            {card.locations.map((location, locIndex) => (
                                                <div
                                                    key={locIndex}
                                                    className="flex flex-col items-center justify-center w-full"
                                                >
                                                    <p className="mt-[-1.00px] [font-family:'Geist',Helvetica] font-normal text-black text-base">
                                                        {location.country}
                                                    </p>
                                                    <p className="[font-family:'Geist',Helvetica] font-normal text-black text-base">
                                                        {location.cost}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="p-0 w-full flex justify-end">
                                        <Button
                                            variant="link"
                                            className="[font-family:'Geist',Helvetica] font-medium text-black text-base text-center"
                                        >
                                            View more details
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        {/* Second row of cards */}
                        <div className="flex items-center gap-8 w-full">
                            {comparisonCards.slice(2, 4).map((card, index) => (
                                <Card
                                    key={index}
                                    className={`flex flex-col items-start gap-4 p-10 flex-1 grow bg-white rounded-[40px] border-[6px] border-solid ${card.borderColor} shadow-[4px_4px_8px_#00000040]`}
                                >
                                    <CardContent className="p-0 space-y-4 w-full">
                                        <div className="flex items-center gap-2.5 w-full">
                                            <h3 className="mt-[-1.00px] [font-family:'Geist',Helvetica] font-medium text-black text-2xl text-center">
                                                {card.title}
                                            </h3>
                                        </div>

                                        <div className="flex items-center justify-center gap-2.5 w-full">
                                            <div className="flex flex-col items-start gap-4 flex-1 grow">
                                                {card.locations.map((location, locIndex) => (
                                                    <div
                                                        key={locIndex}
                                                        className="flex flex-col items-center justify-center w-full"
                                                    >
                                                        <p className="mt-[-1.00px] [font-family:'Geist',Helvetica] font-normal text-black text-base">
                                                            {location.country}
                                                        </p>
                                                        <p className="[font-family:'Geist',Helvetica] font-normal text-black text-base">
                                                            {location.cost}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="p-0 w-full flex justify-end">
                                        <Button
                                            variant="link"
                                            className="[font-family:'Geist',Helvetica] font-medium text-black text-base text-center"
                                        >
                                            View more details
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        {/* Third row of cards */}
                        <div className="flex items-start gap-8 w-full">
                            {comparisonCards.slice(4, 7).map((card, index) => (
                                <Card
                                    key={index}
                                    className={`flex flex-col items-start gap-4 p-10 flex-1 grow bg-white rounded-[40px] border-[6px] border-solid ${card.borderColor} shadow-[4px_4px_8px_#00000040]`}
                                >
                                    <CardContent className="p-0 space-y-4 w-full">
                                        <div className="flex items-center gap-2.5 w-full">
                                            <h3 className="mt-[-1.00px] [font-family:'Geist',Helvetica] font-medium text-black text-2xl text-center">
                                                {card.title}
                                            </h3>
                                        </div>

                                        <div className="flex items-center justify-center gap-2.5 w-full">
                                            <div className="flex flex-col items-start gap-4 flex-1 grow">
                                                {card.locations.map((location, locIndex) => (
                                                    <div
                                                        key={locIndex}
                                                        className="flex flex-col items-center justify-center w-full"
                                                    >
                                                        <p className="mt-[-1.00px] [font-family:'Geist',Helvetica] font-normal text-black text-base">
                                                            {location.country}
                                                        </p>
                                                        <p className="[font-family:'Geist',Helvetica] font-normal text-black text-base">
                                                            {location.cost}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="p-0 w-full flex justify-end">
                                        <Button
                                            variant="link"
                                            className="[font-family:'Geist',Helvetica] font-medium text-black text-base text-center"
                                        >
                                            View more details
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Overall Ranking */}
            <div className="inline-flex pl-0 pr-2.5 pt-2.5 pb-0 items-center justify-center gap-2.5">
                <h2 className="mt-[-1.00px] [font-family:'Geist',Helvetica] font-medium text-black text-4xl">
                    Overall ranking: 6/68
                </h2>
            </div>

            {/* City Comparison */}
            <div className="flex flex-col items-start gap-4 w-full">
                <h2 className="mt-[-1.00px] [font-family:'Geist',Helvetica] font-medium text-black text-[32px]">
                    Comparison across other cities in Australia
                </h2>

                <div className="flex items-center gap-8 w-full">
                    {cityComparisons.map((city, index) => (
                        <Card
                            key={index}
                            className="flex flex-col items-start gap-4 p-4 flex-1 grow bg-white rounded-lg border border-solid border-[#d9d9d9]"
                        >
                            <CardContent className="p-0 w-full">
                                <div
                                    className="w-full h-[247px] bg-cover bg-center bg-image-placeholder"
                                    style={{ backgroundImage: `url(${city.imageUrl})` }}
                                />

                                <div className="flex flex-col w-52 items-start gap-2 mt-4">
                                    <div className="flex items-start w-full">
                                        <p className="flex-1 mt-[-1.00px] font-body-base font-[number:var(--body-base-font-weight)] text-[#1e1e1e] text-[length:var(--body-base-font-size)] tracking-[var(--body-base-letter-spacing)] leading-[var(--body-base-line-height)]">
                                            {city.name}
                                        </p>
                                    </div>

                                    <div className="inline-flex items-start">
                                        <p className="text-[#1e1e1e] mt-[-1.00px] font-body-strong font-[number:var(--body-strong-font-weight)] text-[length:var(--body-strong-font-size)] tracking-[var(--body-strong-letter-spacing)] leading-[var(--body-strong-line-height)] whitespace-nowrap">
                                            {city.cost}
                                        </p>
                                    </div>

                                    <div className="flex items-start w-full">
                                        <p className="mt-[-1.00px] font-body-small font-[number:var(--body-small-font-weight)] text-[#757575] text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] whitespace-nowrap">
                                            {city.suburb}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
