import { Link } from 'react-router-dom'
import useLogout from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {

  const { user } = useAuthContext()

  const { logout } = useLogout()

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {
            user ? <div>
              <span>{user.name}</span>
              <button onClick={() => logout()}>Logout</button>
            </div>
              : <div>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Sign up</Link>
              </div>
          }
        </nav>
      </div>
    </header>
  )
}

export default Navbar