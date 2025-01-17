/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";

/**
 * CAvatarGroup Component
 *
 * A reusable component for displaying a group of user avatar images with customizable text and alignment.
 *
 * @param {Array<string>} images - Array of image URLs for avatars.
 * @param {number} imageSize - Size of each avatar in rem units.
 * @param {string} text - Text to display below the avatars.
 * @param {number} textSize - Font size of the text in rem units.
 * @param {"start" | "center" | "end"} textAlign - Alignment of avatars and text.
 *
 * @example
 * <CAvatarGroup
 *   images={['url1', 'url2']}
 *   imageSize={4}
 *   text="Team Members"
 *   textSize={1.5}
 *   textAlign="center"
 * />
 */
const CAvatarGroup = ({ images, imageSize, text, textSize, textAlign }) => {
    // Map textAlign to Tailwind classes
    const justifyClass =
        textAlign === "center"
            ? "justify-center"
            : textAlign === "end"
                ? "justify-end"
                : "justify-start";

    const textAlignClass =
        textAlign === "center"
            ? "text-center"
            : textAlign === "end"
                ? "text-right"
                : "text-left";

    return (
        <div className="user-avatar-group">
            <div className={`flex flex-row ${justifyClass}`}>
                <div className="relative flex flex-row items-center">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`User ${index + 1}`}
                            className="rounded-full shadow-lg"
                            style={{
                                width: `${imageSize}rem`,
                                height: `${imageSize}rem`,
                                zIndex: images.length - index,
                                marginLeft: index === 0 ? 0 : "-10px",
                            }}
                        />
                    ))}
                </div>
            </div>

            {text && (
                <p
                    className={`mt-4 ${textAlignClass}`}
                    style={{ fontSize: `${textSize}rem` }}
                >
                    {text}
                </p>
            )}
        </div>
    );
};

CAvatarGroup.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    imageSize: PropTypes.number,
    text: PropTypes.string,
    textSize: PropTypes.number,
    textAlign: PropTypes.oneOf(["start", "center", "end"]),
};

CAvatarGroup.defaultProps = {
    images: [],
    imageSize: 5, // Default avatar size in rem
    text: "",
    textSize: 2, // Default text size in rem
    textAlign: "center",
};

export default CAvatarGroup;
