import React, { useState } from "react";
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
        authorLink,
        children,
        containerClassName,
        containerComponent,
        containerStyle,
        dataAttributes,
        hover,
        license,
        licenseLink,
        mode,
        onContainerMouseEnter,
        onContainerMouseLeave,
        position,
        source,
        sourceLink,
        title,
        titleLink,
        ...imageProps
    } = props;

    const [isHover, setIsHover] = useState(false);

    let dataAttributesProps;
    if (dataAttributes) {
        dataAttributesProps = {
            "data-author": author,
            "data-author-link": authorLink,
            "data-license": license,
            "data-license-link": licenseLink,
            "data-source": source,
            "data-source-link": sourceLink,
            "data-title": title,
            "data-title-link": titleLink,
        };
    }

    function handleHoverIn(e) {
        setIsHover(true);
        if (onContainerMouseEnter) {
            return onContainerMouseEnter(e);
        }
    }

    function handleHoverOut(e) {
        setIsHover(false);
        if (onContainerMouseLeave) {
            return onContainerMouseLeave(e);
        }
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

    function renderAttributionTextComponent() {
        if (attributionText) {
            return attributionText;
        }
        if (!author && !license && !source && !title) {
            return null;
        }

        return (
            <>
                {title ? (
                    <>
                        "<Link href={titleLink}>{title}</Link>"
                    </>
                ) : author || source ? (
                    <Link href={titleLink}>Picture</Link>
                ) : null}
                {author ? (
                    <>
                        <> by </> <Link href={authorLink}>{author}</Link>
                    </>
                ) : null}
                {source ? (
                    <>
                        <> from </> <Link href={sourceLink}>{source}</Link>
                    </>
                ) : null}
                {license ? (
                    author || title || source ? (
                        <>
                            , licensed under{" "}
                            <Link href={licenseLink}>{license}</Link>
                        </>
                    ) : (
                        <>
                            Licensed under{" "}
                            <Link href={licenseLink}>{license}</Link>
                        </>
                    )
                ) : null}
            </>
        );
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
                        `image-attribution-outside-attribution-text ${
                            hover && !isHover ? "hidden" : ""
                        }`
                    }
                >
                    {attributionText || renderAttributionTextComponent()}
                </TextComponent>
            );
            return (
                <ContainerComponent
                    style={{ textAlign: horizontal, ...containerStyle }}
                    className={
                        containerClassName ||
                        "image-attribution-outside-container"
                    }
                    onMouseEnter={handleHoverIn}
                    onMouseLeave={handleHoverOut}
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
                    onMouseEnter={handleHoverIn}
                    onMouseLeave={handleHoverOut}
                >
                    {ImageComponent}
                    <TextComponent
                        style={attributionTextStyle}
                        className={
                            attributionTextClassName ||
                            `${`image-attribution-overlay-attribution-text`} ${vertical} ${horizontal} ${
                                hover && !isHover ? "hidden" : ""
                            }`
                        }
                    >
                        {attributionText || renderAttributionTextComponent()}
                    </TextComponent>
                </ContainerComponent>
            );
    }
}

function Link({ children, href, ...otherProps }) {
    if (href) {
        return (
            <a href={href} {...otherProps}>
                {children}
            </a>
        );
    } else {
        return children;
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
    authorLink: PropTypes.string,
    containerClassName: PropTypes.string,
    containerComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    containerStyle: PropTypes.any,
    dataAttributes: PropTypes.bool,
    hover: PropTypes.bool,
    license: PropTypes.string,
    licenseLink: PropTypes.string,
    mode: PropTypes.oneOf(Object.values(MODE)),
    onContainerMouseEnter: PropTypes.func,
    onContainerMouseLeave: PropTypes.func,
    position: PropTypes.oneOf(VALID_POSITION),
    source: PropTypes.string,
    sourceLink: PropTypes.string,
    title: PropTypes.string,
    titleLink: PropTypes.string,
};

ImageAttribution.defaultProps = {
    attributionTextComponent: "figcaption",
    containerComponent: "figure",
    dataAttributes: true,
    hover: false,
    mode: MODE.OVERLAY,
    position: "bottomright",
};

export default ImageAttribution;
