import React, { useEffect } from "react";
// import { Loader2, CheckCircle, TriangleAlert } from "lucide-react";
import { LuLoaderCircle , LuCircleCheckBig, LuTriangleAlert } from "react-icons/lu";

export default function StatusOverlay({ status, onDismiss, autoDismissDelay = 1 }) {
  // auto dismiss after 1 second if successful
  useEffect(() => {
    let timeoutId;
    if (status.data && onDismiss) {
      timeoutId = setTimeout(() => {
        onDismiss();
      }, autoDismissDelay * 1000);
    }

    // Cleanup timeout on component unmount or when status changes
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [status.data, onDismiss, autoDismissDelay]);

  if (!status.loading && !status.error && !status.data) {
    return null;
  }

  // Determine background color based on status
  let overlayPrimaryColor = "bg-white";
  if (status.loading) {
    overlayPrimaryColor = "bg-blue-500/70";
  } else if (status.error) {
    overlayPrimaryColor = "bg-red-500/70";
  } else if (status.data) {
    overlayPrimaryColor = "bg-green-500/70";
  }

  return (
    <div className={`absolute inset-0 ${overlayPrimaryColor} flex items-center justify-center z-10 rounded-lg `}>
      <div className="text-center p-6">
        {status.loading && (
          <div className="flex flex-col items-center gap-3">
            <LuLoaderCircle  className="h-8 w-8 animate-spin text-white" />
            <p className="text-white text-sm font-medium">Please wait...</p>
          </div>
        )}

        {status.data && (
          <div className="flex flex-col items-center gap-3">
            <LuCircleCheckBig  className="h-8 w-8 text-white" />
            <p className="text-white text-sm font-medium">{status.data}</p>
            <button
              onClick={onDismiss}
              className={`flex items-center gap-2 mt-2 px-4 py-2 bg-white text-green-600 text-sm rounded-full hover:bg-gray-100 hover:cursor-pointer active:bg-gray-300 transition-colors duration-300`}
            >
              <span>Continue</span>
            </button>
          </div>
        )}

        {status.error && (
          <div className="flex flex-col items-center gap-3">
            <LuTriangleAlert  className="h-8 w-8 text-white" />
            <p className="text-white text-sm font-medium text-center max-w-xs">{status.error}</p>
            <button
              onClick={onDismiss}
              className="flex items-center gap-2 mt-2 px-4 py-2 bg-white text-red-600 text-sm rounded-full hover:bg-gray-100 hover:cursor-pointer active:bg-gray-200 transition-colors duration-200"
            >
              <span>Try Again</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
