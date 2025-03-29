import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

export const OnReviewRegister = ({ title, desc, navigation }) => {
  return (
    <>
      <Icon
        className="text-primary-jalin"
        icon="mingcute:time-fill"
        width="100"
        height="100"
      />
      <h1 className="text-xl sm:text-3xl font-semibold text-center">{title}</h1>
      <p className="text-center">{desc}</p>
      <Link className="btn btn-primary" to={navigation}>
        Kembali ke halaman utama
      </Link>
    </>
  );
};
