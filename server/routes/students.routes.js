const express = require("express");
const router = express.Router();
const database = require("../ultils/database");

// Create User
router.post("/", async (req, res) => {
  let { name, decription } = req.body;

  try {
    let createUser = await database.execute(
      "INSERT INTO student ( name , decription) VALUE ( ?,?)",
      [name, decription]
    );
    console.log(createUser);
    res.json({
      // createUser,
      message: "Create user success",
    });
  } catch (error) {
    res.json({
      message: "Create not success",
    });
  }
});

// GET All users
router.get("/", async (req, res) => {
  try {
    let data = await database.execute("SELECT * FROM student");
    console.log(data);
    let rowUser = data[0];
    res.json({
      users: rowUser,
      message: "Lấy toàn bộ user",
    });
  } catch (error) {
    res.json({
      messenge: "K thấy user",
    });
  }
});

// Get on user
router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    // console.log(id);
    let data = await database.execute(
      `SELECT * FROM student WHERE student_id = ${id}`
    );
    let rowUser = data[0];
    console.log(rowUser);
    if (rowUser === 0) {
      res.json({
        message: ` User với id = ${id} k tồn tại`,
      });
    } else {
      res.json(rowUser);
    }
  } catch (error) {
    res.json({
      message: "K thấy user",
    });
  }
});

// Update User
router.patch("/:id", async (req, res) => {
  let { id } = req.params;
  let { name, decription } = req.body;
  try {
    let updateUser = await database.execute(
      `SELECT * FROM student WHERE student_id = ?`,
      [id]
    );
    let rowUser = updateUser[0];
    console.log(rowUser);
    if (rowUser === 0) {
      res.json({
        message: `User với id = ${id} k tồn tại`,
      });
    } else {
      await database.execute(
        `UPDATE student SET name = ?, decription = ? WHERE student_id = ?`,
        [name || rowUser[0].name, decription || rowUser[0].decription, id]
      );
      res.json({
        message: "Update success",
      });
    }
  } catch (error) {
    res.json({
      messenge: "Update not success",
    });
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await database.execute("DELETE FROM student WHERE student_id = ?", [id]);
    let data = await database.execute("SELECT * FROM student");
    res.json({
      message: "Đã delete thành công",
      user: data[0],
    });
  } catch (error) {
    res.json({
      message: "Delete not success",
    });
  }
});

module.exports = router;
