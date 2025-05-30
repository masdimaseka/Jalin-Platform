import { Icon } from "@iconify/react/dist/iconify.js";

const CustomHeader = ({ dataUser }) => {
  return (
    <div className="p-4 border-2 rounded-xl border-gray-200 w-full">
      <div className="flex  items-center  gap-2">
        <img
          src={dataUser.image || "/avatar.png"}
          alt="avatar"
          className="rounded-full w-8 h-8"
        />
        <div className="flex items-center gap-2 max-w-[100px] lg:max-w-[200px]">
          <h2 className="text-md font-semibold truncate flex-1">
            {dataUser.name}
          </h2>
          <Icon
            icon="material-symbols:verified-rounded"
            width="20"
            height="20"
            className="text-primary-jalin"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomHeader;
