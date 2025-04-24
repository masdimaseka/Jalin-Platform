import { useEffect, useState } from "react";
import { useCreateTransaksiPoint } from "../../queries/penjahit/penjahitMutation";
import { usePointProducts } from "../../queries/penjahit/penjahitQuery";
import toast from "react-hot-toast";

const insertSnapScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src =
      import.meta.env.VITE_NODE_ENV === "production"
        ? "https://app.midtrans.com/snap/snap.js"
        : "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_MIDTRANS_CLIENT_KEY
    );
    script.onload = () => resolve(true);
    document.body.appendChild(script);
  });
};

const ListPointProduct = ({ penjahit }) => {
  const { data: pointProduct } = usePointProducts();

  const { mutateAsync: createTransaksiPoint } = useCreateTransaksiPoint();

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    insertSnapScript();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProduct(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleCheckout = async (item) => {
    const transaksiData = {
      idPointProduct: item._id,
      idPenjahit: penjahit,
    };

    try {
      const response = await createTransaksiPoint(transaksiData);

      const snapToken = response.token;

      window.snap.pay(snapToken.token, {
        // Optional
        onSuccess: function (result) {
          console.log(result);
          toast.success("Transaksi berhasil!");
        },
        // Optional
        onPending: function (result) {
          console.log(result);
          toast.error("Transaksi pending!");
        },
        // Optional
        onError: function (result) {
          console.log(result);
          toast.error("Transaksi gagal!");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const sortedPointProduct = pointProduct?.sort((a, b) => {
    if (a.point < b.point) return -1;
    if (a.point > b.point) return 1;
    return 0;
  });

  return (
    <div className="flex flex-wrap gap-4">
      {sortedPointProduct?.map((item) => (
        <div key={item._id} className="card bg-base-100 w-80 shadow-sm">
          <div className="card-body flex justify-between gap-8">
            <div>
              <img src={`/${item.pointName}.svg`} className="w-16 mb-4" />
              <h1 className="text-lg sm:text-2xl font-semibold mb-1">
                {item.pointName}
              </h1>
              <p>
                Akan mendapatkan{" "}
                <span className={`text-primary-jalin inline font-semibold`}>
                  <img src="/jalinPoint.svg" className="w-4 inline" />
                  {Number(item.point).toLocaleString("id-ID", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>{" "}
                point
              </p>
            </div>
            <div className="flex gap-2 items-center bg-blue-50 px-4 py-2 rounded-lg">
              <h3 className="text-error text-sm line-through">
                {Number(item.price + 2000).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                })}
              </h3>
              <h3 className="text-lg font-medium">
                {Number(item.price).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                })}
              </h3>
            </div>
            <button
              onClick={() => setSelectedProduct(item)}
              className="btn btn-primary"
            >
              Beli
            </button>
          </div>
        </div>
      ))}

      {selectedProduct && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setSelectedProduct(null)}
          ></div>

          <dialog open className="modal z-50">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-6">
                Konfirmasi Pesanan Kamu!
              </h3>
              <div className="my-4">
                <div className="flex gap-2 items-center mb-4">
                  <img
                    src={`/${selectedProduct.pointName}.svg`}
                    className="w-8"
                    alt=""
                  />
                  <h1 className="text-lg sm:text-2xl font-semibold ">
                    {selectedProduct.pointName}
                  </h1>
                </div>
                <p>
                  Akan mendapatkan{" "}
                  <span className="text-primary-jalin inline font-semibold">
                    <img src="/jalinPoint.svg" className="w-4 inline" alt="" />
                    {Number(selectedProduct.point).toLocaleString("id-ID", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </span>{" "}
                  point
                </p>
              </div>
              <div className="flex gap-2 items-center bg-blue-50 px-4 py-2 mb-8 rounded-lg">
                <h3 className="text-error text-sm line-through">
                  {Number(selectedProduct.price + 2000).toLocaleString(
                    "id-ID",
                    {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }
                  )}
                </h3>
                <h3 className="text-lg font-medium">
                  {Number(selectedProduct.price).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </h3>
              </div>
              <div className="modal-action flex flex-col">
                <button
                  className="btn btn-primary w-full"
                  onClick={() => handleCheckout(selectedProduct)}
                >
                  Bayar Sekarang
                </button>
                <button
                  className="btn bg-none font-light"
                  onClick={() => setSelectedProduct(null)}
                >
                  Batal
                </button>
              </div>
            </div>
          </dialog>
        </>
      )}
    </div>
  );
};

export default ListPointProduct;
