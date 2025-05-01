import { DollarSignIcon, SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";

export const FrameWrapperByAnima = (): JSX.Element => {
    // Define search fields data for reusability
    const searchFields = [
        {
            id: "country-search",
            placeholder: "SearchIcon country or City",
            icon: <SearchIcon className="h-6 w-6" />,
            fullWidth: true,
        },
        {
            id: "budget",
            placeholder: "Add Budget",
            icon: <DollarSignIcon className="h-6 w-6" />,
            fullWidth: false,
        },
        {
            id: "country-search-2",
            placeholder: "SearchIcon country or City",
            icon: <SearchIcon className="h-6 w-6" />,
            fullWidth: true,
        },
    ];

    return (
        <div className="flex flex-col items-start gap-10 w-full">
            <div className="flex flex-col items-start gap-4 w-full">
                <div className="flex flex-col items-start justify-center gap-4 w-full">
                    {searchFields.map((field, index) => (
                        <div
                            key={field.id}
                            className={`flex ${index === 1 ? "flex-wrap gap-2" : "w-full"}`}
                        >
                            <div
                                className={`flex items-center ${field.fullWidth ? "w-full" : "flex-1"}`}
                            >
                                <div className="relative w-full flex items-center">
                                    <Input
                                        className="w-full border-2 border-black py-2 px-2.5 [font-family:'Hannari-Regular',Helvetica] text-base"
                                        placeholder={field.placeholder}
                                    />
                                    <div className="absolute right-2.5 flex items-center">
                                        {field.icon}
                                    </div>
                                </div>
                            </div>

                            {index === 1 && (
                                <img
                                    className="w-10 h-10"
                                    alt="Frame"
                                    src="https://c.animaapp.com/ma5a6vdzkSZ8jz/img/frame-63.svg"
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="w-full">
                    <Button className="w-full bg-[#c64cff] hover:bg-[#b43aee] rounded-lg py-2 px-6 [font-family:'Hannari-Regular',Helvetica] font-normal text-base">
                        Calculate
                    </Button>
                </div>
            </div>

            <Card className="w-full max-w-[570px] rounded-[40px] shadow-[4px_4px_8px_#00000040] p-10">
                <CardContent className="p-0 flex flex-col gap-4">
                    <div className="py-2.5 w-full">
                        <h2 className="[font-family:'Geist',Helvetica] font-medium text-black text-2xl text-center">
                            $100,000 NZD = $92,000 AUD
                        </h2>
                    </div>
                    <p className="[font-family:'Geist',Helvetica] font-extralight text-black text-base">
                        NZD 100,000 equals about AUD 92,000 (as of early 2025). In
                        Australia, this is close to the median income, and your take-home
                        pay after tax would be around AUD 70,000–72,000.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};
