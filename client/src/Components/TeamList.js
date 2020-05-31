import React, { Component } from 'react'
import axios from 'axios'
import TeamRegistration from './TeamRegistration'
import Button from 'react-bootstrap/Button'

export class Teams extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            teams: []
        }
    }

    componentDidMount(){
        axios.get('/maadmin/api/teamList/' + this.props.league).then((res) => {
            console.log(res.data)
            this.setState({
                teams: res.data.teams
            })
        })
    }

    render() {
        if (this.state.teams !== null){
            const teams = this.state.teams.map((team) =>
                        <div key={team}><Button variant="primary" onClick={() => this.chooseLeague(team)}>{team}</Button></div> 
                );
            
            var teamList = <div className='Navigation'> Choose from to modify one of the following teams: {teams}</div>
        }
        return (
            <div>
                <TeamRegistration league={this.props.league} />
                {teamList}
            </div>
        )
    }
}

export default Teams
