import users from '../data/users.js'

export const getAll = (role) => {
  if (role) {
    return users.filter(user => user.role === role)
  }
  return users
}

export const getById = (id) => {
  return users.find(user => user.id === Number(id))
}

export const findByEmail = (email, excludeId = null) => {
  if (excludeId) {
    return users.find(u => u.email === email && u.id !== Number(excludeId))
  }
  return users.find(u => u.email === email)
}

export const create = (data) => {
  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name: data.name,
    email: data.email,
    role: data.role || 'user',
    createdAt: new Date().toISOString().split('T')[0]
  }

  users.push(newUser)
  return newUser
}

export const update = (id, data) => {
  const userIndex = users.findIndex(u => u.id === Number(id))
  
  if (userIndex === -1) {
    return null
  }

  users[userIndex] = { ...users[userIndex], ...data }
  return users[userIndex]
}

export const remove = (id) => {
  const userIndex = users.findIndex(u => u.id === Number(id))
  
  if (userIndex === -1) {
    return false
  }

  users.splice(userIndex, 1)
  return true
}
