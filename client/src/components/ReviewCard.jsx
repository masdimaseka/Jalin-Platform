import { Icon } from "@iconify/react/dist/iconify.js";

const ReviewCard = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center mb-2">
        <Icon
          icon="material-symbols:star"
          color="orange"
          width="24"
          height="24"
        />
        <Icon
          icon="material-symbols:star"
          color="orange"
          width="24"
          height="24"
        />
        <Icon
          icon="material-symbols:star"
          color="orange"
          width="24"
          height="24"
        />
        <Icon
          icon="material-symbols:star"
          color="orange"
          width="24"
          height="24"
        />
        <Icon
          icon="material-symbols:star-half"
          color="orange"
          width="24"
          height="24"
        />
      </div>
      <p className="mb-4">
        The user experience is flawless, and the interface is intuitive. This
        has improved our workflow significantly, making complex tasks much
        easier to manage.
      </p>
      <div className="flex items-center gap-4">
        <img src="/avatar.png" className="w-10 h-10 rounded-full" />
        <h3 className="text-xl font-semibold">Dimas</h3>
      </div>
    </div>
  );
};

export default ReviewCard;
