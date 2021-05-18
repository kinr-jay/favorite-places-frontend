import React from "react"

const Display = ({ favPlaces, handleDelete, selectPlace, history }) => {
  const loading = () => {
    return <h1>Let your mind take you there...</h1>
  }

  const loaded = () => {
    return (
      <div>
        {favPlaces.map((place, index) => (
          <div className="place" key={index}>
            <h2>{place.name}</h2>
            <img src={place.img} alt="" />
            <p>{place.description}</p>
            <button
              onClick={() => {
                selectPlace(place)
                history.push("/edit")
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                handleDelete(place)
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    )
  }

  return favPlaces ? loaded() : loading()
}

export default Display
