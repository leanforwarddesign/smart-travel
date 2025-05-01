import React from "react";
import { Button } from "../../components/ui/button";
import { DivByAnima } from "./sections/DivByAnima";
import { DivWrapperByAnima } from "./sections/DivWrapperByAnima";
import { FooterByAnima } from "./sections/FooterByAnima";
import { FrameByAnima } from "./sections/FrameByAnima";
import { FrameWrapperByAnima } from "./sections/FrameWrapperByAnima";
import { HeadingByAnima } from "./sections/HeadingByAnima/HeadingByAnima";
import { StatsByAnima } from "./sections/StatsByAnima";

export const HomepageTablet = (): JSX.Element => {
    return (
        <div
            className="flex flex-col min-w-80 max-w-[575px] items-start gap-10 bg-white"
            data-model-id="208:778"
        >
            <header className="flex items-center justify-between p-10 w-full bg-[#e0b8f3] shadow-[0px_5px_4px_#00000040]">
                <img
                    className="h-[37.07px] object-cover"
                    alt="Image"
                    src="https://c.animaapp.com/ma5a6vdzkSZ8jz/img/image-2-1.png"
                />

                <div className="flex items-center gap-8">
                    <Button
                        variant="outline"
                        className="px-6 py-2.5 bg-[#fffdfd] rounded-[32px] hover:bg-[#fffdfd]/90"
                    >
            <span className="[font-family:'Hannari-Regular',Helvetica] font-normal text-[#ae53da] text-base">
              Log in
            </span>
                    </Button>

                    <div className="flex items-center justify-end w-6">
                        <img
                            className="w-7 h-7"
                            alt="Vector"
                            src="https://c.animaapp.com/ma5a6vdzkSZ8jz/img/vector.svg"
                        />
                    </div>
                </div>
            </header>

            <main className="flex flex-col items-start gap-10 pt-0 pb-10 px-6 w-full">
                <HeadingByAnima />
                <FrameByAnima />
                <FrameWrapperByAnima />
                <DivWrapperByAnima />
                <StatsByAnima />

                <section className="flex items-center justify-center gap-2.5 w-full pt-2.5 pr-2.5">
                    <h2 className="[font-family:'Geist',Helvetica] font-medium text-black text-[28px]">
                        Overall ranking: 6/68
                    </h2>
                </section>

                <DivByAnima />
            </main>

            <FooterByAnima />
        </div>
    );
};
