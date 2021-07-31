import React, { useState } from 'react';
import './dashboard.scss'; 

const NewEvent = ({ createEvent }) => {
  const [event, setEvent] = useState({
    title: '',
    venue: '',
    date: '',
  });

  const handleChange = e => {
    setEvent(oldEvent => ({
      ...oldEvent,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    createEvent(event);
    setEvent(
      {
        title: '',
        venue: '',
        date: '',
      }
    );
  };

  return (
    <div className="eventForm">
      <h1>Create a new event</h1>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="title">Title </label>
        <input type="text" name="title" id="title" value={event.title} onChange={handleChange} required={true} placeholder="Insert a title..." /><br />
        <label htmlFor="venue">Venue </label>
        <input type="text" name="venue" id="venue" value={event.venue} onChange={handleChange} required={true} placeholder="Insert a venue..." /><br />
        <label htmlFor="date">Date </label>
        <input type="datetime-local" name="date" id="date" value={event.date} onChange={handleChange} required={true} /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewEvent;
