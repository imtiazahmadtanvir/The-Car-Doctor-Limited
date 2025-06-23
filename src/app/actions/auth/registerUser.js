"use server";

import bcrypt from "bcrypt";
import dbConnect, { collectionNameobj } from "@/lib/dbConnect";

export const registerUser = async (payload) => {
  try {
    const { name, email, password } = payload;

    if (!email || !password) {
      return { success: false, message: "Email and password are required" };
    }

    const userCollection = dbConnect(collectionNameobj.userCollection);
    const existingUser = await userCollection.findOne({ email });

    if (existingUser) {
      return { success: false, message: "User already exists with this email" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userCollection.insertOne({
      name,
      email,
      password: hashedPassword,
    });

    return {
      success: true,
      message: "User registered successfully!",
      insertedId: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "Registration failed. Please try again.",
    };
  }
};
