import { useState } from 'react';
import reactLogo from './assets/react.svg';
import {Provider, useSelector} from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import { Router, Routes, Route } from 'react-router';
import viteLogo from '/vite.svg';
import './App.css';
import Login from './pages/Login';
import CreateTrainer from './pages/CreateTrainer';
import Trainers from './pages/Trainers';
import TrainerProfile from './pages/TrainerProfile';
import Home from './pages/Home';
import AddSubject from './pages/AddSubject';
import Subjects from './pages/Subjects';
import SubjectWithDets from './pages/SubjectWithDets';
import CreateInstitute from './pages/CreateInstitute';


const protectedRoute = ({ children, adminOnly = false})=>{
  const user = useSelector((state)=> state.trainer.trainer);
  const admin = useSelector((state)=> state.admin.admin)
}

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<CreateTrainer />}></Route>
          <Route path='/trainers' element={<Trainers />}></Route>
          <Route path='/trainer/:id' element={<TrainerProfile />}></Route>
          <Route path='/' element={<Home />}></Route>
          <Route path='/subject/new' element={<AddSubject />}></Route>
          <Route path='/subject/all' element={<Subjects />}></Route>
          <Route path='/subject/trainers' element={<SubjectWithDets />}></Route>
        </Routes>
        </PersistGate>
        </Provider>
    </>
  )
}

export default App
