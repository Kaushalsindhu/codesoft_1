import React from 'react'

function Card({name, description, imageUrl}) {
  return (
    <div className="card">
        <div className="image-content">
            <span className="overlay"></span>

            <div className="card-image">
            <img src={imageUrl} alt={name} className="card-img" />
            </div>
        </div>
        <div className="card-content">
            <h2 className="name">{name}</h2>
            <p className="description">{description}</p> 
        </div>
    </div>
  )
}

export default Card