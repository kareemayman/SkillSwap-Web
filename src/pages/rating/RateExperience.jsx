import { useParams } from "react-router-dom";
import RatingPage from "./RatingPage";

const RateExperience = () => {
  const { userId } = useParams();

  return (
    <>
      <div className="container mx-auto py-6 px-4 md:px-16">
        <RatingPage userId={userId} />
      </div>
    </>
  );
};

export default RateExperience;
