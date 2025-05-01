import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const DivByAnima = (): JSX.Element => {
    // Data for city comparisons
    const cityComparisons = [
        {
            id: 1,
            price: "$200/week",
            location: "Bondi",
            imageUrl: "https://c.animaapp.com/ma5a6vdzkSZ8jz/img/image-1.svg",
        },
        {
            id: 2,
            price: "$190/week",
            location: "Manly",
            imageUrl: "https://c.animaapp.com/ma5a6vdzkSZ8jz/img/image-1.svg",
        },
        {
            id: 3,
            price: "$150/week",
            location: "Chatswood",
            imageUrl: "https://c.animaapp.com/ma5a6vdzkSZ8jz/img/image-1.svg",
        },
    ];

    return (
        <section className="flex flex-col items-start gap-4 w-full">
            <h2 className="self-stretch [font-family:'Geist',Helvetica] font-medium text-black text-xl">
                Comparison across other cities in Australia
            </h2>

            <div className="flex flex-col items-start justify-center gap-8 w-full">
                {cityComparisons.map((city) => (
                    <Card
                        key={city.id}
                        className="flex flex-col items-start gap-4 p-4 w-full bg-white rounded-lg border border-solid border-[#d9d9d9]"
                    >
                        <CardContent className="p-0 w-full">
                            <div
                                className="w-full h-[247px] bg-cover bg-center bg-image-placeholder"
                                style={{ backgroundImage: `url(${city.imageUrl})` }}
                            />

                            <div className="flex flex-col w-52 items-start gap-2 mt-4">
                                <div className="flex items-start w-full">
                                    <p className="flex-1 font-body-base font-[number:var(--body-base-font-weight)] text-[#1e1e1e] text-[length:var(--body-base-font-size)] tracking-[var(--body-base-letter-spacing)] leading-[var(--body-base-line-height)] [font-style:var(--body-base-font-style)]">
                                        Text
                                    </p>
                                </div>

                                <div className="inline-flex items-start">
                                    <p className="text-[#1e1e1e] w-fit font-body-strong font-[number:var(--body-strong-font-weight)] text-[length:var(--body-strong-font-size)] tracking-[var(--body-strong-letter-spacing)] leading-[var(--body-strong-line-height)] whitespace-nowrap [font-style:var(--body-strong-font-style)]">
                                        {city.price}
                                    </p>
                                </div>

                                <div className="flex items-start w-full">
                                    <p className="w-fit font-body-small font-[number:var(--body-small-font-weight)] text-[#757575] text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] whitespace-nowrap [font-style:var(--body-small-font-style)]">
                                        {city.location}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};
