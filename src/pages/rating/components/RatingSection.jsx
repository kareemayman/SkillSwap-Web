import RatingStars from "./RatingStars";

const RatingSection = ({ title, rating, setRating }) => {
  return (
    <div className="mb-6 glass-card border-[var(--color-card-border)] pl-4 py-1 rounded-lg shadow-md  w-full">
      <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-3">{title}</h3>
      <RatingStars rating={rating} setRating={setRating} />
    </div>
  );
};

export default RatingSection;