import { useParams } from "react-router-dom";
import RatingPage from "./RatingPage";
import Header from "../../components/Header";

const RateExperience = () => {
  const { userId } = useParams();

  return (
    <>
      <Header></Header>
      <div className="container mx-auto py-6 px-4 md:px-16">
        <RatingPage userId={userId} />
      </div>
    </>
  );
};

export default RateExperience;
