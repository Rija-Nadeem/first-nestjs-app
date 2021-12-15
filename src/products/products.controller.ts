import { Controller, Get, Post, Body, Param, Patch, Delete } from "@nestjs/common";
import { title } from "process";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}

    @Post()
    async addProduct(@Body('title') title: string, @Body('description') description: string, @Body('price') price: number) {
        const id = await this.productsService.insertProduct(title, description, price);
        return {id}
    }

    @Get()
    async allProducts(){
        return await this.productsService.getProductList();
    }

    @Get(':id')
    singleProduct(@Param('id') id: string){
        return this.productsService.getProduct(id);
        // return result;
    }

    @Patch(':id')
    async updateProduct(@Param('id') id: string, @Body('title') title: string, @Body('description') description: string, @Body('price') price: number){
        await this.productsService.updateProduct(id, title, description, price);
        return null;
    }

    @Delete(':id')
    async removeProduct(@Param('id') id : string){
        await this.productsService.deleteProduct(id);
        return null;
    }
}