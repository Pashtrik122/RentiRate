import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    image: Yup.string().required('Image is required!'),
    name: Yup.string().required('Name is required!').matches(/^[a-zA-Z]+$/, 'Name should have only letters'),
    numeri_tel: Yup.string().required('Phone number is required!').matches(/^[0-9]+$/, 'Phone number should only contain numbers').test('max-length', 'Phone number must be at most 12 characters', value => value && value.length <= 12),
    cmimi: Yup.number().positive('Price must be a positive number').required('Price is required!'),
    lokacioni: Yup.string().required('Location is required!').matches(/^[a-zA-Z]+$/, 'Location should have only letters'),
});

function CreateProducts() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        image: '', 
        name: '',
        numeri_tel: '',
        cmimi: '',
        lokacioni: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            image: file
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    validationSchema.validate(formData, { abortEarly: false })
        .then(() => {
            const formDataToSend = new FormData();
            formDataToSend.append('image', formData.image);
            formDataToSend.append('name', formData.name);
            formDataToSend.append('numeri_tel', formData.numeri_tel);
            formDataToSend.append('cmimi', formData.cmimi);
            formDataToSend.append('lokacioni', formData.lokacioni);
            
            axios.post('/add_user', formDataToSend)
                .then((response) => {
                    alert('Product added successfully!');
                    navigate('/');
                })
                .catch((err) => {
                    alert('Failed to add product. Please try again.');
                    console.error('Error adding product:', err);
                    setIsSubmitting(false);
                    setErrors({ submit: 'Failed to add product. Please try again.' });
                });
        })
        .catch((validationErrors) => {
            const errorsObj = {};
            validationErrors.inner.forEach(error => {
                errorsObj[error.path] = error.message;
            });
            setErrors(errorsObj);
            setIsSubmitting(false);
        });
};


    return (
        <div className='createBackground'>
            <div className='container'>
                <h3 className='addSeller'>Add Products</h3>
                <div className='homeButton'>
                    <Link to='/homeProducts' className='btn btn-success createButton marginRight'>Home</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='details'>
                        <label htmlFor="image">Image:</label>
                        {/* Modified file input to call handleFileChange */}
                        <input type="file" name='image' onChange={handleFileChange} />
                        {errors.image && <div className="error">{errors.image}</div>}
                    </div>
                    <div className='details'>
                        <label htmlFor="name">Name:</label>
                        <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder='Name...' />
                        {errors.name && <div className="error">{errors.name}</div>}
                    </div>
                    <div className='details'>
                        <label htmlFor="numeri_tel">Phone Number:</label>
                        <input type="text" name='numeri_tel' value={formData.numeri_tel} onChange={handleChange} placeholder='Phone Number...' />
                        {errors.numeri_tel && <div className="error">{errors.numeri_tel}</div>}
                    </div>
                    <div className='details'>
                        <label htmlFor="cmimi">Price:</label>
                        <input type="number" name='cmimi' value={formData.cmimi} onChange={handleChange} placeholder='Price...' />
                        {errors.cmimi && <div className="error">{errors.cmimi}</div>}
                    </div>
                    <div className='details'>
                        <label htmlFor="lokacioni">Location:</label>
                        <input type="text" name='lokacioni' value={formData.lokacioni} onChange={handleChange} placeholder='Location...' />
                        {errors.lokacioni && <div className="error">{errors.lokacioni}</div>}
                    </div>
                    <div className='saveButton'>
                        <button type='submit' className='btn btn-success createButton' disabled={isSubmitting}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateProducts;
