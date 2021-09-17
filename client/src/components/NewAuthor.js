import axios from 'axios';
import React, {useState} from 'react';
import { useHistory, Link } from "react-router-dom";

const NewAuthor = () => {

    const history = useHistory(); //this is for redirecting when we submit the form

    let [formInfo, setFormInfo] = useState({
        name: null
    })

    let [validationErrors, setValidationErrors] = useState({});


    const changeHandler = (e)=>{
        console.log("changin something")
        console.log(e.target.name, e.target.value)
        if(e.target.type == "checkbox"){ //update state a little differently if the event target is the checkbox
            console.log("How tho?")
        } else{//for all the other input types, update state as we normally do
            setFormInfo({ 
                ...formInfo,
                [e.target.name]:e.target.value
            })

        }
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        console.log("submitted with this info-->", formInfo)
        axios.post("http://localhost:8000/api/authors", formInfo)
            .then(res=>{
                console.log("response after submitting post request-->", res)
                if(res.data.err){
                    // If there are validation errors, show the errors
                    setValidationErrors(res.data.err.errors);

                } else {
                    // If there are no error in the submission then add info to wall
                    history.push("/");
                }
            })
            .catch(err=>console.log("errrrrr-->", err))
    }
    return (
        <div>
            <h3>Add a new author</h3>
            <div className="card">
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="">Name:</label>
                        <input onChange={changeHandler} type="text" name="name" id="" className="form-control"/>
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

export default NewAuthor;