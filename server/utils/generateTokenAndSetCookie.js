import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    maxAge: 24 * 60 * 60 * 1000,
    domain: ".jalin.my.id",
  });

  return token;
};

export const generateTokenAndSetCookieAdmin = (res, adminId) => {
  const token = jwt.sign({ adminId }, process.env.JWT_SECRET_ADMIN, {
    expiresIn: "1h",
  });

  res.cookie("token-admin", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    maxAge: 8 * 60 * 60 * 1000,
    domain: ".jalin.my.id",
  });

  return token;
};
