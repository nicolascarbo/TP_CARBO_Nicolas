import express from 'express'
import users from '../data/users.js'

const router = express.Router()

router.get('/', (req, res) => {
  const { role } = req.query
  let filteredUsers = users

  if (role) {
    filteredUsers = users.filter(user => user.role === role)
  }

  res.status(200).json({
    success: true,
    count: filteredUsers.length,
    data: filteredUsers
  })
})

router.get('/:id', (req, res) => {
  const user = users.find(user => user.id === Number(req.params.id))
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Utilisateur non trouvé'
    })
  }
  res.status(200).json({
    success: true,
    data: user
  })
})

router.post('/', (req, res) => {
  const { name, email, role } = req.body

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Les champs name et email sont obligatoires'
    })
  }

  const newUser = {
    id: users[users.length - 1].id + 1,
    name,
    email,
    role: role || 'user',
    createdAt: new Date().toISOString().split('T')[0]
  }

  users.push(newUser)

  res.status(201).json({
    success: true,
    data: newUser
  })
})

router.put('/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === Number(req.params.id))

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Utilisateur non trouvé'
    })
  }

  const { id, createdAt, ...allowedUpdates } = req.body
  users[userIndex] = { ...users[userIndex], ...allowedUpdates }

  res.status(200).json({
    success: true,
    data: users[userIndex]
  })
})

router.delete('/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === Number(req.params.id))

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Utilisateur non trouvé'
    })
  }

  users.splice(userIndex, 1)
  res.status(204).send()
})

export default router



