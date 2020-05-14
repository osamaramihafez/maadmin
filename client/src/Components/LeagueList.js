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
        if(this.state.leagueChosen === ''){
            const leagues = this.state.leagues.map((league) =>
                    <div key={league}><br></br> <Button variant="primary" onClick={() => this.chooseLeague(league)}>{league}</Button></div> 
            );
            return (
                <div className='Navigation'>
                    Choose from one of the following leagues: <br></br>
                    {leagues}
                </div>
            ) 
        } else {
            return (
                <League name={this.state.leagueChosen} />
            ) 
        }

    }
}

export default LeagueList
