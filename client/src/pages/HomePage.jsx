import { Link } from "react-router-dom";
import { FeatureCard, StepCard } from "../components/ListCard";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePenjahitPremium } from "../queries/penjahit/penjahitQuery";
import CardPenjahit from "../components/penjahit/CardPenjahit";
import { useAuthUser } from "../queries/auth/authQuery";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const HomePage = () => {
  const { data: authUser } = useAuthUser();
  const { data: penjahitPremium, isLoading } = usePenjahitPremium();

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <Icon icon="line-md:loading-loop" width="64" height="64" color="gray" />
      </div>
    );
  }

  return (
    <div>
      <section className="relative w-full h-[75vh] lg:h-[90vh] flex items-center px-8 lg:px-16 text-white">
        <img
          src="/banner.png"
          alt="Penjahit"
          className="absolute inset-0 w-full h-full object-cover"
        />
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
              className="btn btn-primary text-white px-6 py-3 font-semibold sm:max-lg:w-full"
            >
              Dapatkan Jahitan
            </Link>
          </div>
        </div>
      </section>

      <section className="px-8 lg:px-16 my-24">
        <h1 className="text-xl sm:text-3xl font-semibold mb-8">
          Kenapa Memilih <span className="text-primary-jalin">Jalin</span>
        </h1>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <FeatureCard
            imgUrl="/why1.svg"
            title="Kemudahan dan Efisiensi"
            desc="Tidak perlu repot mencari penjahit secara manual dan Penjahit tidak perlu menghabiskan waktu mencari pelanggan."
          />
          <FeatureCard
            imgUrl="/why2.svg"
            title="Inovasi dan Adaptasi"
            desc="Potensi kolaborasi dengan pihak ketiga (garmen, toko baju bekas) membuka peluang lebih besar untuk ekspansi bisnis."
          />
          <FeatureCard
            imgUrl="/why3.svg"
            title="Meningkatkan Pendapatan Penjahit"
            desc="Penjahit memiliki akses ke pasar yang lebih luas daripada hanya pelanggan lokal."
          />
          <FeatureCard
            imgUrl="/why4.svg"
            title="Inklusivitas dan Skalabilitas"
            desc="Cocok untuk semua orang, dari customer individual hingga pelaku usaha yang membutuhkan layanan jahit lebih besar."
          />
        </div>
      </section>

      <section className="px-8 lg:px-16 my-24">
        <h1 className="text-xl sm:text-3xl font-semibold mb-2">
          Bergabung Bersama <span className="text-primary-jalin">Jalin</span>
        </h1>
        <p className="mb-8">
          Dengan bergabung di Jalin, Anda dapat menemukan penjahit terbaik atau
          menawarkan jasa jahit dengan lebih mudah dan efisien.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Bergabung sebagai Penjahit",
              desc: "Dapatkan lebih banyak pelanggan dan kelola pesanan dengan mudah! Tampilkan hasil karya Anda dan jadilah bagian dari komunitas penjahit profesional.",
              link: "/penjahit/register",
              linkText: "Mulai Menjahit Sekarang",
            },
            {
              title: "Bergabung Sebagai Customer",
              desc: "Temukan penjahit terbaik untuk kebutuhan jahitanmu! Pesan dengan mudah, lihat ulasan, dan dapatkan hasil terbaik sesuai keinginanmu.",
              link: "/penjahit",
              linkText: "Cari Penjahit Sekarang",
            },
          ].map(({ title, desc, link, linkText }, idx) => (
            <div
              key={idx}
              className="bg-primary-jalin text-white shadow-md rounded-lg p-6 flex flex-col justify-between"
            >
              <h3 className="text-xl font-semibold mt-2">{title}</h3>
              <p className="mt-4 mb-10">{desc}</p>
              <Link to={link} className="text-xl flex items-center gap-8">
                <span>{linkText}</span>
                <Icon icon="cil:arrow-top" width="40" height="40" rotate={45} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="relative w-full h-[85vh] px-8 lg:px-16 my-24 flex items-center">
        <img
          src="/banner.png"
          alt="Penjahit"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 w-full">
          <h1 className="text-xl sm:text-3xl font-semibold mb-8 text-white">
            Temui Penjahit Unggulan
          </h1>
          {penjahitPremium?.length > 0 ? (
            <Swiper
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
              spaceBetween={8}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              modules={[Autoplay]}
              className="mySwiper"
            >
              {penjahitPremium.map((penjahit) => {
                const isNotCurrentUser = authUser
                  ? penjahit.user._id !== authUser._id
                  : true;
                return isNotCurrentUser ? (
                  <SwiperSlide key={penjahit._id}>
                    <CardPenjahit penjahit={penjahit} authUser={authUser} />
                  </SwiperSlide>
                ) : null;
              })}
            </Swiper>
          ) : (
            <p className="text-white">Belum ada penjahit tersedia.</p>
          )}
        </div>
      </section>

      <section className="px-8 lg:px-16 my-24">
        <h1 className="text-xl sm:text-3xl font-semibold mb-8">
          Langkah Mudah Mencari Penjahit di
          <span className="text-primary-jalin"> Jalin</span>
        </h1>
        <div className="flex justify-between gap-16">
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <StepCard
              num={1}
              title="Masuk/Daftar Akun"
              desc="Silahkan masuk atau daftar akun untuk mencari penjahit sesuai kebutuhan."
            />
            <StepCard
              num={2}
              title="Telusuri Halaman Penjahit"
              desc="Jelajahi daftar penjahit yang tersedia dan temukan yang sesuai dengan kebutuhanmu."
            />
            <StepCard
              num={3}
              title="Hubungi dan Pesan Penjahit"
              desc="Pilih penjahit yang sesuai, lalu hubungi mereka dan buat pesanan sesuai keinginanmu."
            />
            <StepCard
              num={4}
              title="Terima dan Review Hasil Jahitan"
              desc="Setelah jahitan selesai, terima pesananmu dan berikan ulasan untuk membantu pengguna lain."
            />
          </div>
          <img
            className="mx-auto h-[40vh] xl:h-[60vh] w hidden lg:block"
            src="/banner-auth.png"
            alt="Langkah bergabung"
          />
        </div>
      </section>

      <section className="relative w-full h-[40vh] px-8 lg:px-16 my-24 flex justify-center items-center">
        <img
          src="/banner.png"
          alt="Penjahit"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 text-center">
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
              className="btn btn-primary text-white px-6 py-3 font-semibold sm:max-lg:w-full"
            >
              Dapatkan Jahitan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
