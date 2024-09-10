import express, { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const createProduct = async (req: Request, res: Response) => {
    const { name, price, image, category, rating, description } = req.body
    try {
        const createProduct = await prisma.product.create({
            data: {
                name,
                price,
                image,
                category,
                rating,
                description

            }
        })
        res.status(200).json({ message: "Product created successfully!", data: { createProduct } })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
    finally {
        await prisma.$disconnect()
    }
}

const getProducts = async (req: Request, res: Response) => {
    try {
        const getProducts = await prisma.product.findMany()
        res.status(200).json({ message: "Products got successfully!", data: { getProducts } })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
    finally {
        await prisma.$disconnect()
    }
}

const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const getProduct = await prisma.product.findFirst({
            where: { id }
        })
        res.status(200).json({ message: "Product got successfully!", data: { getProduct } })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
    finally {
        await prisma.$disconnect()
    }
}

const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = req.body
    try {
        const updateProduct = await prisma.product.update({
            where: { id },
            data: product
        })
        res.status(200).json({ message: "Product updated successfully!", data: { updateProduct } })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
    finally {
        await prisma.$disconnect()
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deleteProduct = await prisma.product.delete({ where: { id } })
        res.status(200).json({ message: "Product deleted successfully!", data: { deleteProduct } })
    } catch (error) {

        res.status(500).json({ message: "Internal server error" })
    }
    finally {
        await prisma.$disconnect()
    }
}
export default {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}