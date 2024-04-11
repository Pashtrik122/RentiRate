import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
    const [data, setData] = useState(null);
    const { id } = useParams();

    useEffect(()=>{
        axios
        .get(`/get_seller/${id}`)
        .then((res)=>{
            setData(res.data);
        })
        .catch((err)=>console.log(err))
    }, [id]);

    //const [formData, setFormData] = useState({
    //    name: '',
    //    surname: '',
    //    email: '',
    //    gender: '',
    //    birthday: ''
    //});

    //useEffect(() =>{
    //    if (data && data.length > 0) {
    //        const user = data[0];
    //        setFormData({
    //            name: user.name,
    //            surname: user.surname,
    //            email: user.email,
    //            gender: user.gender,
    //            birthday: user.birthday
    //        });
    //    }
    //}, [data]);

    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault()

        axios.post(`/edit_user/${id}`, data[0]) //formData data[0]
        .then((res)=>{
            
            navigate('/')
            console.log(res)
        })
        .catch((err)=>console.log(err))
    }

    //const handleInputChange = (e) =>{
    //    const { name, value } = e.target;
    //    setUser({ ...user, [name]: value});
    //}

    return (
        <div className="container-fluid vw-100 vh-100 bg-primary">
            <h1>User {id}</h1>
            <Link to="/" className="btn btn-success">Back</Link>
            {data.map((seller) =>{
                return ( 
                    <form onSubmit={handleSubmit}>
                    <div className='form-group my-3'>
                        <label htmlFor='name'>Name</label>
                        <input value={seller.name} type="text" name='name' required onChange={(e)=> setData([{...data[0], name: e.target.value}])} />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='surname'>Surname</label>
                        <input value={seller.surname || ''} type="text" name='surname' required onChange={(e)=> setData([{...data[0], surname: e.target.value}])} />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='email'>Email</label>
                        <input value={seller.email || ''} type="email" name='email' required onChange={(e)=> setData([{...data[0], email: e.target.value}])} />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='age'>Age</label>
                        <input value={seller.age} type="number" name='age' required onChange={(e)=> setData([{...data[0], age: e.target.value}])} />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='gender'>Gender</label>
                        <input value={seller.gender || ''} type="text" name='gender' required onChange={(e)=> setData([{...data[0], gender: e.target.value}])} />
                    </div>
                    <div className='form-group my-3'>
                        <button type='submit' className='btn btn-success'>Save</button>
                    </div>
                </form>
                )
            })
            }
        </div>
    )
}

export default Edit;