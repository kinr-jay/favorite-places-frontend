import React, { useState } from "react"
import { Route, Link, Switch } from "react-router-dom"
import Display from "./components/Display"
import Form from "./components/Form"
import "./App.css"

function App() {
  const url = "http://localhost:4500"
  const emptyPlace = {
    name: "",
    img: "",
    description: "",
  }

  const [favPlaces, setFavPlaces] = useState([])
  const [selectedPlace, setSelectedPlace] = useState(emptyPlace)

  const getPlaces = () => {
    fetch(url + "/places")
      .then((response) => response.json())
      .then((data) => {
        setFavPlaces(data)
      })
  }

  React.useEffect(() => getPlaces(), [])

  const selectPlace = (place) => {
    setSelectedPlace(place)
  }

  const handleCreate = (newPlace) => {
    fetch(url + "/places", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlace),
    }).then(() => {
      getPlaces()
    })
  }

  const handleUpdate = (place) => {
    fetch(url + "/places/" + place._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(place),
    }).then(() => {
      getPlaces()
    })
  }

  const handleDelete = (place) => {
    fetch(url + "/places/" + place._id, {
      method: "delete",
    }).then(() => {
      getPlaces()
    })
  }

  return (
    <div className="App">
      <h1>I'd rather be here...</h1>
      <Link to="/edit">
        <button>Take me away.</button>
      </Link>
      <Switch>
        <Route
          exact
          path="/"
          render={(rp) => (
            <Display
              {...rp}
              favPlaces={favPlaces}
              handleDelete={handleDelete}
              selectPlace={selectPlace}
            />
          )}
        />
        <Route
          path="/create"
          render={(rp) => (
            <Form
              {...rp}
              label="create"
              place={emptyPlace}
              handleAction={handleCreate}
            />
          )}
        />
        <Route
          path="/edit"
          render={(rp) => (
            <Form
              {...rp}
              label="edit"
              place={selectedPlace}
              handleAction={handleUpdate}
            />
          )}
        />
      </Switch>
    </div>
  )
}

export default App
