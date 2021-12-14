import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { title } from "process";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}

    @Post()
    addProduct(@Body('title') title: string, @Body('description') description: string, @Body('price') price: number) {
        const id = this.productsService.insertProduct(title, description, price)
        return {id}
    }

    @Get()
    allProducts(){
        return this.productsService.getProductList();
    }

    @Get(':id')
    singleProduct(@Param('id') id: string){
        return this.productsService.getProduct(id)
    }
}