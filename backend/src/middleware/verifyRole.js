const verifyRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      if (req.user.role === "patient") {
        return res.status(403).json({
          message: "Patients are not authorized to access this resource.",
        });
      }
      if (req.user.role === "admin") {
        return res.status(403).json({
          message: "Admin are not authorized to access this resource.",
        });
      }
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
export default verifyRole;
// const verifyAdmin = (req, res, next) => {
//   if (req.user || req.user.role === "admin") {
//     return next();
//   }
//   return res.status(403).json({
//     message: "Access denied. Admin privileges required.",
//   });
// };
