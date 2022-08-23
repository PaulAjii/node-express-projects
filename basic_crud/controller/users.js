import { v4 as uuidv4 } from "uuid"

let users = []

export const getUsers = (req, res) => {
	res.status(200).send(users)
}

export const createUser = (req, res) => {
	const user = req.body

	users.push({ ...user, id: uuidv4() })

	res.status(201).send(`User with the name: ${user.firstName} created!`)
}

export const getUser = (req, res) => {
	const { id } = req.params

	const user = users.find((user) => user.id === id)

	res.status(200).send(user)
}

export const deleteUser = (req, res) => {
	const { id } = req.params

	users = users.filter((user) => user.id !== id)

	res.send(users)
}

export const updateUser = (req, res) => {
	const { id } = req.params
	const { firstName, lastName, age } = req.body

	const user = users.find((user) => user.id === id)

	if(firstName) user.firstName = firstName
	if(lastName) user.lastName = lastName
	if(age) user.age = age

	res.send(user)
}