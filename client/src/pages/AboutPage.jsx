import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div>
      <h1 className="text-2xl sm:text-4xl font-semibold mb-8">About Jalin</h1>
      <div className="flex flex-col-reverse  lg:flex-row items-center justify-center gap-12 lg:gap-24">
        <div className=" w-full lg:w-[60vw]">
          <p className="text-justify">
            Pada era digital yang terus meningkat, industri jasa mengalami
            transformasi besar melalui penggunaan teknologi. Salah satu sektor
            yang masih menghadapi tantangan dalam memanfaatkan teknologi adalah
            jasa penjahit. Banyak penjahit lokal yang kesulitan menjangkau
            pelanggan karena terbatasnya akses pemasaran dan digitalisasi
            layanan. Di sisi lain, pelanggan sering kali kesulitan menemukan
            penjahit yang sesuai dengan kebutuhan mereka, baik dari segi
            kualitas, harga, maupun lokasi.
          </p>
          <br />
          <p className="text-justify">
            Jalin hadir sebagai solusi untuk mengatasi permasalahan tersebut
            dengan menjadi platform digital yang menghubungkan pelanggan dengan
            penjahit dengan cara yang lebih efisien dan mudah diakses. Platform
            ini bertujuan untuk memberikan akses yang lebih besar bagi penjahit
            lokal untuk memperluas jangkauan pelanggan mereka, serta memudahkan
            pelanggan untuk menemukan layanan penjahit yang sesuai dengan
            preferensi mereka.
          </p>
        </div>
        <div className="relative w-full">
          <img src="/banner.png" className="w-full rounded-lg" alt="Banner" />
          <img
            src="/new_logo_putih.svg"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            alt="Logo"
          />
        </div>
      </div>

      <h1 className="text-2xl sm:text-4xl font-semibold my-16">Our Team</h1>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-24">
        <div className="flex flex-col items-center gap-4">
          <img
            src="/gilang.jpg"
            className="w-40 h-40 rounded-full p-2 border-2 border-primary-jalin"
          />
          <div>
            <h1 className="text-lg font-semibold text-center">
              Emerenciano Gilang Pratama
            </h1>
            <p className="text-primary-jalin font-medium text-center">CEO</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <img
            src="/dimas.jpg"
            className="w-40 h-40 rounded-full  p-2 border-2 border-primary-jalin"
          />
          <div>
            <h1 className="text-lg font-semibold text-center">
              Dimas Eka Putra Sahtio
            </h1>
            <p className="text-primary-jalin font-medium text-center">HACKER</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <img
            src="/sati.JPG"
            className="w-40 h-40 rounded-full  p-2 border-2 border-primary-jalin"
          />
          <div>
            <h1 className="text-lg font-semibold text-center">
              Ni Luh Sati Ekaristi
            </h1>
            <p className="text-primary-jalin font-medium text-center">
              HIPSTER
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <img
            src="/setia.png"
            className="w-40 h-40 rounded-full  p-2 border-2 border-primary-jalin"
          />
          <div>
            <h1 className="text-lg font-semibold text-center">
              Ni Putu Setia Pratiwi
            </h1>
            <p className="text-primary-jalin font-medium text-center">
              HUSTLER
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-lg sm:text-xl font-semibold mt-16 mb-4">
        Contact Us
      </h1>
      <div className="flex gap-2">
        <Link to="https://www.instagram.com/jalin.official/" target="_blank">
          <Icon
            icon="mdi:instagram"
            width="40"
            height="40"
            className="text-primary-jalin"
          />
        </Link>
        <Link to="https://wa.me/6285183949145/" target="_blank">
          <Icon
            icon="mdi:whatsapp"
            width="40"
            height="40"
            className="text-primary-jalin"
          />
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
