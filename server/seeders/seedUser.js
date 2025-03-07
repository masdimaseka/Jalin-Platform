import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./../models/user.model.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedUsers = async () => {
  try {
    const usersData = [
      {
        name: "Alice Johnson",
        username: "alicej",
        email: "alicej@example.com",
        password: "securePass1",
        noTelp: "081234567800",
        address: "Jl. Merdeka No. 11",
        isVerified: true,
        isAgreeTerms: true,
      },
      {
        name: "Bob Williams",
        username: "bobw",
        email: "bobw@example.com",
        password: "securePass2",
        noTelp: "081234567801",
        address: "Jl. Sudirman No. 12",
        isVerified: true,
        isAgreeTerms: true,
      },
      {
        name: "Charlie Brown",
        username: "charlieb",
        email: "charlieb@example.com",
        password: "securePass3",
        noTelp: "081234567802",
        address: "Jl. Thamrin No. 13",
        isVerified: true,
        isAgreeTerms: true,
      },
      {
        name: "Diana Prince",
        username: "dianap",
        email: "dianap@example.com",
        password: "securePass4",
        noTelp: "081234567803",
        address: "Jl. Gatot Subroto No. 14",
        isVerified: true,
        isAgreeTerms: true,
      },
      {
        name: "Edward Norton",
        username: "edwardn",
        email: "edwardn@example.com",
        password: "securePass5",
        noTelp: "081234567804",
        address: "Jl. Rasuna Said No. 15",
        isVerified: true,
        isAgreeTerms: true,
      },
      {
        name: "Fiona Green",
        username: "fionag",
        email: "fionag@example.com",
        password: "securePass6",
        noTelp: "081234567805",
        address: "Jl. Diponegoro No. 16",
        isVerified: true,
        isAgreeTerms: true,
      },
      {
        name: "George Harris",
        username: "georgeh",
        email: "georgeh@example.com",
        password: "securePass7",
        noTelp: "081234567806",
        address: "Jl. MH Thamrin No. 17",
        isVerified: true,
        isAgreeTerms: true,
      },
      {
        name: "Hannah Lewis",
        username: "hannahl",
        email: "hannahl@example.com",
        password: "securePass8",
        noTelp: "081234567807",
        address: "Jl. Ahmad Yani No. 18",
        isVerified: true,
        isAgreeTerms: true,
      },
      {
        name: "Isaac Newton",
        username: "isaacn",
        email: "isaacn@example.com",
        password: "securePass9",
        noTelp: "081234567808",
        address: "Jl. Imam Bonjol No. 19",
        isVerified: true,
        isAgreeTerms: true,
      },
      {
        name: "Julia Roberts",
        username: "juliar",
        email: "juliar@example.com",
        password: "securePass10",
        noTelp: "081234567809",
        address: "Jl. H.R Rasuna Said No. 20",
        isVerified: true,
        isAgreeTerms: true,
      },
    ];

    for (let user of usersData) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    await User.insertMany(usersData);
    console.log("10 user berhasil ditambahkan!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Gagal menambahkan user:", error);
    mongoose.connection.close();
  }
};

seedUsers();
