import React, { useEffect } from "react";
import PropTypes from "prop-types";

const CHero = ({
    id,
    className,
    mainContent,
    mediaContent,
    actionSection,
    stats,
}) => {
    const defaultTheme = {
        main: {
            title: "#000000",
            subtitle: "#4B5563",
            description: "#6B7280",
        },
        action: {
            primary: "#22C55E",
            secondary: "#000000",
            hover: "#16A34A",
        },
        stats: {
            number: "#000000",
            label: "#6B7280",
        },
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

        document.querySelectorAll(".animate-element").forEach((el, index) => {
            el.style.opacity = "0";
            el.style.transform = "translateY(20px)";
            el.style.transition = "all 0.5s ease-out";
            el.style.transitionDelay = `${index * 150}ms`;
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section id={id} className={`relative overflow-hidden ${className}`}>
            <div className="w-full mx-auto py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Main Content */}
                    <div className="space-y-8 animate-element">
                        {mainContent.badge && (
                            <span
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-opacity-10"
                                style={{
                                    backgroundColor: mainContent.badge.backgroundColor,
                                    color: mainContent.badge.textColor,
                                }}
                            >
                                {mainContent.badge.text}
                            </span>
                        )}

                        <h1
                            className="text-3xl tracking-tight"
                            style={{
                                color: mainContent.titleColor || defaultTheme.main.title,
                            }}
                        >
                            {mainContent.title}
                        </h1>

                        {mainContent.subtitle && (
                            <h2
                                className="text-3xl"
                                style={{
                                    color:
                                        mainContent.subtitleColor || defaultTheme.main.subtitle,
                                }}
                            >
                                {mainContent.subtitle}
                            </h2>
                        )}

                        <p
                            className="text-xl max-w-3xl"
                            style={{
                                color:
                                    mainContent.descriptionColor || defaultTheme.main.description,
                            }}
                        >
                            {mainContent.description}
                        </p>

                        {/* Action Buttons */}
                        {actionSection && (
                            <div className="flex flex-wrap gap-4 animate-element">
                                {actionSection.primaryButton}
                                {actionSection.secondaryButton}
                            </div>
                        )}

                        {/* Stats Section */}
                        {stats && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-8 animate-element">
                                {stats.map((stat, index) => (
                                    <div key={index} className="space-y-2">
                                        <p
                                            className="text-3xl font-normal"
                                            style={{
                                                color: stat.numberColor || defaultTheme.stats.number,
                                            }}
                                        >
                                            {stat.number}
                                        </p>
                                        <p
                                            className="text-sm"
                                            style={{
                                                color: stat.labelColor || defaultTheme.stats.label,
                                            }}
                                        >
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Media Content */}
                    <div className="relative animate-element">
                        {mediaContent.type === "image" ? (
                            <img
                                src={mediaContent.source}
                                alt={mediaContent.alt}
                                className={`w-full ${mediaContent.className || ""}`}
                            />
                        ) : mediaContent.type === "video" ? (
                            <video
                                src={mediaContent.source}
                                autoPlay={mediaContent.autoPlay}
                                loop={mediaContent.loop}
                                muted={mediaContent.muted}
                                className={`w-full ${mediaContent.className || ""}`}
                            />
                        ) : (
                            mediaContent.custom
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

CHero.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    mainContent: PropTypes.shape({
        badge: PropTypes.shape({
            text: PropTypes.string.isRequired,
            backgroundColor: PropTypes.string,
            textColor: PropTypes.string,
        }),
        title: PropTypes.string.isRequired,
        titleColor: PropTypes.string,
        subtitle: PropTypes.string,
        subtitleColor: PropTypes.string,
        description: PropTypes.string.isRequired,
        descriptionColor: PropTypes.string,
    }).isRequired,
    mediaContent: PropTypes.shape({
        type: PropTypes.oneOf(["image", "video", "custom"]).isRequired,
        source: PropTypes.string,
        alt: PropTypes.string,
        autoPlay: PropTypes.bool,
        loop: PropTypes.bool,
        muted: PropTypes.bool,
        className: PropTypes.string,
        custom: PropTypes.node,
    }).isRequired,
    actionSection: PropTypes.shape({
        primaryButton: PropTypes.node,
        secondaryButton: PropTypes.node,
    }),
    stats: PropTypes.arrayOf(
        PropTypes.shape({
            number: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            numberColor: PropTypes.string,
            labelColor: PropTypes.string,
        })
    ),
};

export default CHero;
