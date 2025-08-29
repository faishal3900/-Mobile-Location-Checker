import React, { useEffect, useState } from 'react';

const MobileLocation = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryName, setCountryName] = useState([]);
    const [countrySelected, setCountrySelected] = useState('');
    const [location, setLocation] = useState(null);

    // const API_KEY = '624aa73049ceb580036f47ec0f47623a';


    const countryNames = async () => {
        try {
            const res = await fetch('https://countriesnow.space/api/v0.1/countries/positions');
            const data = await res.json();
            setCountryName(data.data);
        } catch (error) {
            console.error('Error Fetching country data:', error);
        }
    };

    useEffect(() => {
        countryNames();
    }, []);

    const countrySelect = (e) => {
        setCountrySelected(e.target.value);
    };

    const API_KEY = import.meta.env.VITE_NUMVERIFY_API_KEY;
    console.log(API_KEY);

    const submitLocation = async (e) => {
        e.preventDefault();
        if (!phoneNumber) {
            alert('Please enter a phone number');
            return;
        }

        try {
            const res = await fetch(
                `https://apilayer.net/api/validate?access_key=${API_KEY}&number=${phoneNumber}&country_code=${countrySelected}`
            );
            const data = await res.json();
            setLocation(data);
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300 p-4">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg p-8 w-full max-w-md border border-yellow-400">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">📍 Mobile Location Checker</h2>

                <form className="flex flex-col gap-4" onSubmit={submitLocation}>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">📱 Mobile Number</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Enter phone number"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">🌍 Country</label>
                        <select
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer"
                            value={countrySelected}
                            onChange={countrySelect}
                        >
                            <option value="">-- Select a country --</option>
                            {countryName.map((country, index) => (
                                <option key={index} value={country.iso2} className=' hover:bg-yellow-400'>
                                    {country.name} ({country.iso2})
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 rounded transition duration-300 cursor-pointer "
                    >
                        🔍 Check Location
                    </button>
                </form>

                {location && (
                    <div className="mt-6 bg-white bg-opacity-50 rounded-lg p-4 shadow-inner">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">📊 Location Details:</h3>
                        <p><strong>Country:</strong> {location.country_name}</p>
                        <p><strong>Location:</strong> {location.location || 'N/A'}</p>
                        <p><strong>Carrier:</strong> {location.carrier || 'N/A'}</p>
                        <p><strong>Line Type:</strong> {location.line_type || 'N/A'}</p>
                        <p><strong>Valid:</strong> {location.valid ? 'Yes ✅' : 'No ❌'}</p>
                        <iframe
                            className='mx-auto mt-5'
                            title="Google Map"
                            src={`https://www.google.com/maps?q=${location.country_name},${location.location}&output=embed`}
                            width="300"
                            height="350"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                )}
            </div>
            <div>

            </div>
        </div>
    );
};

export default MobileLocation;
