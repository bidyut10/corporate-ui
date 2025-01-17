import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Menu, X } from "lucide-react";

/**
 * CSideNavbar Component
 *
 * @param {Object[]} items - Navigation items.
 * @param {string} theme - "light" or "dark".
 * @param {boolean} desktop - Default visibility on desktop.
 */

const CSideNavbar = ({ items, theme = "light", desktop = true }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState(theme);

    useEffect(() => {
        setCurrentTheme(theme || "light");
    }, [theme]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(desktop);
            } else {
                setIsOpen(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [desktop]);

    const handleToggle = () => setIsOpen((prev) => !prev);

    const sidebarClasses = `
    fixed top-0 left-0 h-full shadow-lg transition-transform duration-300 ease-in-out z-50
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    ${currentTheme === "light" ? "bg-white text-black" : "bg-black text-white"}
  `;

    const toggleButtonClasses = `
    fixed cursor-pointer top-6 left-6 z-50 p-1 rounded-full
    ${currentTheme === "light" ? "bg-white text-black" : "bg-black text-white"}
  `;

    return (
        <div className="flex">
            <div className={sidebarClasses} style={{ width: "270px" }}>
                <nav className="p-4 mt-20">
                    <ul className="space-y-4 text-lg font-normal ml-4">
                        {items.map((item, index) => (
                            <li key={index}>
                                <button
                                    onClick={item.onClick}
                                    className="flex justify-center items-center gap-2 hover:text-[#b366ff]"
                                >
                                    {item.icon && <item.icon style={item.iconStyle} />}
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <button className={toggleButtonClasses} onClick={handleToggle}>
                {isOpen ? (
                    <X className="size-7" />
                ) : (
                    <Menu className="size-7" />
                )}
            </button>
        </div>
    );
};

CSideNavbar.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            icon: PropTypes.elementType,
            iconStyle: PropTypes.object,
            onClick: PropTypes.func.isRequired,
        })
    ).isRequired,
    theme: PropTypes.oneOf(["light", "dark"]),
    desktop: PropTypes.bool,
};

CSideNavbar.defaultProps = {
    theme: "light",
    desktop: true,
};

export default CSideNavbar;
