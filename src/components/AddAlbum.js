import { useState } from "react";
import { useHistory } from "react-router-dom";
import './AddAlbum.css';

const AddAlbum = (props) => {

    const [title, setTitle] = useState('');
    const [userId, setUserId] = useState('');
    
    const history = useHistory();

    // Function for collecting title 
    const handleTitleChange = (e) => {
        // console.log(e.target.value);
        setTitle(e.target.value);
    }

    // Function for collecting UserId
    const handleUserIdChange = (e) => {
        setUserId(e.target.value);
    }

    // Function to submit title and userId
    const handleSubmit = (e) => {
        e.preventDefault();

        // Making sure that user must enter some value to the input field
        if (title.trim().length === 0) {
            alert("Enter title");
        }

        // Making sure user enter userId
        else if (userId.trim().length === 0) {
            alert("Enter UserId");
        }
        else {
            const albumData = {
                title: title,
                UserId: userId
            }
            props.newAlbum(albumData);

            // After submitting navigating to the homePage
            history.push('/');
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-container">
                <label htmlFor="title">Title</label>
                <input id="title" type='text' value={title} onChange={handleTitleChange} /> <br />
                <label htmlFor="userId">UserId</label>
                <input id="userId" type='number' value={userId} onChange={handleUserIdChange} /> <br />
                <button>Add Album</button>
            </div>
        </form>
    )
}
export default AddAlbum;