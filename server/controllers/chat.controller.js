import { upsertStreamUser } from "../lib/stream.js";
import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    const token = generateStreamToken(req.user.id);

    res.status(200).json({ token });
  } catch (error) {
    console.log("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function regisUserToStream(req, res) {
  try {
    const upsertedUser = await upsertStreamUser({
      id: req.body.id,
      name: req.body.name,
      image: req.body.profileImg || "",
    });

    if (!upsertedUser) {
      return res
        .status(500)
        .json({ message: "Failed to register user to Stream" });
    }

    res.status(200).json({ message: "User registered to Stream successfully" });
  } catch (error) {
    console.log("Error in regisUserToStream controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
