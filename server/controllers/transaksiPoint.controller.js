import midtransClient from "midtrans-client";
import Penjahit from "../models/penjahit.model.js";
import PointProduct from "../models/pointProduct.model.js";
import TransaksiPoint from "../models/transaksiPoint.model.js";
import User from "../models/user.model.js";

let snap = new midtransClient.Snap({
  isProduction: true,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

export const createTransaksiPoint = async (req, res) => {
  try {
    const { idPenjahit, idPointProduct } = req.body;

    const penjahit = await Penjahit.findById(idPenjahit);
    const user = await User.findById(penjahit.user._id);
    const pointProduct = await PointProduct.findById(idPointProduct);

    const pointAwal = penjahit.point;

    const transaksiPoint = new TransaksiPoint({
      penjahit: penjahit._id,
      point: pointProduct._id,
      pointAwal: pointAwal,
      status: "pending",
    });
    await transaksiPoint.save();

    let parameter = {
      transaction_details: {
        order_id: transaksiPoint._id,
        gross_amount: pointProduct.price,
      },
      item_details: [
        {
          id: pointProduct._id,
          price: pointProduct.price,
          quantity: 1,
          name: pointProduct.pointName + " Jalin Point",
        },
      ],
      customer_details: {
        name: user.name,
        email: user.email,
        phone: user.noTelp,
        address: user.address,
      },
    };

    const token = await snap.createTransaction(parameter);

    res
      .status(201)
      .json({ message: "transaction point registered successfully", token });
  } catch (error) {
    console.log(`error in createTransaksiPoint: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const callbackPayment = async (req, res) => {
  const statusResponse = await snap.transaction.notification(req.body);

  let orderId = statusResponse.order_id;
  let transactionStatus = statusResponse.transaction_status;
  let fraudStatus = statusResponse.fraud_status;

  const transaksiPoint = await TransaksiPoint.findById(orderId);

  if (!transaksiPoint) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  // Prevent duplicate processing
  if (transaksiPoint.status === "success") {
    return res.status(200).json({ message: "Transaction already processed" });
  }

  if (transactionStatus === "capture" || transactionStatus === "settlement") {
    if (fraudStatus === "accept") {
      const penjahit = await Penjahit.findById(transaksiPoint.penjahit);
      const point = await PointProduct.findById(transaksiPoint.point);

      if (!penjahit || !point) {
        return res.status(404).json({ message: "penjahit or point not found" });
      }

      penjahit.point += point.point;
      await penjahit.save();
      transaksiPoint.status = "success";
    }
  } else if (
    transactionStatus === "cancel" ||
    transactionStatus === "deny" ||
    transactionStatus === "expire"
  ) {
    transaksiPoint.status = "failed";
  } else if (transactionStatus === "pending") {
    transaksiPoint.status = "pending";
  }

  await transaksiPoint.save();
  return res.status(200).json({ message: "Callback processed successfully" });
};
