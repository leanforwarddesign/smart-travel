import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "lucide-react";
import React from "react";

export const FooterByAnima = (): JSX.Element => {
    // Resources links data for mapping
    const resourceLinks = [
        { title: "Contact us", isUnderlined: true },
        { title: "Top 10 Cities", isUnderlined: false },
        { title: "Support", isUnderlined: false },
        { title: "Developers", isUnderlined: false },
        { title: "Top 100 countries", isUnderlined: false },
    ];

    // Social media icons data for mapping
    const socialIcons = [
        {
            icon: (
                <img
                    className="w-[23.98px] h-6"
                    alt="X logo"
                    src="https://c.animaapp.com/ma5a6vdzkSZ8jz/img/x-logo.svg"
                />
            ),
            alt: "X logo",
        },
        {
            icon: <InstagramIcon className="w-6 h-6 text-white" />,
            alt: "Instagram",
        },
        {
            icon: <YoutubeIcon className="w-6 h-6 text-white" />,
            alt: "YouTube",
        },
        {
            icon: <LinkedinIcon className="w-6 h-6 text-white" />,
            alt: "LinkedIn",
        },
    ];

    return (
        <footer className="flex items-center gap-8 p-10 self-stretch w-full flex-[0_0_auto] bg-[#e0b8f3]">
            <div className="flex flex-wrap items-center gap-[32px_32px] flex-1 self-stretch grow">
                <div className="flex flex-col h-[276px] items-start gap-6">
                    <img
                        className="mt-[-1.75px] ml-[-1.75px]"
                        alt="Figma"
                        src="https://c.animaapp.com/ma5a6vdzkSZ8jz/img/figma.svg"
                    />

                    <div className="flex items-center gap-4">
                        {socialIcons.map((social, index) => (
                            <div key={index} aria-label={social.alt}>
                                {social.icon}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-start gap-3">
                    <div className="flex flex-col items-start gap-2.5 pt-0 pb-4 px-0 self-stretch w-full">
                        <div className="flex items-start self-stretch w-full">
                            <div className="text-[#fffdfd] w-fit mt-[-1.00px] font-body-strong font-[number:var(--body-strong-font-weight)] text-[length:var(--body-strong-font-size)] tracking-[var(--body-strong-letter-spacing)] leading-[var(--body-strong-line-height)] whitespace-nowrap [font-style:var(--body-strong-font-style)]">
                                Resources
                            </div>
                        </div>
                    </div>

                    {resourceLinks.map((link, index) => (
                        <div key={index} className="w-[89px] h-[22px]">
                            <div className="h-[22px] -top-px left-0 font-body-base font-[number:var(--body-base-font-weight)] text-[#fffdfd] text-[length:var(--body-base-font-size)] tracking-[var(--body-base-letter-spacing)] leading-[var(--body-base-line-height)] whitespace-nowrap [font-style:var(--body-base-font-style)]">
                                {link.isUnderlined ? (
                                    <span className="underline">{link.title}</span>
                                ) : (
                                    link.title
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col h-[276px] items-start gap-2.5 flex-1 grow">
                    <img
                        className="self-stretch w-full h-[26.79px] object-cover"
                        alt="Image"
                        src="https://c.animaapp.com/ma5a6vdzkSZ8jz/img/image-2-1.png"
                    />
                </div>
            </div>
        </footer>
    );
};
