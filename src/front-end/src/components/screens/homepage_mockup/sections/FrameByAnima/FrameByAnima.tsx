import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const FrameByAnima = (): JSX.Element => {
    return (
        <Card className="border-none shadow-none w-full">
            <CardContent className="flex flex-col min-w-[300px] max-w-[920px] items-start gap-4 p-0 w-full">
                <h2 className="text-[32px] font-medium text-black tracking-normal leading-normal mt-[-1px]">
                    How it works
                </h2>
                <p className="text-base font-extralight text-black tracking-normal leading-normal">
                    Put in your countries dollar and your current annual salary, savings
                    or what ever amount you are wanting. then put in the countries dollar
                    you want to see, add the country or city related in the search and
                    click calculate to see how far the amount of money you have will can
                    take you somewhere else 🚀
                </p>
            </CardContent>
        </Card>
    );
};
