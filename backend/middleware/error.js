export const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = err.message || "Erreur interne du serveur";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = "Cette ressource existe déjà (conflit de données).";
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Format d'ID invalide.";
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
