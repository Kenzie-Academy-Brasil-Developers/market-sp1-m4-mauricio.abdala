import express from "express";
import { createProduct, deleteProduct, readAllProduct, readProductId, updatePartialProduct } from "./logic";
import { validationIdExists, validationNameExists } from "./middlewares";

const app = express();

app.use(express.json());

app.post("/products", validationNameExists, createProduct);
app.get("/products", readAllProduct);
app.get("/products/:id", validationIdExists, readProductId);
app.patch("/products/:id", validationIdExists, validationNameExists, updatePartialProduct);
app.delete("/products/:id", validationIdExists, deleteProduct);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


