import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from './products.model';

@Injectable()
export class ProductsService{
    private products: Product[] = [];

    insertProduct(title: string, description: string, price: number){
        const generatedId= Math.random().toString();
        const productCreated = new Product(generatedId, title, description, price);
        this.products.push(productCreated);
        return generatedId;
    }

    getProductList(){
        return [...this.products];
    }

    getProduct(id: string){
        const item = this.products.find(prod=>prod.id===id);
        if(!item){
            throw new NotFoundException;
        }
        return item;
    }
}