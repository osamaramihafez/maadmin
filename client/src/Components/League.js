import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import TeamList from './TeamList' 
import './navigation.css'

export class League extends Component {

    constructor(props){
        super(props);
        var name = this.props.name
        this.state = {
            leagueName: name,
            view: 'Team'
        }
    }

    render() {
        if (this.state.view === 'Team'){
            return (
                <div>
                    <div className='Navigation'>
                        <Button>Registration</Button>
                        <Button>Teams</Button>
                        <Button>Players</Button>
                        <Button>Divisions</Button>
                        <Button>Schedule</Button>
                    </div>
                    <TeamList league={this.state.leagueName} />
                </div>
            )
        }
    }
}

export default League
