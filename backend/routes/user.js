const userController = require("../controllers/userControllers")

const router = require("express").Router()


//GET ALL User
router.get("/", userController.getAllUsers)

//DELETE USERS
router.delete("/:id",userController.deleteUser)

module.exports = router