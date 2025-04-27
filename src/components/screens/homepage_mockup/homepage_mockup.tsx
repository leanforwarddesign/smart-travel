import { ShoppingCartIcon } from "lucide-react";
import React from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { FooterByAnima } from "./sections/FooterByAnima";
import { FrameByAnima } from "./sections/FrameByAnima";

export const HomepageMockUp = (): JSX.Element => {
    return (
        <div className="flex flex-col min-w-[992px] max-w-[1658px] items-start gap-10 bg-white">
            <header className="flex w-full items-center justify-between p-10 bg-[#e0b8f3] shadow-[0px_5px_4px_#00000040]">
                <img
                    className="w-[255px] h-[34.5px] object-cover"
                    alt="Logo"
                    src="https://c.animaapp.com/m9ziqhftNQs4Nv/img/image-2-1.png"
                />

                <div className="flex items-center justify-end gap-9">
                    <Button
                        variant="outline"
                        className="flex items-center gap-2.5 px-6 py-2.5 bg-[#fffdfd] rounded-[32px] hover:bg-[#f8f0fc]"
                    >
            <span className="[font-family:'Hannari-Regular',Helvetica] font-normal text-[#ae53da] text-base">
              Account
            </span>
                        <Avatar className="w-6 h-6">
                            <AvatarImage
                                src="https://c.animaapp.com/m9ziqhftNQs4Nv/img/person.svg"
                                alt="Person"
                            />
                            <AvatarFallback>AC</AvatarFallback>
                        </Avatar>
                    </Button>

                    <Button variant="ghost" size="icon" className="p-0">
                        <ShoppingCartIcon className="w-7 h-7 text-black" />
                    </Button>
                </div>
            </header>

            <FrameByAnima />
            <FooterByAnima />
        </div>
    );
};
