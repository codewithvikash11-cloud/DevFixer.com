"use client";
import React, { useState, useEffect } from 'react';

export default function ColorConverter() {
    const [hex, setHex] = useState('#6366f1');
    const [rgb, setRgb] = useState('rgb(99, 102, 241)');

    // Simple conversion logic
    const hexToRgb = (hex) => {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
    }

    const rgbToHex = (r, g, b) => {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    const handleHexChange = (val) => {
        setHex(val);
        const rgbVal = hexToRgb(val);
        if (rgbVal) setRgb(rgbVal);
    }

    const handleRgbChange = (val) => {
        setRgb(val);
        const rgbValues = val.match(/\d+/g);
        if (rgbValues && rgbValues.length === 3) {
            setHex(rgbToHex(parseInt(rgbValues[0]), parseInt(rgbValues[1]), parseInt(rgbValues[2])));
        }
    }

    return (
        <div className="grid md:grid-cols-2 gap-8 h-[500px]">
            <div className="flex flex-col gap-6">
                <div>
                    <label className="text-sm font-bold text-gray-400 mb-2 block">HEX Color</label>
                    <input
                        type="text"
                        className="w-full bg-[#1e293b] border border-[#334155] rounded-xl p-4 font-mono text-lg text-white outline-none focus:border-pink-500"
                        value={hex}
                        onChange={(e) => handleHexChange(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-sm font-bold text-gray-400 mb-2 block">RGB Color</label>
                    <input
                        type="text"
                        className="w-full bg-[#1e293b] border border-[#334155] rounded-xl p-4 font-mono text-lg text-white outline-none focus:border-pink-500"
                        value={rgb}
                        onChange={(e) => handleRgbChange(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex flex-col items-center justify-center bg-[#1e293b] border border-[#334155] rounded-2xl relative overflow-hidden">
                <div
                    className="absolute inset-0 transition-colors duration-300"
                    style={{ backgroundColor: hex }}
                ></div>
                <div className="relative z-10 bg-black/50 backdrop-blur-md px-6 py-3 rounded-xl">
                    <span className="text-white font-mono font-bold text-xl">{hex}</span>
                </div>
            </div>
        </div>
    );
}
