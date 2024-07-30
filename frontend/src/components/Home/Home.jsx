import React from 'react'
import './Home.css'
import Card from './Card'
import {Link} from 'react-router-dom'

function Home() {

  const cardData = [
    {
      name: 'John Doe',
      description: 'Posting jobs and finding the right candidates has never been smoother. The straightforward job posting process and applicant management tools saved us a lot of time and effort.',
      imageUrl: '/assets/profile1.jpeg'
    },
    {
      name: 'Swati Deshmukh',
      description: 'This job portal made finding my dream job so easy and efficient! The intuitive search filters and personalized job recommendations really helped narrow down my options.',
      imageUrl: '/assets/profile2.webp'
    },
    {
      name: 'Naveen Khatri',
      description: 'As an employer, I have never had an easier time finding qualified candidates. Excellent service! The platform candidate matching algorithm helped us quickly identify top-notch talent.',
      imageUrl: '/assets/profile5.jpg'
    },{
      name: 'Anu Sehrawat',
      description: 'The skill matching feature is a game-changer! It accurately matched me with jobs that align perfectly with my skills and career goals. It significantly simplified my job search.',
      imageUrl: '/assets/profile6.jpg'
    }
  ];

  return (
    <div className='homePage'>
      <div className='banner'>
        <div className="banner-img"><img src="/assets/banner1.jpg" alt="banner" /></div>
        <div className="banner-screen"></div>
      </div>  
      <div className='banner-text'>
        <h1>Connecting Talent with Opportunity</h1>
        <h2>Find Your Perfect Job Now!</h2>
        <Link to='/jobs/all'><button>Explore Job Market</button></Link>
      </div><br /><br />

      <h1 className='home-heading'>Get Started with Ease</h1>
      <div className='todo'>
        <div className='todo-div'>
          <span className='todo-icon'>📝</span><br /><br />
          <span className='todo-text'>Find and apply for your dream job in just a few clicks!</span>
        </div>
        <div className='todo-div'>
          <span className='todo-icon'>📢</span><br /><br />
          <span className='todo-text'> Reach top talent quickly with our easy-to-use job posting feature!</span>
        </div>
        <div className='todo-div'>
          <span className='todo-icon'>🧠</span><br /><br />
          <span className='todo-text'>Smart Skill Match with jobs fitting your skills and expertise!</span>
        </div>
      </div><br /><br />

      <h1 className='home-heading'>What our users say</h1>
      <div className='home-reviewDiv'>
        <div className="card-wrapper">
          {cardData.map((card, index) => (
          <Card
            key={index} 
            name={card.name}
            description={card.description}
            imageUrl={card.imageUrl}
          />
          ))}
        </div>
      </div><br /><br />

      <h1 className="home-heading">Join a Thriving Community</h1>
      <div className="statistics">
        <h2 className="stats-head">Over 10,000 Active Job Listings</h2>
        <p className="stats-para">Our platform boasts a wide range of opportunities across various industries and levels, ensuring you find the perfect fit for your skills and career aspirations.</p><br /><br />

        <h2 className="stats-head">5,000+ Registered Employers</h2>
        <p className="stats-para">From leading multinational corporations to innovative startups, our diverse network of employers is constantly looking for talented individuals to join their teams.</p><br /><br />

        <h2 className="stats-head">50,000+ Successful Job Placements</h2>
        <p className="stats-para">We take pride in connecting job seekers with their dream jobs. Our success stories are a testament to the effectiveness of our platform in bridging the gap between talent and opportunity.</p><br /><br />

        <h2 className="stats-head">100,000+ Monthly Visitors</h2>
        <p className="stats-para">Our user-friendly platform attracts a large and engaged audience, providing employers with a vast pool of potential candidates and job seekers with numerous opportunities.</p><br /><br />
      </div>
    </div>
  )
}

export default Home