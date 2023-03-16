import {useEffect, useState} from "react";

export default function Products() {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [limit, setLimit] = useState(5)
    const [pagination, setPagination] = useState(false)
    useEffect(() => {
       fetchProducts()
    }, [])

    const fetchProducts = (pagelimit) => {
        setLoading(true)
        fetch(`https://fakestoreapi.com/products?limit=${pagelimit}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }).then(async response => {
            setLoading(false)
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                alert(error)
                return Promise.reject(error);
            }
            console.log(data);
            setProducts(data)
        })
    }

    const tooglePagination = () => {
         console.log(limit)
        if (limit === 20){
            setPagination(true)
        }
         setLimit(limit + 5)
         fetchProducts(limit)
    }

    return (
        <><h1>Products listing</h1>
            <button onClick={() => {tooglePagination()}} disabled={pagination}>Next</button>
            <table >
                <thead>
                <tr>
                    <th>
                        id
                    </th>
                    <th>
                        image
                    </th>
                    <th>
                        title
                    </th>
                    <th>
                        price
                    </th>
                    <th>
                        category
                    </th>
                </tr>
                </thead>
                <tbody>
                {loading ? <span>loading...</span> :

                    products.map((product,index) =>  {
                        return <tr key={product.id}>
                            <td>{product.id}</td>
                            <td><img src={product.image} alt={product.title} width="50" height="50" /></td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                        </tr>
                    })
                }

                </tbody>

            </table>
        </>

    );
}