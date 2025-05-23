import React, { useMemo } from 'react';
import "./filter.css"
import "../app.css"

function Filter({ data, selectedCountry, setSelectedCountry, selectedEducation, setSelectedEducation }) {
    const countries = useMemo(() => {
        const set = new Set(data.map(row => row["Country of residence"]?.trim()).filter(Boolean));
        return ['All', ...Array.from(set).sort()];
    }, [data]);

    const educationLevels = useMemo(() => {
        const set = new Set(data.map(row => row["Current education level"]?.trim()).filter(Boolean));
        return ['All', ...Array.from(set).sort()];
    }, [data]);

    return (
        <div className='title'>
            <div className='filter'>
                <div className='selector'>
                    <label className='tag' htmlFor="countrySelect">
                        <img
                            src="./sliders-horizontal.svg"
                            style={{ width: "16px" }}
                        />Country: </label>
                    <select
                        id="countrySelect"
                        value={selectedCountry}
                        onChange={e => setSelectedCountry(e.target.value)}
                    >
                        {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                </div>

                <div className='selector'>
                    <label className='tag' htmlFor="educationSelect">
                        <img
                            src="./sliders-horizontal.svg"
                            style={{ width: "16px" }}
                        />Education Level: </label>
                    <select
                        id="educationSelect"
                        value={selectedEducation}
                        onChange={e => setSelectedEducation(e.target.value)}
                    >
                        {educationLevels.map(level => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='description'>
                <img
                    src="/square-mouse-pointer.svg"
                    alt="Square and Mouse Pointer"
                    style={{ width: "16px", marginTop: "4px" }}
                />
                <p>
                    Scroll, Hover and use Filters to explore the data
                </p>
            </div>
        </div>
    );
}

export default Filter;
