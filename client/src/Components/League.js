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
            view: 'Teams'
        }
    }

    switchView(v){
        this.setState({
            view: v
        })
    }

    render() {
        var show;
        if (this.state.view === 'Teams'){
            show = <TeamList league={this.state.leagueName} />
        }
            return (
                <div>
                    <div className='Navigation'>
                        <Button onClick={() => this.switchView('Teams')}>Teams</Button>
                        <Button onClick={() => this.switchView('Players')}>Players</Button>
                        <Button onClick={() => this.switchView('Schedules')}>Schedules</Button>
                    </div>
                    {show}
                </div>
            )
    }
}

export default League
