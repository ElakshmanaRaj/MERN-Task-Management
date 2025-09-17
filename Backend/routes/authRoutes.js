const express = require("express");
const multer = require("multer");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");

// authRoutes
router.post("/register", (req, res, next) => {
  upload.single("profileImageUrl")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    registerUser(req, res);
  });
})
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);



module.exports = router;
