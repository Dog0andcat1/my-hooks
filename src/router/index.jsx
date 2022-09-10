/*
    APP> list + Edit +Means
    Login
    Register
*/
import App from '../App'
import List_table from '../pages/List_table'
import ListList from '../pages/ListList'
import Edit from '../pages/Edit'
import Means from '../pages/Means'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'

const BaseRouter=()=>(
    <Router>
        <Routes>
            <Route path='/' element={<App/>}>
                <Route path='/listtable' element={<List_table/>}></Route>
                <Route path='/listlist' element={<ListList/>}></Route>
                <Route path='/edit' element={<Edit/>}></Route>
                <Route path='/edit/:id' element={<Edit/>}></Route>
                <Route path='/means' element={<Means/>}></Route>
            </Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
        </Routes>
    </Router>
)
export default BaseRouter