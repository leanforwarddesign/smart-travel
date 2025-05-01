import React from "react";
import { Badge } from "../../../../components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../../../components/ui/card";

export const StatsByAnima = (): JSX.Element => {
    // Data for status indicators
    const statusOptions = [
        { label: "Good ✅", id: "good" },
        { label: "Medium 🟧", id: "medium" },
        { label: "Bad ❌", id: "bad" },
    ];

    // Data for cards
    const cardData = [
        {
            title: "🏠 Housing",
            status: "good",
            locations: [
                { name: "🇳 In Auckland (New Zealand)", price: "$300/Week" },
                { name: "🇳 In Sydney (Australia)", price: "$200/Week" },
            ],
        },
        {
            title: "💵 Income",
            status: "good",
            locations: [
                { name: "🇳 In Auckland (New Zealand)", price: "$300/Week" },
                { name: "🇳 In Sydney (Australia)", price: "$200/Week" },
            ],
        },
        {
            title: "💼 Jobs",
            status: "medium",
            locations: [
                { name: "🇳 In Auckland (New Zealand)", price: "$300/Week" },
                { name: "🇳 In Sydney (Australia)", price: "$200/Week" },
            ],
        },
        {
            title: "⚡ Power",
            status: "medium",
            locations: [
                { name: "🇳 In Auckland (New Zealand)", price: "$300/Week" },
                { name: "🇳 In Sydney (Australia)", price: "$200/Week" },
            ],
        },
        {
            title: "🍔 Food",
            status: "bad",
            locations: [
                { name: "🇳 In Auckland (New Zealand)", price: "$300/Month" },
                { name: "🇳 In Sydney (Australia)", price: "$200/Month" },
            ],
        },
        {
            title: "🍔 Rent",
            status: "bad",
            locations: [
                { name: "🇳 In Auckland (New Zealand)", price: "$300/Month" },
                { name: "🇳 In Sydney (Australia)", price: "$200/Month" },
            ],
        },
    ];

    // Function to get border color based on status
    const getBorderColor = (status: string) => {
        switch (status) {
            case "good":
                return "border-[#23f938]";
            case "medium":
                return "border-[#fab23d]";
            case "bad":
                return "border-[#f23f3f]";
            default:
                return "border-gray-300";
        }
    };

    return (
        <section className="flex flex-col items-start gap-10 w-full">
            <div className="flex flex-col items-start gap-8 w-full">
                {/* Status indicators */}
                <div className="flex flex-wrap items-center gap-4 w-full">
                    {statusOptions.map((status) => (
                        <Badge
                            key={status.id}
                            variant="outline"
                            className="py-2.5 px-2.5 bg-transparent border-none"
                        >
              <span className="font-medium text-black text-xl">
                {status.label}
              </span>
                        </Badge>
                    ))}
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    {cardData.map((card, index) => (
                        <Card
                            key={index}
                            className={`rounded-[40px] border-[6px] ${getBorderColor(
                                card.status,
                            )} shadow-[4px_4px_8px_#00000040] bg-white`}
                        >
                            <CardHeader className="p-10 pb-4">
                                <CardTitle className="text-2xl font-medium text-black text-center">
                                    {card.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-10 pt-0">
                                <div className="flex flex-col gap-4">
                                    {card.locations.map((location, locIndex) => (
                                        <div
                                            key={locIndex}
                                            className="flex flex-col items-center justify-center w-full"
                                        >
                                            <div className="self-stretch font-normal text-black text-base">
                                                {location.name}
                                            </div>
                                            <div className="self-stretch font-normal text-black text-base">
                                                {location.price}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
