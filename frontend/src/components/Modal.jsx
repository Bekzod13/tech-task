import {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../api/Api';
import Context from '../context/Context';

const Modal = () => {
  const navigate = useNavigate();
    const {setModal, deleteId} = useContext(Context);
    const deleteProduct = () => {
      const paylaod = {
        id: deleteId
      }
        Api.post(`/products/destoroy`, paylaod)
          .then(res=>{
            console.log(res);
          });
          setModal(false);
          navigate('/')
    }
  return (
    <div className='modal-container'>
      <div className="modal">
        <h1>Are you sure?</h1>
        <div onClick={()=>setModal(false)} className='btn'>cancel</div>{' '}
        <div onClick={deleteProduct} className='delete-btn'>delete</div>
      </div>
    </div>
  );
}

export default Modal;
