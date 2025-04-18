import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    domain: ".jalin.my.id",
    maxAge: 3 * 60 * 60 * 1000,
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
    domain: ".jalin.my.id",
    maxAge: 1 * 60 * 60 * 1000,
  });

  return token;
};
