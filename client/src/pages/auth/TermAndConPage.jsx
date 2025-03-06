const TermAndConPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">
        Terms & Conditions (Syarat & Ketentuan)
      </h1>
      <ol className="list-decimal list-inside mt-8">
        <li className="mb-4">
          <h2 className="inline text-lg font-medium">Ketentuan Umum</h2>
          <ul className="list-disc list-inside">
            <li>
              Platform berfungsi sebagai penghubung antara penjahit dan
              pelanggan.
            </li>
            <li>Pengguna wajib memberikan informasi yang akurat dan benar.</li>
            <li>
              Dilarang memposting atau menawarkan layanan yang mengandung unsur
              SARA dan pornografi.
            </li>
          </ul>
        </li>
        <li className="mb-4">
          <h2 className="inline text-lg font-medium">
            Hak & Kewajiban Penjahit
          </h2>
          <ul className="list-disc list-inside">
            <li>Wajib memberikan informasi dan portofolio yang valid.</li>
            <li>Bertanggung jawab atas pekerjaan yang diterima.</li>
            <li>Menyetujui potongan saldo tetap per job.</li>
            <li>Dilarang melakukan penipuan atau penyalahgunaan layanan.</li>
          </ul>
        </li>
        <li className="mb-4">
          <h2 className="inline text-lg font-medium">
            Hak & Kewajiban Pelanggan
          </h2>
          <ul className="list-disc list-inside">
            <li>
              Bertanggung jawab atas kesepakatan pembayaran dengan penjahit.
            </li>
            <li>
              Tidak diperbolehkan membatalkan pesanan secara sepihak setelah
              pekerjaan dimulai.
            </li>
          </ul>
        </li>
        <li className="mb-4">
          <h2 className="inline text-lg font-medium">
            Sistem Keamanan & Penyelesaian Sengketa
          </h2>
          <ul className="list-disc list-inside">
            <li>
              Platform menyediakan customer service untuk menyelesaikan
              permasalahan antara penjahit dan pelanggan.
            </li>
            <li>
              Jika terjadi sengketa, pihak platform akan melakukan mediasi
              berdasarkan bukti yang tersedia.
            </li>
          </ul>
        </li>
        <li className="mb-4">
          <h2 className="inline text-lg font-medium">Pelanggaran & Sanksi</h2>
          <ul className="list-disc list-inside">
            <li>
              Pelanggaran terhadap aturan dapat mengakibatkan akun diblokir
              sementara atau permanen.
            </li>
            <li>
              Jika ditemukan penipuan, pihak platform berhak untuk melaporkan
              kepada pihak berwenang.
            </li>
          </ul>
        </li>
      </ol>
    </div>
  );
};

export default TermAndConPage;
