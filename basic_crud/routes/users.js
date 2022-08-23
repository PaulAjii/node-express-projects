import express from "express"
import { getUsers, createUser, getUser, deleteUser, updateUser } from "../controller/users.js"

const router = express.Router()

router.route("/")
	.get(getUsers)
	.post(createUser)

router.route('/:id')
	.get(getUser)
	.delete(deleteUser)
	.patch(updateUser)

export default router
