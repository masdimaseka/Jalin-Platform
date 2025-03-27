export const FeatureCard = ({ imgUrl, title, desc }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 md:flex md:items-start">
      <img src={imgUrl} />
      <div className="md:ml-8">
        <h3 className="text-xl font-semibold mt-2">{title}</h3>
        <p className="mt-2">{desc}</p>
      </div>
    </div>
  );
};

export const StepCard = ({ num, title, desc }) => {
  return (
    <div className="md:flex md:items-start">
      <div className="text-3xl font-semibold bg-primary-jalin text-white rounded-full w-10 h-10 p-6 flex items-center justify-center">
        <h3>{num}</h3>
      </div>
      <div className="md:ml-8">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2">{desc}</p>
      </div>
    </div>
  );
};
