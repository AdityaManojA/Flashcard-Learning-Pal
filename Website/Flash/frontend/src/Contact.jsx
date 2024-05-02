import React, { useState } from "react";
import "./contactpage.css"; // Ensure this CSS file is appropriate for your contact form

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for email sending logic
    // In a real application, this should be handled server-side
    alert("Email sending logic goes here. This is just a placeholder.");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h3>GET IN TOUCH</h3>
        <input
          type="text"
          id="name"
          placeholder="your name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          id="email"
          placeholder="email id"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          id="phone"
          placeholder="phone no."
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          id="message"
          rows="4"
          placeholder="how can we help you?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <button type="submit">send</button>
      </form>
    </div>
  );
}
