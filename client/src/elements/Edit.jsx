import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Field } from 'formik';

function Edit() {
    const [data, setData] = useState([])
    const { id } = useParams();

    useEffect(()=>{
        axios
        .get(`/get_seller/${id}`)
        .then((res)=>{
            setData(res.data)
        })
        .catch((err)=>console.log(err))
    }, [id]);

    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault()

        axios.post(`/edit_user/${id}`, data[0])
        .then((res)=>{
            
            navigate('/')
            console.log(res)
        })
        .catch((err)=>console.log(err))
    }

    return (
        <div className="editBackground">
            <div className="editContainer">
            <h1 className="editTitle">User {id}</h1>
            <Link to="/" className="btn btn-success editBackButton">Back</Link>
            {data.map((seller) =>{
                return (
                    <form onSubmit={handleSubmit}>
                    <div className='editDetails'>
                        <label htmlFor='name'>Name</label>
                        <input value={seller.name} type="text" name='name' required onChange={(e)=> setData([{...data[0], name: e.target.value}])} />
                    </div>
                    <div className='editDetails'>
                        <label htmlFor='surname'>Surname</label>
                        <input value={seller.surname} type="text" name='surname' required onChange={(e)=> setData([{...data[0], surname: e.target.value}])} />
                    </div>
                    <div className='editDetails'>
                        <label htmlFor='email'>Email</label>
                        <input value={seller.email} type="email" name='email' required onChange={(e)=> setData([{...data[0], email: e.target.value}])} />
                    </div>
                    <div className='editDetails'>
                        <label htmlFor='age'>Age</label>
                        <input value={seller.age} type="number" name='age' required onChange={(e)=> setData([{...data[0], age: e.target.value}])} />
                    </div>
                    <div className='editDetails'>
                        <label htmlFor='gender'>Gender</label>
                        <Field as="select" name='gender' required>
                            <option value="">Select Gender</option>
                            <option value="Male" selected={seller.gender === "Male"}>Male</option>
                            <option value="Female" selected={seller.gender === "Female"}>Female</option>
                            <option value="Other" selected={seller.gender === "Other"}>Other</option>
                        </Field>
                    </div>

                    <div className='form-group my-3'>
                        <button type='submit' className='btn btn-success editButton editSaveButton'>Save</button>
                    </div>
                </form>
                )
            })
            }
        </div>
        </div>
    )
}

export default Edit;