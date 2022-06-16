import { error } from "console";
import fs from "fs"

export const getUsers = () => {
  try {
    const users = fs.readFileSync("./data/users.json", "utf-8")
    const usersArr = JSON.parse(users)
    return usersArr;
  } catch (err) {
    console.error(err)
  }
}
export const getUserIndexById = (id) => {
  const users = getUsers()
  return users.findIndex(user => user.id == id)
}
export const getUserById = (id) => {
  const users = getUsers()
  return users.find(user => user.id == id)
}

export const deposit = (id, amount) => {
  const users = getUsers()
  const user = getUserIndexById(id)
  users[user].cash = users[user].cash + amount
  console.log(user)
  // console.log(users)
  fs.writeFileSync("./data/users.json", JSON.stringify(users), "utf-8")
}
export const withdraw = (id, amount) => {
  const users = getUsers()
  const user = getUserIndexById(id)
  if (users[user].cash + users[user].credit < amount) {
    users[user].cash = users[user].cash - amount
    console.log(user)
    // console.log(users)
    fs.writeFileSync("./data/users.json", JSON.stringify(users), "utf-8")
  } else {
   console.log("you don't have mony")
  }
}
export const createUser = (user) => {
  const users = getUsers()
  console.log(users)
  users.push(user)
  console.log(user)
  fs.writeFileSync("./data/users.json", JSON.stringify(users), "utf-8")
  // console.log(users)
}
export const updateCradit = (id, craditAmount) => {
  const users = getUsers()
  const user = getUserIndexById(id)
  users[user].credit = craditAmount
  fs.writeFileSync("./data/users.json", JSON.stringify(users), "utf-8")
}
//get user by id
// create user obj users.push(user)
//
