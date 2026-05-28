import './Profile.css'
import { Container, Row, Col } from 'react-bootstrap'
import ProfileMenu from '../../components/profileMenu/ProfileMenu'
import ProfileForm from '../../components/profileForm/ProfileForm'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

const Profile = () => {
  const { activeUser, isAuthenticated, fnIsAuthenticated, getUserData } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      fnIsAuthenticated(true)
    } else {
      navigate('/register')
    }
  }, [isAuthenticated])

  useEffect(getUserData, [])

  return (
    <Container className='py-5'>
      <Row className='justify-content-around'>
        <Col md={3} className='profile-menu-section'>
          <ProfileMenu />
        </Col>
        <Col md={8} className='profile-form-section'>
          <ProfileForm activeUser={activeUser} getUserData={getUserData} />
        </Col>
      </Row>
    </Container>
  )
}

export default Profile
