import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const HeadingByAnima = (): JSX.Element => {
    return (
        <section className="flex flex-col max-w-[992px] items-start justify-center relative w-full">
            <div className="flex flex-col items-start gap-2.5 p-2.5 relative self-stretch w-full">
                <img
                    className="relative self-stretch w-full h-[752px] object-cover"
                    alt="Travel destination landscape"
                    src="https://c.animaapp.com/ma5a6vdzkSZ8jz/img/image.png"
                />
            </div>

            <Card className="flex flex-col max-w-[570px] items-start gap-4 relative w-full mt-[-309px] rounded-[40px] shadow-[4px_4px_8px_#00000040]">
                <CardContent className="p-6 w-full">
                    <div className="flex items-center justify-center gap-2.5 p-2.5 relative self-stretch w-full">
                        <h1 className="relative flex-1 mt-[-1.00px] font-medium text-black text-[32px] leading-normal">
                            Welcome to Smart Travel
                        </h1>
                    </div>

                    <div className="flex items-center justify-center gap-2.5 p-2.5 relative self-stretch w-full">
                        <p className="relative flex-1 mt-[-1.00px] font-extralight text-black text-sm leading-normal">
                            SMRT | TRVL is a smart travel and relocation tool that helps you
                            understand how far your money can go in different countries.
                            Simply enter your home country and income, and SMRT | TRVL
                            converts your currency and shows you what your dollar is worth
                            abroad. The platform offers insights into local economies, cost of
                            living, and housing options you could afford in your destination.
                            Whether you&#39;re planning a vacation, considering a remote work
                            move, or just curious about global lifestyles, SMRT | TRVL gives
                            you the data to compare, plan, and travel smarter.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};
