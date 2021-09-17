import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import {
    useHistory,
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";

const Edit = () => {

    const { idParam } = useParams();
    const [authorInfo, setAuthorInfo] = useState({});
    const history = useHistory(); //this is for redirecting when we submit the form

    let [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${idParam}`)
            .then(res => {
                console.log(res)
                setAuthorInfo(res.data.results)
            })
            .catch(err => {
                console.log("Error:", err)
            })
    }, [idParam])

    const changeHandler = (e) => {
        console.log("changin something")
        console.log(e.target.name, e.target.value)
        if (e.target.type == "checkbox") { //update state a little differently if the event target is the checkbox
            console.log("How tho?");
        } else {//for all the other input types, update state as we normally do
            setAuthorInfo({
                ...authorInfo,
                [e.target.name]: e.target.value
            })

        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/authors/${idParam}`, authorInfo)
            .then(res => {
                console.log(res)
                if(res.data.err){
                    // If there are validation errors, show the errors
                    setValidationErrors(res.data.err.errors);

                } else {
                    // If there are no error in the submission then add info to wall
                    history.push("/");
                }
            })
            .catch(err => console.log("Error:", err))

    }

    return (
        <div>
            <h3>Edit this author</h3>
            <div className="card">
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="">Name:</label>
                        <input onChange={changeHandler} type="text" name="name" id="" className="form-control" value={authorInfo.name} />
                        <p className="text-danger">{validationErrors.name? validationErrors.name.message:""}</p>
                    </div>
                    <div className="card-body">
                        <Link className="btn btn-info" to="/">Cancel</Link>
                        <input className="btn btn-info" type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    );

}

export default Edit