import React, { useState } from 'react';
import './DataZoom.css'; // 自定义样式

const DataZoom = () => {
    const dateList = [
        "Mer31", "Apr1", "Apr2", "Apr4", "Apr5", "Apr6", "Apr7", "Apr8", "Apr9", "Apr10",
        "Apr11", "Apr12", "Apr13", "Apr14", "Apr15", "Apr16", "5PM", "Apr18", "Apr19", "Apr20"
    ];

    const [startValue, setStartValue] = useState(0);
    const [endValue, setEndValue] = useState(100);
    const [dateRange, setDateRange] = useState({ start: dateList[0], end: dateList[dateList.length - 1] });

    const handleStartChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value < endValue) {
            setStartValue(value);
            updateDateRange(value, endValue);
        }
    };

    const handleEndChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value > startValue) {
            setEndValue(value);
            updateDateRange(startValue, value);
        }
    };

    const updateDateRange = (start, end) => {
        const startIndex = Math.floor((start / 100) * (dateList.length - 1));
        const endIndex = Math.floor((end / 100) * (dateList.length - 1));
        setDateRange({ start: dateList[startIndex], end: dateList[endIndex] });
    };

    return (
        <div className="slider-container">
            <div className="slider">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={startValue}
                    onChange={handleStartChange}
                    className="slider-thumb left"
                />
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={endValue}
                    onChange={handleEndChange}
                    className="slider-thumb right"
                />
                <div className="slider-track">
                    <div
                        className="slider-range"
                        style={{ left: `${startValue}%`, width: `${endValue - startValue}%` }}
                    />
                </div>
            </div>
            <div className="date-range-display">
                <p>Start Date: {dateRange.start}</p>
                <p>End Date: {dateRange.end}</p>
            </div>
        </div>
    );
};

export default DataZoom;