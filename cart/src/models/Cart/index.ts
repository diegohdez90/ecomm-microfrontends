import { Product } from "../Product";
import { ProductCart } from "../ProductCart";

export interface Cart {
	id: number;
	products: ProductCart[];
	userId: number;
}