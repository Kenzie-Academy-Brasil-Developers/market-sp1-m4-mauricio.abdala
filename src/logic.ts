import { Request, Response } from "express";
import { products } from "./database";
import { IProduct } from "./interface";


const totalPrice = (array: IProduct[]): number => {
    return array.reduce((accounting, currentValue) => accounting + currentValue.price, 0);
};


export const readAllProduct = (req: Request, res: Response): Response => {
    return res.status(200).json({ total: totalPrice(products), products });
};


export const readProductId = (req: Request, res: Response): Response => {
    const { productIndex } = res.locals;
    return res.status(200).json(products[productIndex]);
};


let id = 1;

export const createProduct = (req: Request, res: Response) => {
    
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 365);
    const newProduct: IProduct = {
        id: id++,
        ...req.body,
        expirationDate: expirationDate,
    };
    products.push(newProduct);
    return res.status(201).json(newProduct);
};


export const deleteProduct = (req: Request, res: Response) => {
    const productId = parseInt(req.params.id, 10);
    const index = products.findIndex(item => item.id === productId);
    products.splice(index, 1);
    return res.status(204).json();
};


export const updatePartialProduct = (req: Request, res: Response) => {
    const itemId: number = parseInt(req.params.id, 10);
    const index = products.findIndex(item => item.id === itemId);

    if (index === -1) {
        return res.status(404).json({ message: "Product not found." });
    };
    const item = products[index];
    const updatedItem = {
        ...item,
        ...req.body,
        id: item.id, 
        expirationDate: item.expirationDate 
    };
    products.splice(index, 1, updatedItem);
    return res.status(200).json(updatedItem);
};
