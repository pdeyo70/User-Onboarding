import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import '../App.css';
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ errors, touched, values, status }) => {

    const [users, setUsers] = useState([]);
    console.log(users);

    useEffect(() => {
        if (status) {
            setUsers([...users, status])
        }
    },
        [status]
    )

    return (
        <div>
            <Form>
                <Field
                    component="input"
                    type="text"
                    name="name"
                    placeholder="Please enter the new user's name."
                />
                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                )}
                <Field
                    component="input"
                    type="email"
                    name="email"
                    placeholder="User's email"
                />
                {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                )}
                <Field
                    component="input"
                    type="password"
                    name="password"
                    placeholder="Please choose a password"
                />
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}
                <Field
                    type="checkbox"
                    name="tos"
                    checked={values.tos}
            />
                <button>
                    Submit
                </button>
            </Form>
            {users.map(user => (
                <p key={user.name}>{user.name}</p>
            ))}
        </div>
    )
}

const formikHOC = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
        return {    
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        };
},
    validationSchema: Yup.object().shape({
        name: Yup.string().required("not a good input"),
        email: Yup.string().email('Invalid email.').required("Required"),
        //password: Yup.password().required()
    }),
    handleSubmit(values, { setStatus, resetForm }) {
        axios
            .post("https://reqres.in/api/users", values)
            .then(res => {
                console.log("handleSubmit: then: res: ", res);
                setStatus(res.data);
                resetForm();
            })
            .catch(err => console.error("handleSubmit: catch: err: ", err));
    }
});

const UserFormWithFormik = formikHOC(UserForm);

export default UserFormWithFormik;