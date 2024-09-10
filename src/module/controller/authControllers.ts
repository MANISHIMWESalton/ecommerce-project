import express, { Request, Response } from "express"
import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";
import *as bcrypt from "bcrypt"
import *as jwt from "jsonwebtoken"

const prisma = new PrismaClient()

const signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) return res.json({ message: "Please fill all field!" })
        const user = await prisma.users.findFirst({ where: { email } });
        if (user) {
            return res.json({ message: "User already exists" })
        }
        const newUser = await prisma.users.create({
            data: {
                name,
                email,
                password: hashSync(password, 10)
            }
        })
        res.status(200).json({ message: "User created successfully", data: { newUser } })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
    finally {
        await prisma.$disconnect()
    }
}
const maxAge = 1 * 24 * 60 * 60
const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) return res.json({ message: "Please fill all field!" })
        const user = await prisma.users.findFirst({ where: { email } })
        if (!user) return res.json({ message: "User not found!" })
        const checkedPassword = await bcrypt.compare(password, user.password)
        if (!checkedPassword) return res.json({ message: 'Invalid password!' })
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: maxAge })
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ message: "Token genereted successfully!", data: { token } })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })

    }
    finally {
        await prisma.$disconnect()
    }
}
export default {
    signup,
    login
}