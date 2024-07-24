import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="aboutContainer">
      <h1 className="title">About Our Note-Taking App</h1>
      <p className="description">
        Welcome to our professional note-taking application. With this app, you can easily add, update, and delete notes to keep your thoughts organized. For security and personalization, users are required to log in before adding any notes.
      </p>
      <div className="features">
        <h2>Key Features:</h2>
        <ul>
          <li>User authentication</li>
          <li>Create, edit, and delete notes</li>
          <li>Responsive design for all devices</li>
        </ul>
      </div>
    </div>
  );
};

export default About;