import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import CountUp from "react-countup";
import TypingAnimation from "./TypingAnimation";
import Contact from "./Contact";
import { developers } from "../../data/developers ";

const AboutUs = () => {
  return (
    <section className="px-4 py-10 md:px-10 lg:px-20 bg-gradient-to-r from-amber-50 via-blue-100 to-amber-50">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Meet Our Developers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {developers.map((dev, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col bg-gradient-to-r from-pink-100 via-blue-100 to-purple-100"
          >
            <img
              src={dev.photo}
              alt={dev.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-500"
            />
            <h3 className="text-xl font-bold text-center text-gray-800">
              {dev.name}
            </h3>

            <div className="text-center text-indigo-600 font-medium mb-2">
              <TypingAnimation
                steps={[dev.role, 1500, "Tech Enthusiast", 1500]}
                loop={Infinity}
                className="text-center"
              />
            </div>

            <p className="text-center text-gray-600 text-sm mb-3">{dev.bio}</p>

            <div className="text-center text-gray-500 text-sm">
              <p>
                <strong>Location:</strong> {dev.location}
              </p>
              <p>
                <strong>Experience:</strong> {dev.experience}
              </p>
            </div>

            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {dev.skills?.map((skill, i) => (
                <span
                  key={i}
                  className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Projects:{" "}
                <CountUp
                  end={dev.projectsCount}
                  duration={2}
                  className="font-semibold text-gray-700"
                />
              </p>
            </div>

            <div className="flex justify-center gap-4 mt-4 text-indigo-600 text-xl">
              <a href={dev.github} target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href={dev.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href={dev.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href={dev.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
            </div>

            <a
              href={dev.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-center text-sm text-indigo-500 hover:underline"
            >
              Visit Portfolio
            </a>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="mt-20">
        <Contact />
      </div>
    </section>
  );
};

export default AboutUs;
