import { useState } from "react";
import { useHistory } from "react-router-dom";
import './AddAlbum.css';

const UpdateAlbum = (props) => {
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedUserId, setUpdatedUserId] = useState('');

    const history = useHistory();

    // Function for collecting title 
    const handleTitleChange = (e) => {
        setUpdatedTitle(e.target.value);
        // console.log(e.target.value);
    }

    // Function for collecting UserId
    const handleUserIdChange = (e) => {
        setUpdatedUserId(e.target.value);
    }

    // Function to submit title and userId
    const handleSubmit = (e) => {
        e.preventDefault();

        // Making sure that user must enter some value to the input field
        if (updatedTitle.trim().length === 0) {
            alert("Enter title");
        }

        // Making sure user enter userId
        else if (updatedUserId.trim().length === 0) {
            alert("Enter UserId");
        }
        else {
            const UpdatedAlbumData = {
                title: updatedTitle,
                UserId: updatedUserId,
                id: updatedUserId
            }
            props.handleUpdateAlbum(UpdatedAlbumData);

            // After submitting navigating to the homePage
            history.push('/');
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <span className="update">Update</span>
            <div className="form-container">
                <label htmlFor="title">Title</label>
                <input id="title" type='text' onChange={handleTitleChange} /> <br />
                <label htmlFor="userId">UserId</label>
                <input id="userId" type='number' onChange={handleUserIdChange} /> <br />
                <button>Update Album</button>
            </div>
        </form>
    )
}
export default UpdateAlbum;