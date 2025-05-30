import { Icon } from "@iconify/react/dist/iconify.js";

export const InfoTransaksiModal = ({ isOpen, onClose, transaksiData }) => {
  console.log(transaksiData);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={onClose}
      ></div>
      <dialog open className="modal z-50">
        <div className="modal-box">
          <form method="dialog">
            <button
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-6">Pekerjaan Telah Selesai</h3>
          <div className="mb-6">
            <p className="mb-2">Tanggal selesai : </p>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p>
                {new Date(transaksiData?.updatedAt).toLocaleString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "UTC",
                })}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <p className="mb-2">Hasil pekerjaan : </p>
            <img
              src={transaksiData?.imageSelesai}
              className="w-full h-50 object-cover rounded-lg"
            />
          </div>

          <div>
            <p className="mb-2">Review : </p>
            {transaksiData?.review.length > 0 ? (
              <div>
                <div className="flex items-center mt-2 mb-2 gap-2">
                  <img
                    src={transaksiData?.user?.profileImg || "/avatar.png"}
                    alt="avatar"
                    className="rounded-full w-6 h-6"
                  />
                  <div className="flex items-center gap-2 max-w-[200px]">
                    <h2 className="text-md font-semibold truncate flex-1">
                      {transaksiData?.user?.name}
                    </h2>
                    <Icon
                      icon="material-symbols:verified-rounded"
                      width="20"
                      height="20"
                      className="text-primary-jalin"
                    />
                  </div>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex items-center gap-2 ">
                    <Icon
                      icon="material-symbols:star-rounded"
                      width="24"
                      height="24"
                      color={
                        transaksiData.review[0].rating >= 1 ? "gold" : "gray"
                      }
                    />
                    <Icon
                      icon="material-symbols:star-rounded"
                      width="24"
                      height="24"
                      color={
                        transaksiData.review[0].rating >= 2 ? "gold" : "gray"
                      }
                    />
                    <Icon
                      icon="material-symbols:star-rounded"
                      width="24"
                      height="24"
                      color={
                        transaksiData.review[0].rating >= 3 ? "gold" : "gray"
                      }
                    />
                    <Icon
                      icon="material-symbols:star-rounded"
                      width="24"
                      height="24"
                      color={
                        transaksiData.review[0].rating >= 4 ? "gold" : "gray"
                      }
                    />
                    <Icon
                      icon="material-symbols:star-rounded"
                      width="24"
                      height="24"
                      color={
                        transaksiData.review[0].rating >= 5 ? "gold" : "gray"
                      }
                    />
                  </div>
                  <p className="mt-2 text-sm">
                    {transaksiData.review[0].content}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-gray-100 rounded-lg">
                <p>Belum ada review</p>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
};
