import { useContext, useEffect } from 'react'
import { Routes , Route, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/firebase-context'
import { UserContext } from '../contexts/user-context'
import Login from './login'
import Profile from './profile'
import { SignUp } from './signup'

function App() {
  const { currentUser } = useContext(AuthContext)
  // const { currentDBUser } = useContext(UserContext)
  const navigate = useNavigate()

  // NOTE: console log for testing purposes
  // console.log(currentDBUser)
  console.log('User:', !!currentUser);

  // Check if the current user exists on the initial render.
  useEffect(() => {
    if (currentUser) {
      navigate('/profile')
    }
  }, [currentUser])
  
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="profile" element={currentUser ? <Profile />: <Login />} />
    </Routes>
  )
}

export default App
