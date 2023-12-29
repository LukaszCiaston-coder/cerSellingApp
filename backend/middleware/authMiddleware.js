const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel"); // Zakładam, że masz model User dostępny

async function authMiddleware(req, res, next) {
  try {
    // Pobierz token z nagłówka Authorization
    const token = req.headers.authorization.split(" ")[1];

    // Sprawdź, czy token istnieje
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Zweryfikuj token
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    // Pobierz użytkownika na podstawie ID z tokena
    const user = await User.findById(decodedToken.userId);

    // Sprawdź, czy użytkownik istnieje
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Przekaż dane użytkownika do kolejnych middleware lub routy
    req.user = user;

    // Wywołaj następne middleware lub przekieruj do odpowiedniej trasy
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Not authorized" });
  }
}

module.exports = authMiddleware;
