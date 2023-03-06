import { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Api from '../api/Api';

// import icons
import {FiChevronUp, FiChevronDown} from 'react-icons/fi';

const Table = () => {

    const [sortProducts, setSortProducts] = useState([]);

    useEffect(()=>{
        Api.get('/products')
          .then(({data}) => {
            setSortProducts(data.products)
          })
      }, []);

    const sorted = (key) => {
        setSortProducts( sortProducts => {
            const sortToProducts = [...sortProducts];
            if (key === 'maxPrice') {
                sortToProducts.sort((a,b) => Number(a.price) < Number(b.price) ? 1 : -1)
            }
            if(key === 'minPrice'){
                sortToProducts.sort((a,b) => Number(a.price) > Number(b.price) ? 1 : -1)
            }
            if(key === 'maxQuantity'){
                sortToProducts.sort((a,b) => Number(a.quantity) < Number(b.quantity) ? 1 : -1)
            }
            if(key === 'minQuantity'){
                sortToProducts.sort((a,b) => Number(a.quantity) > Number(b.quantity) ? 1 : -1)
            }
            if(key === 'maxAmount'){
                sortToProducts.sort((a,b) => Number(a.amount) < Number(b.amount) ? 1 : -1)
            }
            if(key === 'minAmount'){
                sortToProducts.sort((a,b) => Number(a.amount) > Number(b.amount) ? 1 : -1)
            }
            return sortToProducts;
        });
    }


  return (
    <div className='container table'>
      <header>
        <h3>Top Selling Products</h3>
        <Link className='btn' to="/add">Add</Link>
      </header>
      <div className="table-box">
        <div className="table-top">
            <div className="table-name">
                Name
            </div>
            <div className="table-element">
                <div className='table-arrows'>
                    <span onClick={()=>sorted('maxPrice')} className="top"><FiChevronUp/></span>
                    <span onClick={()=>sorted('minPrice')} className="bottom"><FiChevronDown/></span>
                </div>
                <div className="table-element-text">
                    Price
                </div>
            </div>
            <div className="table-element">
                <div className='table-arrows'>
                    <span onClick={()=>sorted('maxQuantity')}  className="top"><FiChevronUp/></span>
                    <span onClick={()=>sorted('minQuantity')} className="bottom"><FiChevronDown/></span>
                </div>
                <div className="table-element-text">
                    Quantity
                </div>
            </div>
            <div className="table-element">
                <div className='table-arrows'>
                    <span onClick={()=>sorted('maxAmount')} className="top"><FiChevronUp/></span>
                    <span onClick={()=>sorted('minAmount')} className="bottom"><FiChevronDown/></span>
                </div>
                <div className="table-element-text">
                    Amount
                </div>
            </div>
            <div className="">
                <div className="table-element-text">
                    Edit
                </div>
            </div>
        </div>
        <div className="table-body">
            {
                sortProducts.map((product)=>(
            <div key={product.id} className="table-item">
                <div className="t-name">
                    {product.name}
                </div>
                <div className="t-detail">
                    ${product.price}
                </div>
                <div className="t-detail">
                    {product.quantity}
                </div>
                <div className="t-detail">
                    ${product.amount}
                </div>
                <Link to={`/edit/${product.id}`} className="btn-change">
                    Change
                </Link>
            </div>
                ))
            }
        </div> 
      </div>
    </div>
  );
}

export default Table;
