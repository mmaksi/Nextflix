export default async function stats(req, res) {
  if (req.method === "POST") {
    try {
      const token = req.cookies.token;
      if (!token) {
        res
          .status(403)
          .send({
            done: false,
            message: "Not authorized to access this route",
          });
      } else {
      }
    } catch (error) {}
  } else {
    res
      .status(400)
      .json({ message: "GET routes are not supported on this route" });
  }
}
