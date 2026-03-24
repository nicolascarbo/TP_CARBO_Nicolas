import express from 'express'
import users from '../data/users.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
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

export default router
