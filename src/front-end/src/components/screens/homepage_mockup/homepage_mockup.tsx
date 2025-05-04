import { MenuIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../components/ui/button";
import { FooterByAnima } from "./sections/footer";
import { FrameByAnima } from "./sections/frame";

export const HomepageMvp = (): JSX.Element => {
    return (
        <div className="flex flex-col w-full max-w-[1658px] items-start gap-10 bg-white">
            <header className="flex items-center justify-between p-10 w-full bg-[#e0b8f3] shadow-[0px_5px_4px_#00000040]">
                <img
                    className="w-[255px] h-[34.5px] object-cover"
                    alt="Logo"
                    src="https://c.animaapp.com/ma9eugodIUDWMx/img/image-2-1.png"
                />

                <div className="flex items-center gap-8">
                    <Button
                        variant="outline"
                        className="px-6 py-2.5 bg-[#fffdfd] rounded-[32px] hover:bg-[#f8f0f8]"
                    >
            <span className="[font-family:'Hannari-Regular',Helvetica] font-normal text-[#ae53da] text-base">
              Log in
            </span>
                    </Button>

                    <div className="flex items-center justify-end">
                        <MenuIcon className="w-7 h-7 text-black" />
                    </div>
                </div>
            </header>

            <FrameByAnima />
            <FooterByAnima />
        </div>
    );
};
