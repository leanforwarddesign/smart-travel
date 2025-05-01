import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../../../components/ui/card";

export const DivWrapperByAnima = (): JSX.Element => {
    return (
        <Card className="flex flex-col w-full bg-[#ae53da] rounded-[40px] shadow-[6px_4px_8px_#00000040] text-white">
            <CardHeader className="pt-10 px-10 pb-0">
                <CardTitle className="text-[32px] font-medium">📈 City stats</CardTitle>
            </CardHeader>
            <CardContent className="p-10 pt-4 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-medium">Overall cost of living</h2>
                        <p className="text-base font-normal">
                            Estimated costs without rent
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <h3 className="text-2xl font-normal">
                            🇳 In Auckland (New Zealand)
                        </h3>
                        <p className="text-2xl font-normal">$300/Week</p>
                    </div>

                    <div className="flex flex-col">
                        <h3 className="text-2xl font-normal">🇳 In Sydney (Australia)</h3>
                        <p className="text-2xl font-normal">$200/Week</p>
                    </div>
                </div>

                <div className="max-w-[920px]">
                    <p className="text-base leading-normal">
                        <span className="font-extralight">In cities like </span>
                        <span className="font-bold">Sydney or Melbourne,</span>
                        <span className="font-extralight">
              {" "}
                            this is decent but not extravagant—expect tight budgets on rent
              and daily costs.
              <br />
              <br />
              In regional areas or smaller cities like{" "}
            </span>
                        <span className="font-bold">Adelaide, Hobart, or Perth</span>
                        <span className="font-extralight">
              , you could live quite comfortably.
              <br />
              <br />
              Australia generally has higher average wages, so while NZD 100K
              feels upper-middle class in NZ, it&apos;s more of a comfortable
              middle-tier income in Australia.
              <br />
              <br />
              To find out further information about cities in Australia{" "}
            </span>
                        <span className="font-medium underline">
              sign up to SMRT | TRVL.{" "}
            </span>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
