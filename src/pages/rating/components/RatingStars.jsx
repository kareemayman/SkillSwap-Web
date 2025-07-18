// import React from 'react';
// const RatingStars = ({ rating, setRating, label }) => {
//   return (
//     <div className="mb-4">
//       {label && <p className="text-gray-700 mb-2">{label}</p>}
//       <div className="flex space-x-1">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <button
//             key={star}
//             onClick={() => setRating(star)}
//             className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
//           >
//             ★
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RatingStars;

import React from 'react';

const RatingStars = ({ rating, setRating, label }) => {
  const handleClick = (star) => (e) => {
    e.preventDefault(); // Prevent form submission
    setRating(star);
  };

  return (
    <div className="mb-4">
      {label && <p className="text-gray-700 mb-2">{label}</p>}
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={handleClick(star)}
            type="button" // Important: prevents form submission
            className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
            aria-label={`Rate ${star} star`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingStars;