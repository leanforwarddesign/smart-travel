import {
    CalendarIcon,
    CheckIcon,
    ChevronRightIcon,
    DollarSignIcon,
    SaveIcon,
    SearchIcon,
    StarIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../../../../ui/button";
import { Card, CardContent } from "../../../../ui/card";

export const FrameByAnima = (): JSX.Element => {
    // Data for property cards
    const propertyCards = [
        {
            price: "$200/week",
            location: "Melbourne",
            imageUrl: "https://c.animaapp.com/m9ziqhftNQs4Nv/img/image-1.svg",
        },
        {
            price: "$190/week",
            location: "Sydney",
            imageUrl: "https://c.animaapp.com/m9ziqhftNQs4Nv/img/image-1.svg",
        },
        {
            price: "$150/week",
            location: "Gold Coast",
            imageUrl: "https://c.animaapp.com/m9ziqhftNQs4Nv/img/image-1.svg",
        },
    ];

    return (
        <section className="flex flex-col items-start gap-10 pt-0 pb-10 px-10 relative w-full">
            {/* Hero Section */}
            <div className="flex items-center relative w-full">
                <div className="flex flex-col min-w-[705px] items-start gap-2.5 p-2.5 relative flex-1">
                    <img
                        className="relative w-full h-[752px] object-cover"
                        alt="Travel destination"
                        src="https://c.animaapp.com/m9ziqhftNQs4Nv/img/image.png"
                    />
                </div>

                <Card className="flex flex-col max-w-[570px] items-start gap-4 p-10 relative flex-1 ml-[-309px] bg-white rounded-[40px] shadow-[4px_4px_8px_#00000040]">
                    <CardContent className="p-0 w-full">
                        <div className="flex items-center justify-center gap-2.5 p-2.5 w-full">
                            <h1 className="flex-1 mt-[-1.00px] font-medium text-black text-5xl leading-normal font-['Geist',Helvetica]">
                                Welcome to Smart Travel
                            </h1>
                        </div>

                        <div className="flex items-center justify-center gap-2.5 p-2.5 w-full">
                            <p className="flex-1 mt-[-1.00px] font-extralight text-black text-xl leading-normal font-['Geist',Helvetica]">
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

                        <Button className="inline-flex items-center justify-center gap-2.5 px-6 py-2.5 bg-[#c64cff] rounded-[32px] text-base font-medium text-[#fffdfd] font-['Geist',Helvetica]">
                            Sign up
                            <StarIcon className="w-6 h-6" />
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* How it works section */}
            <div className="flex flex-col max-w-[920px] items-start gap-4 relative w-full">
                <h2 className="mt-[-1.00px] font-medium text-black text-[32px] leading-normal font-['Geist',Helvetica]">
                    How it works
                </h2>

                <p className="font-extralight text-black text-base leading-normal font-['Geist',Helvetica]">
                    Put in your countries dollar and your current annual salary, savings
                    or what ever amount you are wanting. then put in the countries dollar
                    you want to see, add the country or city related in the search and
                    click calculate to see how far the amount of money you have will can
                    take you somewhere else 🚀
                </p>
            </div>

            {/* Currency calculator */}
            <div className="flex flex-wrap max-w-screen-xl items-start gap-[16px] py-6 w-full">
                <div className="flex flex-wrap items-center gap-[32px] relative flex-1">
                    <div className="flex flex-wrap h-[40.05px] items-center gap-[8px] relative flex-1">
                        <div className="flex max-w-[95px] w-[95px] items-center gap-6 px-2.5 py-2 bg-white border-2 border-solid border-black opacity-80">
              <span className="mt-[-1.97px] font-normal text-black text-base leading-normal font-['Hannari-Regular',Helvetica]">
                NZD
              </span>
                            <ChevronRightIcon className="w-[24.05px] h-[24.05px] mr-[-6.05px]" />
                        </div>

                        <div className="flex px-2.5 py-2 flex-1 bg-white border-2 border-solid border-black items-center gap-2.5">
              <span className="mt-[-2.00px] font-normal text-[#a1a1a1] text-base leading-normal font-['Hannari-Regular',Helvetica]">
                Budget
              </span>
                            <div className="flex justify-end flex-1 items-center gap-2.5">
                                <DollarSignIcon className="w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap h-[40.05px] items-center gap-[8px] relative flex-1">
                        <div className="flex max-w-[95px] items-center gap-6 px-2.5 py-2 flex-1 bg-white border-2 border-solid border-black opacity-80">
              <span className="mt-[-1.97px] font-normal text-black text-base leading-normal font-['Hannari-Regular',Helvetica]">
                AUD
              </span>
                            <ChevronRightIcon className="w-[24.05px] h-[24.05px] mr-[-7.05px]" />
                        </div>

                        <div className="flex px-2.5 py-2 flex-1 bg-white border-2 border-solid border-black items-center gap-2.5">
              <span className="mt-[-2.00px] font-normal text-[#a1a1a1] text-base leading-normal font-['Hannari-Regular',Helvetica]">
                Search country or City
              </span>
                            <div className="flex justify-end flex-1 items-center gap-2.5">
                                <SearchIcon className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </div>

                <Button className="flex flex-wrap w-[99px] items-center justify-center gap-[10px] px-6 py-2 bg-[#c64cff] rounded-[32px] font-normal text-white text-base leading-normal font-['Hannari-Regular',Helvetica]">
                    Calculate
                </Button>
            </div>

            {/* Conversion result */}
            <div className="flex flex-col max-w-[920px] items-start gap-4 relative w-full">
                <h2 className="mt-[-1.00px] font-medium text-black text-[32px] leading-normal font-['Geist',Helvetica]">
                    $100,000 NZD = $200,000 AUD
                </h2>

                <p className="font-normal text-black text-base leading-normal font-['Geist',Helvetica]">
          <span className="font-extralight">
            NZD 100,000 equals about AUD 92,000 (as of early 2025). In
            Australia, this is close to the median income, and your take-home
            pay after tax would be around AUD 70,000–72,000.
            <br />
            <br />
            In cities like{" "}
          </span>

                    <span className="font-bold">Sydney or Melbourne,</span>

                    <span className="font-extralight">
            {" "}
                        this is decent but not extravagant—expect tight budgets on rent and
            daily costs.
            <br />
            In regional areas or smaller cities like{" "}
          </span>

                    <span className="font-bold">Adelaide, Hobart, or Perth</span>

                    <span className="font-extralight">
            , you could live quite comfortably.
            <br />
            Australia generally has higher average wages, so while NZD 100K
            feels upper-middle class in NZ, it's more of a comfortable
            middle-tier income in Australia.
            <br />
            <br />
            To find out further information about cities in Australia{" "}
          </span>

                    <span className="font-extralight underline">
            sign up to SMRT | TRVL.{" "}
          </span>
                </p>
            </div>

            {/* Date selection */}
            <div className="flex flex-col items-start gap-2 w-full">
                <div className="flex flex-col max-w-[816px] items-start gap-4 w-full">
                    <h2 className="mt-[-1.00px] font-medium text-black text-[32px] leading-normal font-['Geist',Helvetica]">
                        How long are you wanting to stay in this Country?
                    </h2>
                </div>

                <div className="flex max-w-[816px] items-end gap-6 w-full">
                    <div className="flex max-w-[816px] items-center gap-6 flex-1">
                        <div className="flex flex-col items-start flex-1">
                            <label className="inline-flex items-center justify-center gap-2.5 py-2.5 font-bold text-black text-xs leading-normal font-['Geist',Helvetica]">
                                Start Date
                            </label>

                            <div className="flex h-10 px-2.5 py-2 w-full bg-white border-2 border-solid border-black items-center gap-2.5">
                                <div className="inline-flex items-center gap-2.5">
                                    <CalendarIcon className="w-6 h-6" />
                                </div>
                                <span className="mt-[-2.00px] font-normal text-[#a1a1a1] text-base leading-normal font-['Hannari-Regular',Helvetica]">
                  Type
                </span>
                            </div>
                        </div>

                        <div className="flex flex-col items-start flex-1">
                            <label className="inline-flex items-center justify-center gap-2.5 py-2.5 font-bold text-black text-xs leading-normal font-['Geist',Helvetica]">
                                End Date
                            </label>

                            <div className="flex h-10 px-2.5 py-2 w-full bg-white border-2 border-solid border-black items-center gap-2.5">
                                <div className="inline-flex items-center gap-2.5">
                                    <CalendarIcon className="w-6 h-6" />
                                </div>
                                <span className="mt-[-2.00px] font-normal text-[#a1a1a1] text-base leading-normal font-['Hannari-Regular',Helvetica]">
                  Type
                </span>
                            </div>
                        </div>
                    </div>

                    <Button className="flex flex-wrap w-[99px] items-center justify-center gap-[10px] px-6 py-2 bg-[#1e1e1e] font-normal text-white text-base leading-normal font-['Hannari-Regular',Helvetica]">
                        Search
                    </Button>
                </div>

                <div className="flex flex-col w-60 items-start pt-4">
                    <div className="flex items-center gap-3 w-full">
                        <div className="flex w-4 h-4 items-center justify-center bg-[#2c2c2c] rounded overflow-hidden">
                            <CheckIcon className="w-4 h-4 text-white" />
                        </div>
                        <span className="flex-1 mt-[-1.00px] font-body-base text-[#1e1e1e]">
              No return date
            </span>
                    </div>
                </div>
            </div>

            {/* Property listings */}
            <div className="flex flex-col items-start gap-4 w-full">
                <h2 className="mt-[-1.00px] font-medium text-black text-[32px] leading-normal font-['Geist',Helvetica]">
                    Top places in Australia in your Price range
                </h2>

                <div className="flex h-[375px] items-center gap-8 w-full">
                    {propertyCards.map((property, index) => (
                        <Card
                            key={index}
                            className="flex flex-col min-w-60 items-start gap-4 p-4 flex-1 bg-white rounded-lg border border-solid border-[#d9d9d9]"
                        >
                            <CardContent className="p-0 w-full">
                                <div
                                    className="relative w-full h-[247px] bg-cover bg-[50%_50%] bg-image-placeholder"
                                    style={{ backgroundImage: `url(${property.imageUrl})` }}
                                />

                                <div className="flex items-start gap-4 w-full mt-4">
                                    <div className="flex flex-col items-start gap-2 flex-1">
                                        <div className="flex items-start w-full">
                      <span className="flex-1 mt-[-1.00px] font-body-base text-[#1e1e1e]">
                        Text
                      </span>
                                        </div>

                                        <div className="inline-flex items-start">
                      <span className="text-[#1e1e1e] mt-[-1.00px] font-body-strong whitespace-nowrap">
                        {property.price}
                      </span>
                                        </div>

                                        <div className="flex items-start w-full">
                      <span className="mt-[-1.00px] font-body-small text-[#757575] whitespace-nowrap">
                        {property.location}
                      </span>
                                        </div>
                                    </div>

                                    <SaveIcon className="w-12 h-12" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
