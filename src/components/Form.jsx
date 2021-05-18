import React, { useState } from "react"

const Form = ({ label, place, handleAction, history }) => {
  const [formData, setFormData] = useState(place)

  const handleChange = (event) => {
    setFormData({ ...place, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleAction(formData)
    history.push("/")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={formData.name}
      />
      <input
        type="text"
        name="img"
        onChange={handleChange}
        value={formData.img}
      />
      <input
        type="text"
        name="description"
        onChange={handleChange}
        value={formData.description}
      />
      <input type="submit" value={label} />
    </form>
  )
}

export default Form
