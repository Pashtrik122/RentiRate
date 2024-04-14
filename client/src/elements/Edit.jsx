import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

function Edit() {
    const [seller, setSeller] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`/get_seller/${id}`)
            .then((res) => {
                setSeller(res.data[0]);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required!"),
        surname: Yup.string().required("Surname is required!"),
        email: Yup.string().email("Invalid email").required("Email is required!"),
        age: Yup.number().positive("Age must be a positive number").required("Age is required!"),
        gender: Yup.string().required("Gender is required!"),
    });

    function handleSubmit(values, { setSubmitting }) {
        axios.post(`/edit_user/${id}`, values)
            .then((res) => {
                navigate('/');
                console.log(res);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setSubmitting(false);
            });
    }

    return (
        <div className="editBackground">
            <div className="editContainer">
                <h1 className="editTitle">Edit User {id}</h1>
                <Link to="/" className="btn btn-success editBackButton">Back</Link>
                {seller && (
                    <Formik
                        initialValues={{
                            name: seller.name || '',
                            surname: seller.surname || '',
                            email: seller.email || '',
                            age: seller.age || '',
                            gender: seller.gender || '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="editDetails">
                                    <label htmlFor="name">Name:</label>
                                    <Field type="text" name="name" placeholder="Name..." />
                                    <ErrorMessage name="name" component="div" className="error" />
                                </div>
                                <div className="editDetails">
                                    <label htmlFor="surname">Surname:</label>
                                    <Field type="text" name="surname" placeholder="Surname..." />
                                    <ErrorMessage name="surname" component="div" className="error" />
                                </div>
                                <div className="editDetails">
                                    <label htmlFor="email">Email:</label>
                                    <Field type="email" name="email" placeholder="Email..." />
                                    <ErrorMessage name="email" component="div" className="error" />
                                </div>
                                <div className="editDetails">
                                    <label htmlFor="age">Age:</label>
                                    <Field type="number" name="age" placeholder="Age..." />
                                    <ErrorMessage name="age" component="div" className="error" />
                                </div>
                                <div className="editDetails">
                                    <label htmlFor="gender">Gender:</label>
                                    <Field as="select" name="gender">
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </Field>
                                    <ErrorMessage name="gender" component="div" className="error" />
                                </div>
                                <div className="form-group my-3">
                                    <button type="submit" className="btn btn-success editButton editSaveButton" disabled={isSubmitting}>Save</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        </div>
    );
}

export default Edit;