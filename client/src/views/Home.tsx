import { MapPin, Users, MessageSquare, ChevronRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IcurrentUser, Iparam } from '../types/types';
import useAuth from '../hooks/useContext';
import Navbar from '../components/Navbar';
import logo from './header.jpeg'

const Home = () => {

    const {currentUser} : Iparam = useAuth();
    const {logout} = useAuth();
    console.log(currentUser);
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <Navbar/>        
        <div className="container mx-auto px-6 py-24 flex">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">
              Find and Connect with Healthcare Professionals Instantly
            </h1>
            <p className="text-xl mb-8 text-blue-50">
              Access nearby doctors, save your favorites, and get AI-powered health guidance
              all in one place.
            </p>
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition inline-flex items-center">
                            <Link to="/chat">Get Started Now</Link>
              <ChevronRight className="ml-2" />
            </button>
          </div>
               {    // <div>
                     //   <img src={logo}/>
                    //</div>
                    }
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>
        
        <div className="grid md:grid-cols-3 gap-12">
          {/* Map Feature */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Interactive Map</h3>
            <p className="text-gray-600">
              Discover healthcare providers in your area with our interactive map. Save locations
              and find the perfect doctor near you.
            </p>
          </div>

          {/* Doctors Feature */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Save Your Doctors</h3>
            <p className="text-gray-600">
              Keep track of your preferred healthcare providers. Build a personalized list
              of trusted medical professionals.
            </p>
          </div>

          {/* Chat Feature */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">AI Health Assistant</h3>
            <p className="text-gray-600">
              Get instant health guidance from our AI chatbot. Quick answers to your
              health-related questions 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose Us</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              'Instant access to nearby healthcare professionals',
              'User-friendly interactive map interface',
              'Save and manage your preferred doctors',
              'AI-powered health guidance available 24/7',
              'Secure and private communication',
              'Free to use basic features'
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-4 bg-white p-4 rounded-lg">
                <Check className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of users who have already discovered a better way to manage their
          healthcare journey.
        </p>
        <div className="space-x-4">
          <button className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
            Login Now
          </button>
          <button className="px-8 py-4 border border-blue-600 text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition">
            Learn More
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">CAREPRO</div>
            <p className="text-gray-400 mb-6">
              Connecting you with quality healthcare professionals
            </p>
            <div className="text-sm text-gray-400">
              © 2025 CAREPRO. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
