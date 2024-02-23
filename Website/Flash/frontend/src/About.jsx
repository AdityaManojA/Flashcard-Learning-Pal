import React from 'react';
import './App.css';

export default function About() {
  return (
    <div>
      <h1 className='centered'>About Us</h1>
      
      <p className='about'>
        <strong>Our Story</strong><br />
        FLASH CARD PAL began with a simple idea: to make language learning fun, interactive, and efficient. We understand that learning a new language can be daunting, and traditional methods often lack engagement and effectiveness. That's why we set out to create a platform that utilizes flashcards, a proven method for memory retention, to make language learning accessible to everyone.
      </p>
      <p className='about'>
        <strong>Our Mission</strong><br />
        At FLASH CARD PAL, our mission is to empower language learners worldwide by providing them with innovative tools and resources to achieve their language goals. Whether you're a beginner looking to build your vocabulary or an advanced learner aiming to improve your fluency, we're here to support you every step of the way.
      </p>
      <p className='about'>
        <strong>What We Offer</strong><br />
        <ul>
          <li>Customizable Flashcards: Create personalized flashcards tailored to your learning needs. Add words, phrases, or sentences, and review them at your own pace.</li>
          <li>Interactive Quizzes: Test your knowledge with interactive quizzes designed to reinforce your learning and track your progress over time.</li>
          <li>Multi-Language Support: Learn multiple languages simultaneously with our multi-language support feature. Switch between languages seamlessly and broaden your linguistic horizons.</li>
          <li>Community Engagement: Connect with fellow language learners, share tips and resources, and motivate each other on your language learning journey.</li>
        </ul>
      </p>
      <p className='about'>
        <strong>Join Us</strong><br />
        Join the FLASH CARD PAL community today and embark on a language learning adventure like never before. Start exploring our platform, and let's unlock the world of languages together!
      </p>
    </div>
  );
}
