const SECRET_KEY = "my-secret-key";

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    // Send an HTTP 401 unauthorized response if no token is provided.
    return res.status(401).send("No token provided");
  }

  try {
    // Verify the JWT using the secret key.
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;

    // Call the next middleware function.
    next();
  } catch (err) {
    // Send an HTTP 401 unauthorized response if the JWT is invalid or has expired.
    res.status(401).send("Invalid token");
  }
}
