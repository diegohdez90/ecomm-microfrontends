import { ProductCart } from "../ProductCart";
import { Product } from '../Product';

export interface CartDetail {
	products: (ProductCart & Product & {
		totalPrice: number
	})[];
}
