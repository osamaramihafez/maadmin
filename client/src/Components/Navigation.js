import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

import './navigation.css'

export class Navigation extends Component {
    render() {
        return (
            <div className='Navigation'>
                Register a: <Link to='/Register/Team'><Button variant="primary">Team</Button></Link>
                <Link to='/Register/Player'><Button variant="primary">Player</Button></Link>
                <Link to='/Register/Login'><Button variant="primary">Login</Button></Link>
                or Modify: <Link to='/Modify/Schedules'><Button variant="primary">Schedules</Button></Link>
                <Link style={{}} to='/Modify/Standings'><Button variant="primary">Standings</Button></Link>
                <Link style={{}} to='/Modify/Team'><Button variant="primary">a Team</Button></Link>
                <Link style={{}} to='/Modify/Player'><Button variant="primary">a Player</Button></Link>
            </div>
        )
    }
}

export default Navigation
