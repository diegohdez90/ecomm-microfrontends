import React, { useEffect, useState } from 'react';
import { Cart } from '../models/Cart';
import { CartDetail } from '../models/CartDetail';
import { Product } from '../models/Product';
import { ProductCart } from '../models/ProductCart';

const App = () => {
	const [cart, setCart] = useState<Cart>();
	const [total, setTotal] = useState(0);
	const [details, setDetails] = useState<CartDetail>({
		products: [],
	})
	useEffect(() => {	
		fetch('https://fakestoreapi.com/carts/user/1')
			.then(res=>res.json())
			.then((data: Cart[]) => {
				setCart(data[0])
			})
	}, []);

	useEffect(() => {
		const getDetails = async () => {
			const details : (ProductCart & Product & {
				totalPrice: number
			})[] = [];
			if(cart && 'products' in cart) {
				let value = 0;
				for (let index = 0; index < (cart.products as ProductCart[]).length; index++) {
					const response = await fetch(`https://fakestoreapi.com/products/${(cart?.products as ProductCart[])[index].productId}`);
					const product: Product = await response.json();
					const price = product.price * (cart.products as ProductCart[])[index].quantity;
					value = value+ price;
					details.push({
						...product,
						...(cart.products as ProductCart[])[index],
						totalPrice: price
					})
				}
				setTotal(value);
			}
			return details;
		};
		getDetails()
			.then(data => {
				setDetails({
					products: data
				})
			})
			.catch(err => console.error(err))

		
	}, [cart])

return (<div>
		<h1>Cart</h1>
		<ul>
			{
				details.products.map((product) => 
					<li>{product.title} <br />{product.price} <br />{product.quantity} <br /> {product.totalPrice}</li>
				)
			}
		</ul>
		<div>
			<h5>Total: ${total}</h5>
		</div>
	</div>);
}

export default App;
