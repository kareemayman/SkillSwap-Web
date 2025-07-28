import React, { useState, useEffect, useMemo } from "react";
import { LuChevronDown, LuSearch, LuMapPin, LuGlobe } from "react-icons/lu";

export default function CountryCitySelector({ onSelectionChange, initialCountry = "", initialCity = "" }) {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [countrySearch, setCountrySearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [error, setError] = useState(null);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  // Fetch countries data when component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoadingCountries(true);
      setError(null);

      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries");
        if (!response.ok) throw new Error("Failed to fetch countries");

        const result = await response.json();
        if (result.error) throw new Error(result.msg || "API returned an error");

        setCountries(result.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching countries:", err);
      } finally {
        setIsLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  // Filter countries based on search
  const filteredCountries = useMemo(() => {
    if (!countrySearch) return countries;
    return countries.filter((country) => country.country.toLowerCase().includes(countrySearch.toLowerCase()));
  }, [countries, countrySearch]);

  // Get cities for selected country
  const availableCities = useMemo(() => {
    const country = countries.find((c) => c.country === selectedCountry);
    return country ? country.cities : [];
  }, [countries, selectedCountry]);

  // Filter cities based on search
  const filteredCities = useMemo(() => {
    if (!citySearch) return availableCities;
    return availableCities.filter((city) => city.toLowerCase().includes(citySearch.toLowerCase()));
  }, [availableCities, citySearch]);

  // Handle country selection
  const handleCountrySelect = (country) => {
    setSelectedCountry(country.country);
    setSelectedCity(""); // Reset city when country changes
    setCountrySearch("");
    setShowCountryDropdown(false);

    // Notify parent component
    onSelectionChange?.(country.country, "");
  };

  // Handle city selection
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setCitySearch("");
    setShowCityDropdown(false);

    // Notify parent component
    onSelectionChange?.(selectedCountry, city);
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center space-x-2 text-red-700">
          <span className="text-sm">Failed to load countries: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full flex flex-col md:flex-row md:justify-between md:items-end md:space-y-0">
      <div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
        {/* Country Selector */}
        <div className="relative">
          <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
            <LuGlobe className="inline w-4 h-4 mr-1" />
            Country
          </label>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              disabled={isLoadingCountries}
              className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-card-border)] focus:border-[var(--color-card-border)] disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-between">
                <span className={selectedCountry ? "text-gray-900" : "text-gray-500"}>
                  {isLoadingCountries ? "Loading countries..." : selectedCountry || "Select a country"}
                </span>
                <LuChevronDown className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            {showCountryDropdown && !isLoadingCountries && (
              <div className="absolute z-10 w-full mt-1 bg-slate-50 border border-gray-300 rounded-lg shadow-lg">
                {/* Search input */}
                <div className="p-3 border-b border-gray-200">
                  <div className="relative">
                    <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search countries..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-slate-50 focus:ring-[var(--color-card-border)] focus:border-[var(--color-card-border)] text-[var(--color-text-dark)]"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Countries list */}
                <div className="max-h-60 overflow-y-auto">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                      <button
                        key={country.iso2}
                        type="button"
                        onClick={() => handleCountrySelect(country)}
                        className="w-full px-4 py-3 text-left hover:bg-blue-50 focus:outline-none focus:ring-[var(--color-card-border)]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-gray-900">{country.country}</span>
                          <span className="text-xs text-gray-500">{country.iso2}</span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-center">No countries found</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* City Selector */}

        <div className="relative">
          <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
            <LuMapPin className="inline w-4 h-4 mr-1" />
            City
          </label>

          <div className="relative">
            <button
              type="button"
              onClick={() => selectedCountry && setShowCityDropdown(!showCityDropdown)}
              disabled={!selectedCountry}
              className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-card-border)] focus:border-[var(--color-card-border)]"
            >
              <div className="flex items-center justify-between">
                <span className={selectedCity ? "text-gray-900" : "text-gray-500"}>
                  {!selectedCountry ? "Select a country first" : selectedCity || "Select a city"}
                </span>
                <LuChevronDown className={`w-5 h-5 ${!selectedCountry ? "text-gray-300" : "text-gray-400"}`} />
              </div>
            </button>

            {showCityDropdown && selectedCountry && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                {/* Search input */}
                <div className="p-3 border-b border-gray-200">
                  <div className="relative">
                    <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search cities..."
                      value={citySearch}
                      onChange={(e) => setCitySearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-card-border)] focus:border-[var(--color-card-border)] text-[var(--color-text-dark)]"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Cities list */}
                <div className="max-h-60 overflow-y-auto">
                  {filteredCities.length > 0 ? (
                    filteredCities.map((city, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleCitySelect(city)}
                        className="w-full px-4 py-3 text-left hover:bg-blue-50 focus:outline-none focus:ring-[var(--color-card-border)]"
                      >
                        <span className="text-gray-900">{city}</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-center">No cities found</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Selected values display */}
      {(selectedCountry || selectedCity) && (
        <div className="p-3 bg-green-50 rounded-lg border border-green-200 flex gap-2">
          <p className="text-sm font-medium text-green-900 mb-1">Selected Location:</p>
          <p className="text-sm text-green-700">{selectedCity && selectedCountry ? `${selectedCity}, ${selectedCountry}` : selectedCountry}</p>
        </div>
      )}
    </div>
  );
}
