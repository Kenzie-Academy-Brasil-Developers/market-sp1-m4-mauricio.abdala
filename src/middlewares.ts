import { NextFunction, Request, Response } from "express";
import { products } from "./database";
import { IProduct } from "./interface";

export const validationNameExists = (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const isArray = Array.isArray(payload);

    if (isArray) {
        payload.forEach((item) => {
            if (item.name) {
                const nameUsed: boolean = products.some(
                    (product) => product.name === item.name
                );
                if (nameUsed) {
                    return res.status(409).json({ message: "Product already registered." });
                }
            };
        });
    } else {
        if (payload.name) {
            const nameUsed: boolean = products.some(
                (product) => product.name === payload.name
            );

            if (nameUsed) {
                return res.status(409).json({ message: "Product already registered." });
            }
        }
    };
    return next();
};


export const validationIdExists = (
    req: Request,
    res: Response,
    next: NextFunction
): void | Response => {
    const productIndex: number = products.findIndex(
        (product: IProduct): boolean => product.id === Number(req.params.id)
    );

    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found." });
    };
    res.locals.productIndex = productIndex;
    return next();
};