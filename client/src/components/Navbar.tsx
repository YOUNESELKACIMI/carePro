import { IcurrentUser, Iparam } from '../types/types'
import useAuth from '../hooks/useContext'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const {currentUser} : Iparam = useAuth();
    const {logout} = useAuth();
  return (
    <nav className="container mx-auto px-6 py-4 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-400 text-white">
          <div className="text-2xl font-bold">
                <Link to="/">CAREPRO</Link>
            </div>
          <div className="space-x-4 flex items-center">
            {!currentUser && 
                (<Link to={`/login`} className='px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition'>Get Started</Link>)
            }
            {currentUser && 
                <div className='flex items-center gap-4'>
                    <h1>Welcome back, {(currentUser as IcurrentUser).name}</h1>
                    <button onClick={logout} className='px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition'>Logout</button>
                </div>
            }
          </div>
        </nav>

  )
}

export default Navbar
