import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from './products.model';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ProductsService {

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    private products: Product[] = [];

    async insertProduct(title: string, description: string, price: number) {
        const productCreated = new this.productModel({ title: title, description: description, price: price });
        const result = await productCreated.save();
        return result.id as string;
    }

    async getProductList() {
        const result = await this.productModel.find().exec();
        return result.map(prod => ({ 
            id: prod.id, 
            title: prod.title, 
            description: prod.description, 
            price: prod.price 
        })) as Product[];
    }

    async getProduct(id: string) {
        const product = await this.findProduct(id);
        return { 
            id: product.id, 
            title: product.title, 
            description: product.description, 
            price: product.price 
        }
    }

    async updateProduct(id: string, title: string, description: string, price: number){
        const updateProduct = await this.findProduct(id);
        if(title){
            updateProduct.title = title;
        }
        if(description){
            updateProduct.description = description;
        }
        if(price){
            updateProduct.price = price;
        }
        updateProduct.save();
    }

    async deleteProduct(prodId: string){
        const result = await this.productModel.deleteOne({_id: prodId}).exec();
        if(result.deletedCount === 0){
            throw new NotFoundException('Record does not exist');
        }
    }

    private async findProduct(id: string): Promise<Product> {
        let item;
        try{
            item = await this.productModel.findById(id);
        }
        catch(err){
            throw new NotFoundException(err.message);
        }
        return item;

    }
}