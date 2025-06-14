
export const FooterByAnima = (): JSX.Element => {
    const resourceLinks = [
        { text: "Contact us", isUnderlined: true },
        { text: "Top 10 Cities" },
        { text: "Top 100 Countries" },
        { text: "Support" },
        { text: "Developers" },
    ];

    return (
        <footer className="flex items-center gap-8 p-10 self-stretch w-full bg-[#e0b8f3]">
            <div className="flex flex-col min-w-60 items-start gap-6 self-stretch">
                <img
                    className="flex-none mt-[-1.75px] ml-[-1.75px]"
                    alt="Figma"
                    src="https://c.animaapp.com/ma9eugodIUDWMx/img/figma.svg"
                />

                <div className="flex items-center gap-4">
                    <img
                        className="w-[23.98px] h-6"
                        alt="X logo"
                        src="https://c.animaapp.com/ma9eugodIUDWMx/img/x-logo.svg"
                    />
                    <img
                        className="w-6 h-6"
                        alt="Logo instagram"
                        src="https://c.animaapp.com/ma9eugodIUDWMx/img/logo-instagram.svg"
                    />
                    <img
                        className="w-6 h-6"
                        alt="Logo youtube"
                        src="https://c.animaapp.com/ma9eugodIUDWMx/img/logo-youtube.svg"
                    />
                    <img
                        className="w-6 h-6"
                        alt="Linked in"
                        src="https://c.animaapp.com/ma9eugodIUDWMx/img/linkedin.svg"
                    />
                </div>
            </div>

            <div className="flex flex-col items-start gap-3 flex-1">
                <div className="flex flex-col items-start gap-2.5 pb-4 self-stretch w-full">
                    <div className="flex items-start self-stretch w-full">
                        <div className="text-[#fffdfd] w-fit mt-[-1.00px] font-body-strong font-[number:var(--body-strong-font-weight)] text-[length:var(--body-strong-font-size)] tracking-[var(--body-strong-letter-spacing)] leading-[var(--body-strong-line-height)] whitespace-nowrap [font-style:var(--body-strong-font-style)]">
                            Resources
                        </div>
                    </div>
                </div>

                {resourceLinks.map((link, index) => (
                    <div key={index} className="w-[89px] h-[22px]">
                        <div
                            className={`h-[22px] -top-px left-0 font-body-base font-[number:var(--body-base-font-weight)] text-[#fffdfd] text-[length:var(--body-base-font-size)] tracking-[var(--body-base-letter-spacing)] leading-[var(--body-base-line-height)] whitespace-nowrap [font-style:var(--body-base-font-style)] ${link.isUnderlined ? "underline" : ""}`}
                        >
                            {link.text}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col items-start gap-2.5 flex-1 self-stretch">
                <img
                    className="self-stretch w-full h-[41.13px] object-cover"
                    alt="Image"
                    src="https://c.animaapp.com/ma9eugodIUDWMx/img/image-2-1.png"
                />
            </div>
        </footer>
    );
};
