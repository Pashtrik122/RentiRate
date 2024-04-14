import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../App.css'

function HomeProducts() {
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
        <div className="blueGreenBackground">
            <h3 className="custom-color">Your Products</h3>
            <div className="d-flex justify-content-between w-100 mb-3">
                <Link className='btn btn-success createButton' to='/createProducts'>ADD PRODUCT+</Link>
            </div>
            <div className="table-wrapper"> 
                <div className="table-border"> 
                    <table className="table">
                        <thead className="tableHeader">
                            <tr>
                                <th className="tableCell">ID</th>
                                <th className="tableCell">Image</th>
                                <th className="tableCell">Name</th>
                                <th className="tableCell">Phone Nr</th>
                                <th className="tableCell">price</th>
                                <th className="tableCell">location</th>
                                <th className="tableCell smallColumn">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((product, index)=>{
                                    return (
                                        <tr key={index}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.surname}</td>
                                            <td>{product.email}</td>
                                            <td>{product.age}</td>
                                            <td>{product.gender}</td>
                                            <td className="d-flex justify-content-center">
                                                <Link className="btn btn-success marginRight readButton" to={`/read/${product.id}`}>Read</Link>
                                                <Link className="btn btn-primary marginRight editButton" to={`/edit/${product.id}`}>Edit</Link>
                                                <button onClick={() => handleDelete(product.id)} className="btn btn-danger deleteButton">Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default HomeProducts;
