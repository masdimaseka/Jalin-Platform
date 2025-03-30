import { Link } from "react-router-dom";
import { FeatureCard, StepCard } from "../components/ListCard";
import { Icon } from "@iconify/react/dist/iconify.js";
import ReviewCard from "../components/ReviewCard";

const HomePage = () => {
  return (
    <div>
      <div className="relative w-full h-[75vh] lg:h-[90vh] flex items-center px-8 lg:px-16 text-white">
        <div className="absolute inset-0">
          <img
            src="/banner.png"
            alt="Penjahit"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 lg:w-[50vw]">
          <h1 className="text-xl lg:text-3xl font-bold">
            Temukan Penjahit Terbaik <br /> atau Tawarkan Jasa Jahit Anda di
            Sini!
          </h1>
          <p className="mt-4 text-md">
            Butuh jasa jahit? Pilih penjahit terbaik sesuai kebutuhan. Seorang
            penjahit? Dapatkan lebih banyak pelanggan dengan mudah!
          </p>

          <div className="mt-6 flex flex-col lg:flex-row gap-2">
            <Link
              to="/penjahit"
              className="btn btn-white text-primary-jalin px-6 py-3 font-semibold sm:max-lg:w-full"
            >
              Cari Penjahit
            </Link>
            <Link
              to="/jahitan"
              className=" btn btn-primary text-white px-6 py-3 font-semibold sm:max-lg:w-full"
            >
              Dapatkan Jahitan
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="px-8 lg:px-16 my-24">
          <h1 className="text-xl sm:text-3xl font-semibold mb-8">
            Kenapa Memilih <span className="text-primary-jalin">Jalin</span>
          </h1>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <FeatureCard
              imgUrl={"/why1.svg"}
              title={"Kemudahan dan Efisiensi"}
              desc={
                "Tidak perlu repot mencari penjahit secara manual dan Penjahit tidak perlu menghabiskan waktu mencari pelanggan."
              }
            />
            <FeatureCard
              imgUrl={"/why2.svg"}
              title={"Inovasi dan Adaptasi"}
              desc={
                "Potensi kolaborasi dengan pihak ketiga (garmen, toko baju bekas) membuka peluang lebih besar untuk ekspansi bisnis."
              }
            />
            <FeatureCard
              imgUrl={"/why3.svg"}
              title={"Meningkatkan Pendapatan Penjahit"}
              desc={
                "Penjahit memiliki akses ke pasar yang lebih luas daripada hanya pelanggan lokal."
              }
            />
            <FeatureCard
              imgUrl={"/why4.svg"}
              title={"Inklusivitas dan Skalabilitas"}
              desc={
                "Cocok untuk semua orang, dari customer individual yang ingin memperbaiki pakaian kecil hingga pelaku usaha yang membutuhkan layanan jahit lebih besar."
              }
            />
          </div>
        </div>

        <div className="px-8 lg:px-16 my-24">
          <h1 className="text-xl sm:text-3xl font-semibold mb-2">
            Bergabung Bersama <span className="text-primary-jalin">Jalin</span>
          </h1>
          <p className="mb-8">
            Dengan bergabung di Jalin, Anda dapat menemukan penjahit terbaik
            atau menawarkan jasa jahit dengan lebih mudah dan efisien.
          </p>
          <div className="grid md:grid-cols-2 gap-6 ">
            <div className="bg-primary-jalin text-white shadow-md rounded-lg p-6 flex flex-col justify-between">
              <h3 className="text-xl font-semibold mt-2">
                Bergabung sebagai Penjahit
              </h3>
              <p className="mt-4 mb-10">
                Dapatkan lebih banyak pelanggan dan kelola pesanan dengan mudah!
                Tampilkan hasil karya Anda dan jadilah bagian dari komunitas
                penjahit profesional
              </p>
              <Link
                to="/penjahit/register"
                className="text-xl flex items-center gap-8"
              >
                <span>Mulai Menjahit Sekarang</span>
                <Icon icon="cil:arrow-top" width="40" height="40" rotate={45} />
              </Link>
            </div>
            <div className="bg-primary-jalin text-white shadow-md rounded-lg p-6 flex flex-col justify-between">
              <h3 className="text-xl font-semibold mt-2">
                Bergabung Sebagai Customer
              </h3>
              <p className="mt-4 mb-10">
                Temukan penjahit terbaik untuk kebutuhan jahitanmu! Pesan dengan
                mudah, lihat ulasan, dan dapatkan hasil terbaik sesuai
                keinginanmu.
              </p>
              <Link to="/penjahit" className="text-xl flex items-center gap-8">
                <span>Cari Penjahit Sekarang</span>
                <Icon icon="cil:arrow-top" width="40" height="40" rotate={45} />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative w-full h-[60vh] px-8 lg:px-16 my-24 flex items-center">
          <div className="absolute inset-0">
            <img
              src="/banner.png"
              alt="Penjahit"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <h1 className="text-xl sm:text-3xl font-semibold mb-8 text-white">
              Ulasan Mereka
            </h1>
            <div className="carousel carousel-horizontal rounded-box w-screen">
              <div className="carousel-item w-[80vw] lg:w-[30vw] mr-4">
                <ReviewCard />
              </div>
              <div className="carousel-item w-[80vw] lg:w-[30vw] mr-4">
                <ReviewCard />
              </div>
              <div className="carousel-item w-[80vw] lg:w-[30vw] mr-4">
                <ReviewCard />
              </div>
              <div className="carousel-item w-[80vw] lg:w-[30vw] mr-4">
                <ReviewCard />
              </div>
              <div className="carousel-item w-[80vw] lg:w-[30vw] mr-4">
                <ReviewCard />
              </div>
              <div className="carousel-item w-[80vw] lg:w-[30vw] mr-4">
                <ReviewCard />
              </div>
              <div className="carousel-item w-[80vw] lg:w-[30vw] mr-4">
                <ReviewCard />
              </div>
              <div className="carousel-item w-[80vw] lg:w-[30vw] mr-4">
                <ReviewCard />
              </div>
              <div className="carousel-item w-[80vw] lg:w-[30vw] mr-40">
                <ReviewCard />
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 lg:px-16 my-24">
          <h1 className="text-xl sm:text-3xl font-semibold mb-8">
            Langkah Mudah Mencari Penjahit di
            <span className="text-primary-jalin"> Jalin</span>
          </h1>
          <div className="flex justify-between gap-16">
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <StepCard
                num={1}
                title={"Masuk/Daftar Akun"}
                desc={
                  "Silahkan masuk atau daftar akun untuk mencari penjahit sesuai kebutuhan."
                }
              />
              <StepCard
                num={2}
                title={"Telusuri Halaman Penjahit"}
                desc={
                  "Jelajahi daftar penjahit yang tersedia dan temukan yang sesuai dengan kebutuhanmu"
                }
              />
              <StepCard
                num={3}
                title={"Hubungi dan Pesan Penjahit"}
                desc={
                  "Pilih penjahit yang sesuai, lalu hubungi mereka dan buat pesanan sesuai keinginanmu."
                }
              />
              <StepCard
                num={4}
                title={"Terima dan Review Hasil Jahitan"}
                desc={
                  "Setelah jahitan selesai, terima pesananmu dan berikan ulasan untuk membantu pengguna lain."
                }
              />
            </div>
            <img
              className="mx-auto h-[40vh] xl:h-[60vh] w hidden lg:block"
              src="/banner-auth.png"
              alt=""
            />
          </div>
        </div>

        <div className="relative w-full h-[40vh] px-8 lg:px-16 my-24 flex justify-center items-center">
          <div className="absolute inset-0">
            <img
              src="/banner.png"
              alt="Penjahit"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <h1 className="text-xl lg:text-4xl font-bold text-white">
              Yuk bergabung dan menjadi bagian dari Jalin!
            </h1>

            <div className="mt-6 flex flex-col lg:flex-row justify-center gap-2">
              <Link
                to="/penjahit"
                className="btn btn-white text-primary-jalin px-6 py-3 font-semibold sm:max-lg:w-full"
              >
                Cari Penjahit
              </Link>
              <Link
                to="/jahitan"
                className=" btn btn-primary text-white px-6 py-3 font-semibold sm:max-lg:w-full"
              >
                Dapatkan Jahitan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
