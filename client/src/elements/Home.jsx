import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
    const [data, setData] = useState([]);
    const [deleted, setDeleted] = useState(true);

    useEffect(()=>{
        if (deleted) {
            setDeleted(false)
            fetchData();
        }
    }, [deleted]);

    const fetchData = () =>{
        axios.get('/rentirate')
        .then((res)=>{
            console.log(data);
            setData(res.data);
        })
        .catch((err)=>console.log(err))
    }

    function handleDelete(id){
        axios.delete(`/delete/${id}`)
        .then((res)=>{
            setDeleted(true)
        })
        .catch((err)=> console.log(err))
    }

    return (
        <div className="container-fluid bg-primary vh-100 vw-100">
            <h3>Sellers</h3>
            <div className="d-flex justify-content-end">
                <Link className='btn btn success' to='/create' >Create+</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((seller)=>{
                            return (<tr key = {seller.id}>
                                <td>{seller.id}</td>
                                <td>{seller.name}</td>
                                <td>{seller.surname}</td>
                                <td>{seller.email}</td>
                                <td>{seller.age}</td>
                                <td>{seller.gender}</td>
                                <td>
                                <Link className="btn btn-success" to={`/read/${seller.id}`}>Read</Link>
                                <Link className="btn btn-success" to={`/edit/${seller.id}`}>Edit</Link>
                                    <button onClick={()=>handleDelete(seller.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Home