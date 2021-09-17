import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Author.module.css';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";

const AllAuthors = () => {

    //have a variable to store all the ninjas i get back from the api in
    const [allAuthors, setAllAuthors] = useState([])

    //state variable to track if delete is clicked
    const [deleteClicked, setDeleteClicked] = useState(false)

    //call the api upon initial rendering (hint hint) of the component and save the array of ninjas into my variable to store all the ninjas in
    useEffect(() => {
        axios.get("http://localhost:8000/api/authors")
            .then(res => {
                console.log("******res is this-->", res)
                setAllAuthors(res.data.results)
            })
            .catch(err => console.log("ERRORRRR-->", err))
    }, [deleteClicked])

    const deleteClickHandler = (e, idOfAuthor) => {
        console.log("Attempting to delete: ", idOfAuthor)
        axios.delete(`http://localhost:8000/api/authors/${idOfAuthor}`)
            .then(res => {
                console.log(res)
                setDeleteClicked(!deleteClicked)
            })
            .catch(res => {
                console.log("Error: ", res)
            })
    }


    return (
        <div style = {{margin:"auto"}}>
            <h3 className="display-6" >We have quotes by:</h3>
            <div className={styles.all_authors}>
                <table className="table-primary " style = {{margin:"auto"}}>
                    <thead>
                        <tr className="table-dark">
                            <th>Author</th>
                            <th>Actions Available</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* display all the authors in a table */}
                    {allAuthors.map((author, i) => {
                        return <tr key={i} className="table-light">
                
                                <td><strong>{author.name}</strong></td>
                                <td><Link to={`/author/edit/${author._id}`} className="btn-info btn ml-3">Edit</Link><button onClick={(e) => deleteClickHandler(e, author._id)} className="btn btn-danger">Delete</button></td>
                
                            </tr>
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default AllAuthors;