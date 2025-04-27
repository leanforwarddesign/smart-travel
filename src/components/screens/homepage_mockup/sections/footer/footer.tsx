import React from "react";

export const FooterByAnima = (): JSX.Element => {
    // Resources links data for mapping
    const resourceLinks = [
        { text: "Contact us", underline: true },
        { text: "Best practices" },
        { text: "Colors" },
        { text: "Color wheel" },
        { text: "Support" },
        { text: "Developers" },
        { text: "Resource library" },
    ];

    return (
        <footer className="flex items-center gap-8 p-10 w-full bg-[#e0b8f3]">
            {/* Logo and social media section */}
            <div className="flex flex-col min-w-60 items-start gap-6">
                <img
                    className="flex-none mt-[-1.75px] ml-[-1.75px]"
                    alt="Figma"
                    src="https://c.animaapp.com/m9ziqhftNQs4Nv/img/figma.svg"
                />

                <div className="flex items-center gap-4">
                    <img
                        className="w-[23.98px] h-6"
                        alt="X logo"
                        src="https://c.animaapp.com/m9ziqhftNQs4Nv/img/x-logo.svg"
                    />
                    <img
                        className="w-6 h-6"
                        alt="Logo instagram"
                        src="https://c.animaapp.com/m9ziqhftNQs4Nv/img/logo-instagram.svg"
                    />
                    <img
                        className="w-6 h-6"
                        alt="Logo youtube"
                        src="https://c.animaapp.com/m9ziqhftNQs4Nv/img/logo-youtube.svg"
                    />
                    <img
                        className="w-6 h-6"
                        alt="Linked in"
                        src="https://c.animaapp.com/m9ziqhftNQs4Nv/img/linkedin.svg"
                    />
                </div>
            </div>

            {/* Resources section */}
            <div className="flex flex-col items-start gap-3 flex-1">
                <div className="flex flex-col items-start gap-2.5 pb-4 w-full">
                    <div className="flex items-start w-full">
                        <div className="text-[#fffdfd] font-body-strong font-[number:var(--body-strong-font-weight)] text-[length:var(--body-strong-font-size)] tracking-[var(--body-strong-letter-spacing)] leading-[var(--body-strong-line-height)] [font-style:var(--body-strong-font-style)]">
                            Resources
                        </div>
                    </div>
                </div>

                {/* Map through resource links */}
                {resourceLinks.map((link, index) => (
                    <div key={index} className="h-[22px] w-full">
                        <div
                            className={`text-[#fffdfd] font-body-base font-[number:var(--body-base-font-weight)] text-[length:var(--body-base-font-size)] tracking-[var(--body-base-letter-spacing)] leading-[var(--body-base-line-height)] [font-style:var(--body-base-font-style)] ${link.underline ? "underline" : ""}`}
                        >
                            {link.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Image section */}
            <div className="flex flex-col items-start gap-2.5 flex-1 self-stretch">
                <img
                    className="w-full h-[41.13px] object-cover"
                    alt="Image"
                    src="https://c.animaapp.com/m9ziqhftNQs4Nv/img/image-2-1.png"
                />
            </div>
        </footer>
    );
};
