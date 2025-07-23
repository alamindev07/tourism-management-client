// src/pages/About/Contact.jsx
import React from "react";

const Contact = () => {
  return (
    <div className="mt-20 bg-white rounded-xl shadow-lg p-6 text-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Contact Us</h2>
      <p className="text-gray-600 mb-4">We’d love to hear from you! Reach out to us through any of the platforms below.</p>
      <div className="flex justify-center gap-4">
        <a
          href="mailto:info@yourdomain.com"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded"
        >
          Email Us
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Facebook
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded"
        >
          Instagram
        </a>
      </div>
    </div>
  );
};

export default Contact;
