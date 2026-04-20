import { assets, footer_data } from "../assets/assets";

const Footer = () => {
    return (
        <footer className="bg-gray-100 px-6 md:px-16 pt-12 pb-6">

            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

                {/* Logo + Description */}
                <div>
                    <div className="flex items-center gap-2 mb-4 cursor-pointer">
                        <img src={assets.symbol} alt="logo" className="w-7 h-7" />
                        <h1 className="text-lg font-semibold text-gray-800">BlogX</h1>
                    </div>

                    <p className="text-gray-500 text-sm leading-relaxed">
                        This is your space to think out loud, to share what matters, and to write without filters.
                        Whether it's one word or a thousand, your story starts right here.
                    </p>
                </div>

                {/* Dynamic Sections */}
                {footer_data.map((section, index) => (
                    <div key={index}>
                        <h3 className="font-semibold text-gray-800 mb-3">
                            {section.title}
                        </h3>

                        {/* If Follow Us → show icons */}
                        {section.title === "Follow Us" ? (
                            <div className="flex items-center gap-4">
                                <img
                                    src={assets.facebook_icon}
                                    alt="facebook"
                                    className="w-10 h-10 cursor-pointer hover:scale-110 transition"
                                />
                                <img
                                    src={assets.twitter_icon}
                                    alt="twitter"
                                    className="w-10 h-10 cursor-pointer hover:scale-110 transition"
                                />
                                <img
                                    src={assets.googleplus_icon}
                                    alt="google"
                                    className="w-10 h-10 cursor-pointer hover:scale-110 transition"
                                />
                            </div>
                        ) : (
                            <ul className="space-y-2 text-gray-500 text-sm">
                                {section.links.map((link, i) => (
                                    <li
                                        key={i}
                                        className="hover:text-gray-800 cursor-pointer"
                                    >
                                        {link}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}

            </div>

            {/* Bottom */}
            <div className="border-t pt-4 text-center text-gray-500 text-sm">
                Copyright 2025 © BlogX All Right Reserved.
            </div>

        </footer>
    );
};

export default Footer;