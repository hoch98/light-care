import { motion } from "framer-motion";
import "./App.css";
import { Text } from "./components/retroui/Text";
import { Link } from "react-router";

function About() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <div className="header">
        <Link to={"/"}>
          <Text as="h4">{"RETURN"}</Text>
        </Link>
      </div>

      <div className="hero">
        <Text as="h1">ABOUT US</Text>
      </div>

      <div className="content" style={{ backgroundColor: "#FFF59F" }}>
        <div>
          <Text as="h2" style={{ marginBottom: "3%" }}>
            <span style={{ backgroundColor: "#fff45cff" }}>WHO ARE WE?</span>
          </Text>
          <Text>
            We are a dedicated three-person team — Aiden, Felix, and Ho Yun — united
            by a shared mission: to blend technology and wellbeing in a way that feels
            natural, personal, and genuinely helpful. What began as a simple idea
            quickly grew into Light Care, a smart-mirror system designed to recognize
            signs of fatigue through facial analysis and offer meaningful guidance to
            support healthier daily habits.
            <br /><br />
            Each of us brings a unique perspective to the project. With strengths
            spanning design, engineering, user experience, and practical
            problem-solving, we combine our skills to build something that not only
            works — but feels thoughtful and human. Light Care reflects our belief
            that wellbeing shouldn’t be complicated. Sometimes, all it takes is a
            subtle reminder, an insight you might have missed, or a moment to pause
            and check in with yourself.
            <br /><br />
            Our goal is to create technology that empowers people to better understand
            their bodies and make informed decisions about their health. Whether it’s
            improving sleep routines, managing stress, or simply encouraging moments
            of rest, Light Care is built to guide users in a supportive, intuitive
            way.
          </Text>
        </div>

        <div>
          <img
            src="https://www.nicepng.com/png/detail/349-3499680_group-placeholder-placeholder-group.png"
            alt=""
            className="right"
          />
        </div>
      </div>

      <div className="content" style={{ backgroundColor: "#ff70bfff" }}>
        <div>
          <img
            src="https://www.nicepng.com/png/detail/349-3499680_group-placeholder-placeholder-group.png"
            alt=""
            className="left"
          />
        </div>
        <div>
          <Text as="h2" style={{ marginBottom: "3%" }}>
            <span style={{ backgroundColor: "#fff45cff" }}>WHAT IS LIGHT CARE?</span>
          </Text>
          Light Care is more than just a mirror — it’s a smart wellness companion designed to help you understand your body and optimize your wellbeing. At its core, Light Care uses advanced computer vision and AI to monitor subtle signs of fatigue and stress. Fine-tuned object detection models analyze your facial features in real-time, detecting indicators such as eye strain, facial tension, and even changes in skin tone.
          <br /><br />
          Using these insights, Light Care can estimate physiological metrics like heart rate just by observing slight variations in your face. From there, it provides personalized guidance, whether that’s recommending a short break, a relaxation exercise, or lifestyle adjustments to improve sleep and energy levels.
        </div>
      </div>
    </motion.div>
  );
}

export default About;
