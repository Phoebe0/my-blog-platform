import React from "react";
import { IKImage } from 'imagekitio-react';


interface ImageProps {
    path: string;
    className: string;
    w?: number;
    h?: number;
    alt?: string;

}

const Image: React.FC<ImageProps> = ({ path, className, w, h, alt = ''}) => {
    const urlEndpoint = import.meta.env.VITE_IK_URL_ENDPOINT;
    const loading = 'lazy';
    // 低质量图片占位
    const lqip = { active: true, quality: 20 };

    return (
        <IKImage
            urlEndpoint={urlEndpoint}
            path={path}
            className={className}
            loading={loading}
            lqip={lqip}
            width={w}
            height={h}
            alt={alt}
            transformation={w || h ? [{ width: w, height: h }] : []}
        />
    );
};

export default Image;