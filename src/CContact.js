// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import PropTypes from "prop-types";

const ContactSection = ({
    id,
    className,
    header,
    primaryBox,
    secondaryBox,
    footer,
}) => {
    const defaultTheme = {
        header: "#000000",
        primary: {
            bg: "#000000",
            title: "#ffffff",
            subtitle: "#9CA3AF",
            hover: "#22C55E",
        },
        secondary: {
            bg: "#ffffff",
            title: "#000000",
            subtitle: "#4B5563",
            hover: "#22C55E",
        },
        footer: "#000000",
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fadeIn");
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll(".animate-card").forEach((el, index) => {
            el.style.opacity = "0";
            el.style.transform = "translateY(20px)";
            el.style.transition = "all 0.3s ease-out";
            el.style.transitionDelay = `${index * 100}ms`;
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // CSS for hover effect
    const getTrailIconStyles = (hoverColor) => ({
        transition: "all 0.3s ease",
        transform: "translateX(0)",
        "--hover-color": hoverColor || defaultTheme.primary.hover,
    });

    return (
        <footer
            id={id}
            className={`space-y-16 fade-in mt-32 ${className}`}
        >
            {/* Header Section */}
            <div className="w-full">
                {header.text.map((text, index) => (
                    <h2
                        key={index}
                        className="text-3xl leading-relaxed"
                        style={{ color: header.color || defaultTheme.header }}
                    >
                        {text}
                    </h2>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Primary Box */}
                <div
                    className="col-span-1 md:col-span-8 rounded-3xl p-8 group animate-card"
                    style={{
                        backgroundColor:
                            primaryBox.backgroundColor || defaultTheme.primary.bg,
                    }}
                >
                    <div className="flex justify-between items-start mb-6">
                        {primaryBox.leadIcon}
                        <div
                            className="text-[#1e1e1f] group-hover:text-[var(--hover-color)] transform group-hover:translate-x-1 transition-all duration-300"
                            style={getTrailIconStyles(primaryBox.hoverColor)}
                        >
                            {primaryBox.trailIcon}
                        </div>
                    </div>
                    <h3
                        className="text-2xl mb-3"
                        style={{
                            color: primaryBox.titleColor || defaultTheme.primary.title,
                        }}
                    >
                        {primaryBox.title}
                    </h3>
                    <p
                        className="mb-6"
                        style={{
                            color: primaryBox.subtitleColor || defaultTheme.primary.subtitle,
                        }}
                    >
                        {primaryBox.subtitle}
                    </p>
                    {primaryBox.actionButton}
                </div>

                {/* Secondary Box */}
                <div
                    className="col-span-1 md:col-span-4 border border-gray-100 rounded-3xl p-8 group animate-card"
                    style={{
                        backgroundColor:
                            secondaryBox.backgroundColor || defaultTheme.secondary.bg,
                    }}
                >
                    <div className="flex justify-between items-start mb-6">
                        {secondaryBox.leadIcon}
                        <div
                            className="text-gray-200 group-hover:text-[var(--hover-color)] transform group-hover:translate-x-1 transition-all duration-300"
                            style={getTrailIconStyles(secondaryBox.hoverColor)}
                        >
                            {secondaryBox.trailIcon}
                        </div>
                    </div>
                    <h3
                        className="text-2xl mb-3"
                        style={{
                            color: secondaryBox.titleColor || defaultTheme.secondary.title,
                        }}
                    >
                        {secondaryBox.title}
                    </h3>
                    <p
                        className="mb-6"
                        style={{
                            color:
                                secondaryBox.subtitleColor || defaultTheme.secondary.subtitle,
                        }}
                    >
                        {secondaryBox.subtitle}
                    </p>
                    {secondaryBox.actionButton}
                </div>
            </div>

            {/* Footer Section */}
            <div className="flex justify-between items-center gap-4">
                <div className="flex justify-center items-center gap-4">
                    <h1
                        className="text-md"
                        style={{ color: footer.textColor || defaultTheme.footer }}
                    >
                        {footer.text}
                    </h1>
                    <div className="flex justify-center items-center gap-4">
                        {footer.socialButtons}
                    </div>
                </div>
            </div>
        </footer>
    );
};

ContactSection.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    header: PropTypes.shape({
        text: PropTypes.arrayOf(PropTypes.string).isRequired,
        color: PropTypes.string,
    }).isRequired,
    primaryBox: PropTypes.shape({
        title: PropTypes.string.isRequired,
        titleColor: PropTypes.string,
        subtitle: PropTypes.string.isRequired,
        subtitleColor: PropTypes.string,
        backgroundColor: PropTypes.string,
        leadIcon: PropTypes.node.isRequired,
        trailIcon: PropTypes.node.isRequired,
        hoverColor: PropTypes.string,
        actionButton: PropTypes.node.isRequired,
    }).isRequired,
    secondaryBox: PropTypes.shape({
        title: PropTypes.string.isRequired,
        titleColor: PropTypes.string,
        subtitle: PropTypes.string.isRequired,
        subtitleColor: PropTypes.string,
        backgroundColor: PropTypes.string,
        leadIcon: PropTypes.node.isRequired,
        trailIcon: PropTypes.node.isRequired,
        hoverColor: PropTypes.string,
        actionButton: PropTypes.node.isRequired,
    }).isRequired,
    footer: PropTypes.shape({
        text: PropTypes.string.isRequired,
        textColor: PropTypes.string,
        socialButtons: PropTypes.node.isRequired,
    }).isRequired,
};

export default ContactSection;
