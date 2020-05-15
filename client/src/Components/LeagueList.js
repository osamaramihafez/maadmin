import React, { Component } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import League from './League.js'
import './navigation.css'

export class LeagueList extends Component {
    
    constructor(){
        super();
        this.state = {
            leagues: [],
            schedule: null,
            leagueChosen: ''
        }

    }

    chooseLeague(leagueName){
        console.log('chosen league: ' + leagueName)
        this.setState({
            leagueChosen: leagueName
        })
    }

    componentDidMount(){
        axios.get('/maadmin/api/leagueNames').then((res) => {
            console.log(res.data)
            this.setState({
                leagues: res.data.leagues
            })
        })
    }
    
    render() {
        if(this.state.leagueChosen === '' && this.state.leagues != null){
            const leagues = this.state.leagues.map((league) =>
                    <div key={league} className='leagues'><Button variant="primary" onClick={() => this.chooseLeague(league)}>{league}</Button></div> 
            );
            return (
                <div className='Navigation'>
                    {leagues}
                </div>
            ) 
        } else if(this.state.leagueChosen != '') {
            return (
                <League name={this.state.leagueChosen} />
            ) 
        } else {
            return (
                <div className='Navigation'>
                    <p>NOTICE: This user does not manage a league</p>
                    <Button>Click here to create a new league</Button>
                </div>
            )
        }

    }
}

export default LeagueList
