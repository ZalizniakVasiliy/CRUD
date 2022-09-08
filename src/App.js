import React from "react";
import {Routes, Route} from 'react-router-dom';
import MainPage from "./pages/MainPage";
import CreatePost from "./pages/CreatePost";
import WholePost from "./pages/WholePost";

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='createPost' element={<CreatePost/>}/>
                <Route path='wholePost/:id' element={<WholePost/>}/>
            </Routes>
        </div>
    );
};

export default App;
