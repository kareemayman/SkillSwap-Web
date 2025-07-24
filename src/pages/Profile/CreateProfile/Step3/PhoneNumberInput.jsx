import React, { useState, useEffect, useMemo } from "react";
import { LuChevronDown, LuSearch, LuPhone } from "react-icons/lu";

export default function PhoneNumberInput({ onPhoneChange, initialCountryCode = "", initialPhoneNumber = "" }) {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [countrySearch, setCountrySearch] = useState("");
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [error, setError] = useState(null);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  // Fetch countries data when component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoadingCountries(true);
      setError(null);

      try {
        // const response = await fetch("https://restcountries.com/v3.1/all?fields=idd,flags,cca2");
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,idd,flags,cca2");
        if (!response.ok) throw new Error("Failed to fetch countries");

        const result = await response.json();

        // Process the data to create country codes
        const processedCountries = result
          .map((country) => {
            if (country.idd?.root && country.idd?.suffixes) {
              // Combine root with each suffix to create full country codes
              return country.idd.suffixes.map((suffix) => ({
                cca2: country.cca2,
                flag: country.flags.png,
                flagAlt: country.flags.alt || country.cca2,
                code: `${country.idd.root}${suffix}`,
                searchText: `${country.name.common} ${country.name.official} ${country.cca2} ${country.idd.root}${suffix}`,
              }));
            } else if (country.idd?.root) {
              // Some countries only have root without suffixes
              return [
                {
                  cca2: country.cca2,
                  flag: country.flags.png,
                  code: country.idd.root,
                  searchText: `${country.cca2} ${country.idd.root}`,
                },
              ];
            }
            return null;
          })
          .filter(Boolean)
          .flat()
          .sort((a, b) => a.cca2.localeCompare(b.cca2)); // Sort by country code

        setCountries(processedCountries);

        // Set initial country if provided
        if (initialCountryCode) {
          const initialCountry = processedCountries.find((c) => c.code === initialCountryCode);
          if (initialCountry) {
            setSelectedCountry(initialCountry);
          }
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching countries:", err);
      } finally {
        setIsLoadingCountries(false);
      }
    };

    fetchCountries();
  }, [initialCountryCode]);

  // Filter countries based on search
  const filteredCountries = useMemo(() => {
    if (!countrySearch) return countries;
    return countries.filter((country) => country.searchText.toLowerCase().includes(countrySearch.toLowerCase()));
  }, [countries, countrySearch]);

  // Handle country selection
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setCountrySearch("");
    setShowCountryDropdown(false);

    // Notify parent component
    onPhoneChange?.(country.code, phoneNumber);
  };

  // Handle phone number input
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Only allow numbers
    setPhoneNumber(value);

    // Notify parent component
    if (selectedCountry) {
      onPhoneChange?.(selectedCountry.code, value);
    }
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center space-x-2 text-red-700">
          <span className="text-sm">Failed to load country codes: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full flex flex-col md:flex-row md:justify-between md:items-end md:space-y-0">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[var(--color-text-primary)]">
          <LuPhone className="inline w-4 h-4 mr-1" />
          Phone Number
        </label>

        <div className="flex">
          {/* Country Code Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              disabled={isLoadingCountries}
              className="h-12 px-3 bg-white border border-gray-300 border-r-0 rounded-l-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoadingCountries ? (
                <div className="w-6 h-4 bg-gray-200 animate-pulse rounded"></div>
              ) : selectedCountry ? (
                <>
                  <img src={selectedCountry.flag} alt={selectedCountry.flagAlt} className="w-6 h-4 object-cover rounded-sm" />
                  <span className="text-gray-900 text-sm font-medium">{selectedCountry.cca2}</span>
                  <span className="text-gray-600 text-sm">{selectedCountry.code}</span>
                </>
              ) : (
                <span className="text-gray-500 text-sm">Select</span>
              )}
              <LuChevronDown className="w-4 h-4 text-gray-400 ml-1" />
            </button>

            {showCountryDropdown && !isLoadingCountries && (
              <div className="absolute z-10  mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                {/* Search input */}
                <div className="p-2 border-b border-gray-200">
                  <div className="relative">
                    <LuSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="country / code"
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500 "
                      autoFocus
                    />
                  </div>
                </div>

                {/* Countries list */}
                <div className="max-h-64 overflow-y-auto">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country, index) => (
                      <button
                        key={`${country.cca2}-${country.code}-${index}`}
                        type="button"
                        onClick={() => handleCountrySelect(country)}
                        className="w-full px-3 py-2 text-left hover:bg-blue-50 focus:outline-none focus:bg-blue-50 flex items-center space-x-2"
                      >
                        <img src={country.flag} alt={country.flagAlt} className="w-5 h-3 object-cover rounded-sm flex-shrink-0" />
                        <span className="text-gray-900 font-medium text-sm min-w-0">{country.cca2}</span>
                        <span className="text-gray-600 text-sm">{country.code}</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-gray-500 text-center text-sm">No countries found</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Phone Number Input */}
          <input
            type="tel"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="flex-1 h-12 px-4 bg-white border border-gray-300 rounded-r-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500"
            disabled={!selectedCountry}
          />
        </div>
      </div>

      {/* Selected phone display */}
      {selectedCountry && phoneNumber && (
        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2">
            <img src={selectedCountry.flag} alt={selectedCountry.flagAlt} className="w-5 h-3 object-cover rounded-sm" />
            <span className="text-sm font-medium text-green-900">
              Complete Phone: {selectedCountry.code} {phoneNumber}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
