import express from 'express'
import { getUsers, deposit, createUser, withdraw, updateCradit,getUserById,getUserIndexById } from './api/utils.js'


const app = express()
// console.log(app)
const port = 3030;
const BASE_URL = "/"

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get(BASE_URL, (req, res) => {
  res.send("hello world")
  // console.log(res)
  // console.log(req)
})

app.get(BASE_URL + 'users', (req, res) => {
  const users = getUsers()
  res.send(users)
})
app.post(BASE_URL + 'users', (req, res) => {
  const users = getUsers()
  console.log(req.body)
  const user = req.body
  createUser(user)
  res.send(`The user ${JSON.stringify(user)} created succefuly`)
})
app.put(BASE_URL + 'users_whithdraw/:id', (req, res) => {
  const { id } = req.params
  const { withdrawAmount } = req.body;
  withdraw(id, withdrawAmount)
  const users = getUsers()
  res.send(users)
})
app.put(BASE_URL + 'users/user_deposit/:id', (req, res) => {
  const { id } = req.params
  console.log(id)
  const { depositAmount } = req.body;
  deposit(id, depositAmount)
  const users = getUsers()
  res.send(`Your deposit of ${depositAmount} went succefuly`)
})
app.put(BASE_URL + 'users/:id', (req, res) => {
  const { id } = req.params
  const { updateCraditAmount } = req.body;
  if (updateCraditAmount > 0) {
    updateCradit(id, updateCraditAmount)
    const users = getUsers()
    res.send(users)
  } else {
    res.send('wright a positive number')
  }
})
app.put(BASE_URL + 'users/user_transfer/:id', (req, res) => {
  const { id } = req.params
  const { transferAmount, getterId } = req.body;
  withdraw(id, transferAmount)
  deposit(getterId, transferAmount)
  const users = getUsers()
  res.send(users)
})

app.get(BASE_URL + 'users/:id', (req, res) => {
  const { id } = req.params
  console.log(id)

  res.send(getUserById(id))
})


app.listen(port, () => console.log("hello world"))






