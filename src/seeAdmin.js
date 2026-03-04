const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/users");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    await User.deleteMany({ role: "admin" });

    const admins = [
      { name: "Admin 1", username: "admin", password: "1etsbia" },
      { name: "Admin 2", username: "admin2", password: "f.istaeb" },
      { name: "Admin 3", username: "admin3", password: "r.tbseai" },
      { name: "Admin 4", username: "admin4", password: "n.asbtie" },
      { name: "Admin 5", username: "admin5", password: "s.btaise" },
    ];

    for (let admin of admins) {
      const hashed = await bcrypt.hash(admin.password, 10);

      await User.create({
        name: admin.name,
        username: admin.username,
        password: hashed,
        role: "admin",
      });
    }

    console.log("✅ Admin seed selesai");
    process.exit();
  })
  .catch((err) => console.error(err));
