const isTeacher = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token manquant" });
    }

    jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token invalide" });
        }
        if (decoded.role !== "teacher") {
            return res.status(403).json({ message: "Accès réservé aux enseignants" });
        }
        req.user = decoded;
        next();
    });
};
