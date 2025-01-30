import React from "react";
import { IKImage } from 'imagekitio-react';


interface ImageProps {
    path: string;
    className: string;
    width: number;
    height: number;
    alt: string;
}

const Image: React.FC<ImageProps> = ({ path, className, width, height, alt }) => {
    const urlEndpoint = import.meta.env.VITE_IK_URL_ENDPOINT;
    const loading = 'lazy';
    const lqip = { active: true, quality: 20 };

    return (
        <IKImage
            urlEndpoint={urlEndpoint}
            path={path}
            className={className}
            loading={loading}
            lqip={lqip}
            width={width}
            height={height}
            alt={alt}
        />
    );
};

export default Image;