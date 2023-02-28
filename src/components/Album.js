import { Fragment } from 'react';
import albumImage from '../assets/image.jpg';
import './Album.css';
import { Link } from 'react-router-dom';

const Album = (props) => {

    // Function to handle delete
    const handleDelete = () => {
        console.log(props.id);
        props.handleDelete(props.id);
    }

    // Function to handle upadate
    const handleUpdate = () => {
        props.gettingId(props.id);
    }

    return (
        <Fragment>
            <div className="album-container">
                <span className="title">{props.title}</span>
                <img className="image" src={albumImage} alt='disc' ></img>
                <div className="update-delete">
                    <Link to="/update"> <button onClick={handleUpdate}>Update</button> </Link>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </Fragment>
    )
}
export default Album;