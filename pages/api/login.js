import { magicAdmin } from "../../lib/magic-server";
import jwt from "jsonwebtoken";
import { isNewUser, createNewUser } from "../../lib/db/hasura";

export default async function login(req, res) {
  if (req.method === "POST") {
    try {
      // Getting DID Token from headers
      const auth = req.headers.authorization;
      const DIDToken = auth ? auth.substr(7) : "";
      // Get the user with this DID Token
      const metadata = await magicAdmin.users.getMetadataByToken(DIDToken);
      const { issuer, email } = metadata; // issuer is hasura user id
      // TODO: Create JWT token
      // Sign Hasura example + metadata
      const jwtToken = jwt.sign(
        {
          ...metadata,
          iat: Math.floor(new Date() / 1000),
          exp: Math.floor(new Date() / 1000 + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": `${issuer}`,
          },
        },
        process.env.JWT_SECRET
      );
      // TODO: Check if user exists
      const isNewUserQuery = await isNewUser(jwtToken, issuer);
      // Create a new user if it doesn't exist
      isNewUserQuery && (await createNewUser(jwtToken, metadata));
      // Set a cookie for the user
      setTokenCookie(jwtToken, res);
      res.status(200).json({ done: true });
    } catch (error) {
      console.error("Something went wrong logging in", error);
      res.status(500).json({ done: false });
    }
  } else {
    res.status(500).json({ done: false });
  }
}
