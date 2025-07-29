import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const PhoneInputComponent = ({ setForm }) => {
  const { t } = useTranslation();

  const countries = [
    {
      code: "+1",
      name: "United States",
      flag: (
        <svg fill="none" aria-hidden="true" className="h-4 w-4 me-2" viewBox="0 0 20 15">
          <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
          <mask id="a" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
            <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
          </mask>
          <g mask="url(#a)">
            <path
              fill="#D02F44"
              fillRule="evenodd"
              d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z"
              clipRule="evenodd"
            />
            <path fill="#46467F" d="M0 .5h8.4v6.533H0z" />
            <g filter="url(#filter0_d_343_121520)">
              <path
                fill="url(#paint0_linear_343_121520)"
                fillRule="evenodd"
                d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z"
                clipRule="evenodd"
              />
            </g>
          </g>
          <defs>
            <linearGradient id="paint0_linear_343_121520" x1=".933" x2=".933" y1="1.433" y2="6.1" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff" />
              <stop offset="1" stopColor="#F0F0F0" />
            </linearGradient>
            <filter
              id="filter0_d_343_121520"
              width="6.533"
              height="5.667"
              x=".933"
              y="1.433"
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1" />
              <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
              <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_343_121520" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_343_121520" result="shape" />
            </filter>
          </defs>
        </svg>
      ),
    },
    {
      code: "+44",
      name: "United Kingdom",
      flag: (
        <svg className="h-4 w-4 me-2" fill="none" viewBox="0 0 20 15">
          <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
          <mask id="b" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
            <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
          </mask>
          <g mask="url(#b)">
            <path fill="#0A17A7" d="M0 .5h19.6v14H0z" />
            <path
              fill="#fff"
              fillRule="evenodd"
              d="M-.898-.842L7.467 4.8V-.84h4.666V4.8l8.365-5.642L21.542.706l-6.614 4.46H19.6v4.667h-4.672l6.614 4.46-1.044 1.549L12.133 10.2v4.639H7.467V10.2L-.898 15.842l-1.044-1.548L4.672 9.833H0V5.166h4.672L-1.942.706z"
              clipRule="evenodd"
            />
            <path fill="#C8102E" d="M8.2.5v6.533H0v1.4h8.2V14.5h3.2V8.433h8.2v-1.4H11.4V.5z" />
            <path
              fill="#C8102E"
              d="M0 5.166h4.672L-.898.706l1.044-1.548L7.467 4.8V.5h1.4v4.3l7.321-4.642 1.044 1.548L12.133 5.166H19.6v1.4h-4.672l6.614 4.46-1.044 1.549L12.133 8.433v4.639h-1.4V8.433L3.412 12.575l-1.044-1.548L8.2 6.567H0z"
            />
          </g>
        </svg>
      ),
    },
    {
      code: "+61",
      name: "Australia",
      flag: (
        <svg className="h-4 w-4 me-2" fill="none" viewBox="0 0 20 15">
          <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
          <mask id="c" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
            <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
          </mask>
          <g mask="url(#c)">
            <path fill="#0052B4" d="M0 .5h19.6v14H0z" />
            <path
              fill="#fff"
              fillRule="evenodd"
              d="M-.898-.842L7.467 4.8V-.84h4.666V4.8l8.365-5.642L21.542.706l-6.614 4.46H19.6v4.667h-4.672l6.614 4.46-1.044 1.549L12.133 10.2v4.639H7.467V10.2L-.898 15.842l-1.044-1.548L4.672 9.833H0V5.166h4.672L-1.942.706z"
              clipRule="evenodd"
            />
            <path fill="#D80027" d="M8.2.5v6.533H0v1.4h8.2V14.5h3.2V8.433h8.2v-1.4H11.4V.5z" />
            <path
              fill="#D80027"
              d="M0 5.166h4.672L-.898.706l1.044-1.548L7.467 4.8V.5h1.4v4.3l7.321-4.642 1.044 1.548L12.133 5.166H19.6v1.4h-4.672l6.614 4.46-1.044 1.549L12.133 8.433v4.639h-1.4V8.433L3.412 12.575l-1.044-1.548L8.2 6.567H0z"
            />
          </g>
        </svg>
      ),
    },
    {
      code: "+49",
      name: "Germany",
      flag: (
        <svg className="w-4 h-4 me-2" fill="none" viewBox="0 0 20 15">
          <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
          <mask id="d" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
            <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
          </mask>
          <g mask="url(#d)">
            <path fill="#262626" d="M0 5.5h19.6V.5H0z" />
            <path fill="#F01515" d="M0 9.5h19.6V5.5H0z" />
            <path fill="#FFD521" d="M0 14.5h19.6V9.5H0z" />
          </g>
        </svg>
      ),
    },
    {
      code: "+33",
      name: "France",
      flag: (
        <svg className="w-4 h-4 me-2" fill="none" viewBox="0 0 20 15">
          <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
          <mask id="e" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
            <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
          </mask>
          <g mask="url(#e)">
            <path fill="#ED2939" d="M13.067 .5H19.6v14h-6.533z" />
            <path fill="#002395" d="M0 .5h6.533v14H0z" />
            <path fill="#fff" d="M6.533 .5h6.534v14H6.533z" />
          </g>
        </svg>
      ),
    },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  return (
    <div className=" w-[80%]">
      <label htmlFor="phone-input" className="font-bold text-[var(--color-text-primary)]">
                    {t("Phone number")}

      </label>
      <div className="flex items-center ">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-black bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none  dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button"
          >
            {selectedCountry.flag}
            {selectedCountry.code}
            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 z-10 bg-slate-50 divide-y divide-gray-100 rounded-lg shadow-sm w-52 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {countries.map((country) => (
                  <li key={country.code}>
                    <button
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <span className="inline-flex items-center">
                        {country.flag}
                        {country.name} ({country.code})
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="relative w-[80%]  ">
          <input
            type="text"
            id="phone-input"
            className="w-full sm:w-full md:w-[50%] lg:w-[67%] rounded-lg border-2 border-[#CEDAE8] h-12  placeholder-[#4A72B5] "
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="123-456-7890"
            onChange={(e) => {
              setForm((prev) => ({ ...prev, phone: e.target.value }));
            }}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PhoneInputComponent;
