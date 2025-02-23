import React from "react";
import {IKImage} from 'imagekitio-react';
import type {ImageProps} from "../types/common";


const Image: React.FC<ImageProps> = ({path, src, className, w, h, alt = ''}) => {
    const urlEndpoint = import.meta.env.VITE_IK_URL_ENDPOINT;
    const loading = 'lazy';
    const transformation = w || h ? [{width: w?.toString(), height: h?.toString()}] : [];
    // 低质量图片占位
    const lqip = {active: true, quality: 20};

    return (
        <IKImage
            urlEndpoint={urlEndpoint}
            path={path || undefined}
            src={src}
            className={className}
            loading={loading}
            lqip={lqip}
            width={w}
            height={h}
            alt={alt}
            transformation={transformation}
        />
    );
};

export default Image;