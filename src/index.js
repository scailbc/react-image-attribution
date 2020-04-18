import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const MODE = {
    HIDDEN: "hidden", // do not show attribution
    OUTSIDE: "outside", // show attribution outside the image
    OVERLAY: "overlay", // show attribution over the image
};

const VALID_POSITION = [
    "topleft",
    "topcenter",
    "topright",
    "bottomleft",
    "bottomcenter",
    "bottomright",
];

function ImageAttribution(props) {
    const {
        attributionText,
        attributionTextClassName,
        attributionTextComponent,
        attributionTextStyle,
        author,
        children,
        containerClassName,
        containerComponent,
        containerStyle,
        dataAttributes,
        license,
        mode,
        position,
        source,
        title,
        ...imageProps
    } = props;

    let dataAttributesProps;
    if (dataAttributes) {
        dataAttributesProps = {
            "data-author": author,
            "data-license": license,
            "data-source": source,
            "data-title": title,
        };
    }

    function splitPosition(position) {
        const validVertical = ["top", "bottom"];
        if (VALID_POSITION.indexOf(position) < 0) {
            // Invalid position value, use default
            position = ImageAttribution.defaultProps.position;
        }
        const vertical = validVertical.filter((v) => position.startsWith(v))[0];
        return {
            vertical: position.substring(0, vertical.length),
            horizontal: position.substring(vertical.length, position.length),
        };
    }

    function renderAttributionText() {
        if (attributionText) {
            return attributionText;
        }
        if (!author && !license && !source && !title) {
            return null;
        }

        let text = "";

        if (title) {
            text += `"${title}" `;
        } else if (author || license || source) {
            text += "Picture";
        }

        if (author) {
            text += `by ${author}`;
        }

        if (license) {
            if (author || title) {
                text += `, licensed under ${license}`;
            } else {
                text += `Licensed under ${license}`;
            }
        }
        return text;
    }

    // Components
    const ImageComponent = children || (
        <img {...dataAttributesProps} {...imageProps} />
    );
    const ContainerComponent = containerComponent;
    const TextComponent = attributionTextComponent;

    // Derived props
    const { horizontal, vertical } = splitPosition(position);
    const isTop = vertical === "top";

    switch (mode) {
        case MODE.HIDDEN:
            return ImageComponent;

        case MODE.OUTSIDE:
            // eslint-disable-next-line no-case-declarations
            const descriptionComponent = (
                <TextComponent
                    style={attributionTextStyle}
                    className={
                        attributionTextClassName ||
                        `image-attribution-outside-attribution-text`
                    }
                >
                    {attributionText || renderAttributionText()}
                </TextComponent>
            );
            return (
                <ContainerComponent
                    style={{ textAlign: horizontal, ...containerStyle }}
                    className={
                        containerClassName ||
                        "image-attribution-outside-container"
                    }
                >
                    {isTop ? descriptionComponent : null}
                    {ImageComponent}
                    {!isTop ? descriptionComponent : null}
                </ContainerComponent>
            );

        case MODE.OVERLAY:
        default:
            return (
                <ContainerComponent
                    style={{ textAlign: horizontal, ...containerStyle }}
                    className={
                        containerClassName ||
                        "image-attribution-overlay-container"
                    }
                >
                    {ImageComponent}
                    <TextComponent
                        style={attributionTextStyle}
                        className={
                            attributionTextClassName ||
                            `${`image-attribution-overlay-attribution-text`} ${vertical} ${horizontal}`
                        }
                    >
                        {attributionText || renderAttributionText()}
                    </TextComponent>
                </ContainerComponent>
            );
    }
}

ImageAttribution.propTypes = {
    attributionText: PropTypes.string,
    attributionTextClassName: PropTypes.string,
    attributionTextComponent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
    ]),
    attributionTextStyle: PropTypes.any,
    author: PropTypes.string,
    containerClassName: PropTypes.string,
    containerComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    containerStyle: PropTypes.any,
    dataAttributes: PropTypes.bool,
    license: PropTypes.string,
    mode: PropTypes.oneOf(Object.values(MODE)),
    position: PropTypes.oneOf(VALID_POSITION),
    source: PropTypes.string,
    title: PropTypes.string,
};

ImageAttribution.defaultProps = {
    containerComponent: "figure",
    dataAttributes: true,
    attributionTextComponent: "figcaption",
    mode: MODE.OVERLAY,
    position: "bottomright",
};

export default ImageAttribution;
