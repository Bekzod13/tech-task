import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../api/Api';

const Add = () => {
    const nameRef = useRef();
    const priceRef = useRef();
    const quantityRef = useRef();
    const navigate = useNavigate();
    const submit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            price: priceRef.current.value,
            quantity: quantityRef.current.value,
            amount: quantityRef.current.value * priceRef.current.value,
        };
        Api.post('/products/create', payload)
        return navigate('/');
    }

  return (
    <div className='container table'>
        <header>
        <h3>Add new product</h3>
        <Link className='btn' to="/">Back</Link>
        </header>
        <form className="add-box" onSubmit={submit}>
            <input required ref={nameRef} type="text" placeholder='Name...' />
            <input required ref={priceRef} type="number" placeholder='Price...' />
            <input required ref={quantityRef} type="number" placeholder='Quantity...' />
            <button type='submit' className='btn add-btn'>Save</button>
        </form>
    </div>
  );
}

export default Add;
