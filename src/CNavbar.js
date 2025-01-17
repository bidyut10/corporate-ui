// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Menu, X } from "lucide-react";

const CNavbar = ({ logo, items, theme = "light", className, id }) => {
    const [isOpen, setIsOpen] = useState(false);

    const baseThemes = {
        light: {
            nav: "bg-white",
            text: "text-gray-800",
            hover: "hover:text-gray-600",
            button: "bg-blue-500 hover:bg-blue-600 text-white",
        },
        dark: {
            nav: "bg-black",
            text: "text-white",
            hover: "hover:text-gray-200",
            button: "bg-blue-600 hover:bg-blue-700 text-white",
        },
    };

    const currentTheme = baseThemes[theme];

    const getButtonClass = (buttonClassName) => {
        return buttonClassName || currentTheme.button;
    };

    return (
        <nav
            id={id}
            className={`w-full shadow-md ${currentTheme.nav} ${className}`}
        >
            <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex-shrink-0">
                        {typeof logo === "string" ? (
                            <img src={logo} alt="Logo" className="h-8 w-auto" />
                        ) : (
                            logo
                        )}
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                onClick={item.onClick}
                                className={`cursor-pointer ${currentTheme.text} ${currentTheme.hover
                                    } ${item.className || ""}`}
                            >
                                {item.type === "button" ? (
                                    <button
                                        className={`px-4 py-2 rounded-md ${getButtonClass(
                                            item.buttonClassName
                                        )}`}
                                    >
                                        {item.content}
                                    </button>
                                ) : (
                                    item.content
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        className={`md:hidden ${currentTheme.text}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className="fixed inset-0 bg-black/50"
                        onClick={() => setIsOpen(false)}
                    />

                    <div
                        className={`fixed right-0 top-0 h-full w-64 ${currentTheme.nav} p-4`}
                    >
                        <button
                            className={`mb-12 ${currentTheme.text}`}
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="h-6 w-6" />
                        </button>

                        <div className="flex flex-col gap-4">
                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={(e) => {
                                        item.onClick?.(e);
                                        setIsOpen(false);
                                    }}
                                    className={`cursor-pointer ${currentTheme.text} ${currentTheme.hover
                                        } ${item.className || ""}`}
                                >
                                    {item.type === "button" ? (
                                        <button
                                            className={`w-full px-4 py-2 rounded-md ${getButtonClass(
                                                item.buttonClassName
                                            )}`}
                                        >
                                            {item.content}
                                        </button>
                                    ) : (
                                        item.content
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

CNavbar.propTypes = {
    logo: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            content: PropTypes.node.isRequired,
            onClick: PropTypes.func,
            type: PropTypes.oneOf(["link", "button"]),
            className: PropTypes.string,
            buttonClassName: PropTypes.string,
        })
    ),
    theme: PropTypes.oneOf(["light", "dark"]),
    className: PropTypes.string,
    id: PropTypes.string,
};

export default CNavbar;
