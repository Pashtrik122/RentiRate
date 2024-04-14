import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ReadProducts() {
    const [data, setData] = useState([])
    const { id } = useParams();

    useEffect(()=>{
        axios
        .get(`/get_product/${id}`)
        .then((res)=>{
            setData(res.data)
        })
        .catch((err)=>console.log(err))
    }, [id])

    return (
        <div className="container-fluid vw-100 vh-100 bg-primary">
            <h1>User {id}</h1>
            <Link to="/homeProducts" className="btn btn-success">Back</Link>
            {data.map((product) =>{
                return (
                    <ul className="list-group">
                        <li className="list-group-item">
                            <b>ID: </b>
                            {product["id"]}
                        </li>
                        <li className="list-group-item">
                            <b>Name: </b>
                            {product["name"]}
                        </li>
                        <li className="list-group-item">
                            <b>Surname: </b>
                            {product["surname"]}
                        </li>
                        <li className="list-group-item">
                            <b>Email: </b>
                            {product["email"]}
                        </li>
                        <li className="list-group-item">
                            <b>Age: </b>
                            {product["age"]}
                        </li>
                        <li className="list-group-item">
                            <b>Gender: </b>
                            {product["gender"]}
                        </li>
                    </ul>
                )
            })
            }
        </div>
    )
}

export default ReadProducts;