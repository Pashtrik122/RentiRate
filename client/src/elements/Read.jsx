import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Read() {
    const [data, setData] = useState([])
    const { id } = useParams();

    useEffect(()=>{
        axios
        .get(`/get_seller/${id}`)
        .then((res)=>{
            setData(res.data)
        })
        .catch((err)=>console.log(err))
    }, [id])

    return (
        <div className="readBackground">
            <div className="coNtainer">
                <h1>User {id}</h1>
                <Link to="/" className="btn btn-success backButton">Back</Link>
                {data.map((seller) =>{
                    return (
                        <ul className="list-group">
                            <li className="list-group-item">
                                <b>ID: </b>
                                {seller["id"]}
                            </li>
                            <li className="list-group-item">
                                <b>Name: </b>
                                {seller["name"]}
                            </li>
                            <li className="list-group-item">
                                <b>Surname: </b>
                                {seller["surname"]}
                            </li>
                            <li className="list-group-item">
                                <b>Email: </b>
                                {seller["email"]}
                            </li>
                            <li className="list-group-item">
                                <b>Age: </b>
                                {seller["age"]}
                            </li>
                            <li className="list-group-item">
                                <b>Gender: </b>
                                {seller["gender"]}
                            </li>
                        </ul>
                    )
                })
            }
            </div>
        </div>
    )
}

export default Read;