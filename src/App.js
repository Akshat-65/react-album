import { useEffect, useState } from "react";
import Album from "./components/Album";
import Navbar from "./components/Navbar";
import AddAlbum from "./components/AddAlbum";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UpdateAlbum from "./components/UpdateAlbum";

function App() {

  const [album, setAlbum] = useState([]);
  const [getId, setGetId] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {

    // function for fetching albums from API
    const fetchAlbum = () => {
      setIsLoaded(false);
      fetch('https://jsonplaceholder.typicode.com/albums').then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);

        // creating an empty array to store data which we get back.
        const loadedAlbum = [];

        // looping through array of objects and pushing required data into loadedAlbum array
        for (let elem in data) {
          console.log('fetched');
          loadedAlbum.push({
            title: data[elem].title,
            id: data[elem].id,
            userId: data[elem].userId
          })
        }

        // updating state
        setAlbum(loadedAlbum);
        setIsLoaded(true);
        console.log(loadedAlbum);
      });
    }
    fetchAlbum();
  }, [])

  // Function to add new album 
  const handleNewAlbum = (newAlbumData) => {
    console.log(newAlbumData.title);
    console.log(newAlbumData.id);
    setIsLoaded(false);

    // Making a POST request
    fetch('https://jsonplaceholder.typicode.com/albums', {
      method: 'POST',
      body: JSON.stringify(newAlbumData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      const newAlbum = [...album, data];

      // Updating state
      setAlbum(newAlbum);
      setIsLoaded(true);
    })
  }

  //Function to delete an Album
  const handleDeleteAlbum = (id) => {

    // Making a DELETE request
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: 'DELETE',
    })
    const newAlbum = album.filter((elem) => elem.id !== id);

    // Updating state
    setAlbum(newAlbum);
    console.log(newAlbum);
  }

  // Function to Update an Album
  const handleUpdateAlbum = (revisedData) => {
    setIsLoaded(false);
    console.log(getId);
    console.log(revisedData);
    fetch(`https://jsonplaceholder.typicode.com/albums/${getId}`, {
      method: 'PUT',
      body: JSON.stringify(revisedData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      const revisedAlbum = [...album];
      console.log(data);

      // Finding index of id in revisedAlbum array which we need to update 
      let index = revisedAlbum.findIndex((elem) => elem.id === getId);
      console.log(index);

      // Removing the previous album and adding the updated album
      revisedAlbum.splice(index, 1, data);

      // Updating state
      setAlbum(revisedAlbum);
      setIsLoaded(true);

    })
  }

  // Function to get ID of album which we need to update
  const gettingId = (data) => {
    setGetId(data);
    console.log(data);
  }

  // Iterating through album array to display all of the albums
  const albumData = album.map((elem) => {
    return <Album key={elem.id}
      id={elem.id}
      title={elem.title}
      handleDelete={handleDeleteAlbum}
      gettingId={gettingId} />
  });

  return (
    <Router>
      <div className="wrapper">
        <Navbar />
        <Switch>
          <Route exact path="/">
            {isLoaded && <div className="container">{albumData}</div>}
            {!isLoaded && <div className="loading">Loading...</div>}
          </Route>
          <Route path="/add">
            {isLoaded && <AddAlbum newAlbum={handleNewAlbum} />}
          </Route>
          <Route path="/update">
            {isLoaded && <UpdateAlbum handleUpdateAlbum={handleUpdateAlbum} />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
