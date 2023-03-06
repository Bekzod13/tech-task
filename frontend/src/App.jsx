import {useState, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import Api from './api/Api';
import Add from './components/Add';
import Edit from './components/Edit';
import Modal from './components/Modal';
import Table from './components/Table';
import Context from './context/Context';

const App = () => {

  const [modal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

 

  const contextValue = {
    modal, 
    setModal,
    deleteId, 
    setDeleteId
  };

  return (
    <Context.Provider value={contextValue}>
      <Routes>
          <Route path='/' element={<Table/>}/>
          <Route path='/add' element={<Add/>}/>
          <Route path='/edit/:id' element={<Edit/>}/>
      </Routes>
      {modal && <Modal/>}
    </Context.Provider>
  );
}

export default App;
