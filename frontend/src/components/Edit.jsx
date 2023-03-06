import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Api from '../api/Api';
import Context from '../context/Context';

const Edit = () => {
    const {setModal, setDeleteId} = useContext(Context);
    const nameRef = useRef();
    const priceRef = useRef();
    const quantityRef = useRef();
    const navigate = useNavigate();
    const {id} = useParams();
    const [image, setImage] = useState();
    const [message, setMessage] = useState('');
    const [product, setProduct] = useState({
        name:'',
        price:'',
        quantity:'',
        amount:'',
        images: []
    });

    useEffect(() => {
        Api.get(`/products/${id}`)
            .then(({data})=>{
                setProduct(data.product)
            })
    }, []);


    const submit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            price: priceRef.current.value,
            quantity: quantityRef.current.value,
            amount: quantityRef.current.value * priceRef.current.value,
        };
        Api.post(`/products/edit/${id}`, payload)
        return navigate(`/`);
    }

    const addImg = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('product_id', id);
        Api.post('/images/create', formData)
        .then(({data})=>{
            setMessage(data.message);
        });
    }
    const refresh = () => window.location.reload(true);
    if (message === 'Successfully') {
        refresh();
        setMessage('');
    }
    

  return (
    <div className='container table'>
        <header>
        <h3>Edit this product</h3>
        <Link className='btn' to="/">Back</Link>
        </header>
        <h4>Product image</h4>
        <div className="product-images">
            {
                product.images.length === 0 ? <h2>No Image</h2>:
                product.images.map(image=>(
                    <div className="product-image" key={image.id}>
                        {
                            image.url &&
                            <img src={`http://localhost:8000/storage/${image.url}`} alt="" />
                        }
                    </div>
                ))
            }
        </div>
        <form className="add-box" onSubmit={addImg} encType='multipart/form-data' >
            <label htmlFor="image">select image</label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' className='hidden-image' />
            <button type="submit" className='btn add-btn'>Save</button>
        </form>
        <form className="add-box" onSubmit={submit}>
            <input required onChange={(e)=>setProduct({...product, name: e.target.value})} ref={nameRef} type="text" value={product.name} placeholder='Name...' />
            <input required onChange={(e)=>setProduct({...product, price: e.target.value})} ref={priceRef} type="number" value={product.price} placeholder='Price...' />
            <input required onChange={(e)=>setProduct({...product, amount: e.target.value})} ref={quantityRef} type="number" value={product.amount} placeholder='Quantity...' />
            <button type='submit' className='btn add-btn'>Save</button>
        </form>

        <div onClick={()=>{setModal(true); setDeleteId(id);}} className="delete-btn">Delete this product</div>
    </div>
  );
}

export default Edit;
