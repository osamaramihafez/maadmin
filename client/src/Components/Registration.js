import React, { Component } from 'react'
import TeamRegistration from './TeamRegistration';
import PlayerRegistration from './PlayerRegistration';
import './Registration.css'

export class Registration extends Component {
    

    
    render() {
        return (
            <div id='Registration'>
                <h1>Manual registration</h1>
                <TeamRegistration></TeamRegistration>
                <PlayerRegistration></PlayerRegistration>
                
            </div>
        )
    }
}

export default Registration
