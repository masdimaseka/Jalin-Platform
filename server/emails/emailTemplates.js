export function verificationEmailTemplate(verificationCode) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verifikasi Email</title>
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    "
  >
    <div
      style="
        background: linear-gradient(to right, #435ccc, rgb(52, 76, 180));
        padding: 20px;
        text-align: center;
      "
    >
      <h1 style="color: white; margin: 0">Verifikasi Email Kamu</h1>
    </div>
    <div
      style="
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 0 0 5px 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      "
    >
      <p>Terima kasih telah mendaftar! Kode verifikasi Anda adalah:</p>
      <div style="text-align: center; margin: 30px 0">
        <span
          style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 5px;
            color: #435ccc;
          "
          >${verificationCode}</span
        >
      </div>
      <p>
        Masukkan kode ini pada halaman verifikasi untuk menyelesaikan
        pendaftaran Anda.
      </p>
      <p>
        Kode ini akan kedaluwarsa dalam 15 menit. Jika Anda tidak membuat akun
        dengan kami, harap abaikan email ini.
      </p>
      <p>Salam hormat,<br />Jalin Team</p>
    </div>
    <div
      style="
        text-align: center;
        margin-top: 20px;
        color: #888;
        font-size: 0.8em;
      "
    >
      <p>Ini adalah pesan otomatis, mohon untuk tidak membalas email ini.</p>
    </div>
  </body>
</html>
`;
}
