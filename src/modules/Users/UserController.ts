// src/controllers/UserController.ts
import express from 'express'
import CreateUser from './usecases/CreateUser'

class UserController {
  constructor(private createNewUser: CreateUser) {}

  async createUser(req: express.Request, res: express.Response) {
    const { id, name } = req.body
    await this.createNewUser.execute(id, name)
    res.status(201).send('User created successfully')
  }
}

export default UserController
