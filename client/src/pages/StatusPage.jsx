import { useParams } from "react-router-dom";
import OnReviewRegister from "../components/status/OnReviewRegister";

const StatusPage = () => {
  const { status } = useParams();
  console.log(status);
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-8 justify-center items-center bg-white rounded-lg shadow py-8 px-4 lg:w-[60vw]">
        {status === "onReview" && <OnReviewRegister />}
      </div>
    </div>
  );
};

export default StatusPage;
