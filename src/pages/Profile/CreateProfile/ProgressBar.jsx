import React from "react";

export default function ProgressBar({ activeStep }) {
  const elements = renderSteps(+activeStep);

  return (
    <div className="relative w-full my-8">
      <div className="absolute w-11/12 left-8 h-1 border bg-white top-4 z-0"></div>
      <ol className="w-full flex items-center justify-between z-10">
        {elements.map((el, i) => (
          <li key={i + 1} className="flex flex-col z-10 justify-start gap-4 min-h-24">
            {el}
          </li>
        ))}
      </ol>
    </div>
  );
}

function renderSteps(activeStep = 1) {
  const stepsTitles = ["Personal Info", "Skills", "Additional Details", "Review"];

  const stepsElements = [];

  for (let i = 0; i < stepsTitles.length; i++) {
    stepsElements.push(
      <>
        <div
          className={`flex justify-center items-center w-8 h-8 rounded-full ${
            i + 1 <= activeStep ? "bg-green-400 ring-green-200" : "bg-gray-100 ring-white"
          } rounded-full ring-0 sm:ring-8 shrink-0`}
        >
          {i + 1 < activeStep ? (
            <svg className="w-2.5 h-2.5 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
              <path strokeWidth={4} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M1 5.917 5.724 10.5 15 1.5" />
            </svg>
          ) : (
            <p className={`p-2 font-semibold ${i + 1 <= activeStep ? "text-white" : "text-[--color-text-primary]"}`}>{i + 1}</p>
          )}
        </div>
        <h3 className="font-medium text-[--color-text-primary] ">
          {stepsTitles[i].split(" ").map((t) => (
            <>
              <span>{t}</span>
              <br></br>
            </>
          ))}
        </h3>
      </>
    );
  }

  return stepsElements;
}
