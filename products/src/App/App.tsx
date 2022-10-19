import React, { useEffect, useState } from 'react';
import { Product } from '../models/Product';

const App: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	
	useEffect(() => {	
		fetch('https://fakestoreapi.com/products')
			.then(res=>res.json())
			.then(data => {
				setProducts(data);
			})
	}, [])

	return (<div>
		<h1>Products</h1>
		<div>
			<ul>
				{products.map(product => <li>{product.title}</li>)}
			</ul>
		</div>
	</div>);
}

export default App;
