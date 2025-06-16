"use server"

import dbConnect, { collectionNameobj } from '@/lib/dbConnect'
import bcrypt from "bcrypt"

export const loginUSer = async (payload) => {
  const { email, password } = payload

  const userCollection = dbConnect(collectionNameobj.userCollection)
  const user = await userCollection.findOne({ email })

  if (!user) return null

  const isPasswordOk = await bcrypt.compare(password, user.password)
  if (!isPasswordOk) return null

  return user
}
