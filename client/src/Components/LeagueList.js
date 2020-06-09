import React, { Component } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import League from './League.js'
import LeagueForm from './LeagueForm'
import './navigation.css'

export class LeagueList extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            leagues: [],
            schedule: null,
            leagueChosen: '',
            create: false
        }

    }

    chooseLeague(leagueName){
        if(leagueName === 'Create a new league'){
            this.createLeague()
            return;
        }
        console.log('chosen league: ' + leagueName)
        this.setState({
            leagueChosen: leagueName
        })
    }

    createLeague(){
        this.setState({
            create: true
        })
    }

    leagueCreated(){
        this.setState({
            create: false
        })
        axios.get('/maadmin/api/' + this.props.username + '/leagueNames').then((res) => {
            console.log(res.data)
            if (res.data.leagues){
                this.setState({
                    leagues: res.data.leagues
                })
            }
        })
    }

    componentDidMount(){
        console.log("attempting to recieve leagues");
        axios.get('/maadmin/api/' + this.props.username + '/leagueNames').then((res) => {
            console.log(res.data)
            if (res.data.leagues){
                this.setState({
                    leagues: res.data.leagues
                })
            }
        })
    }
    
    render() {
        var l = this.state.leagues.slice(); //Just copying a list
        l.push('Create a new league') //Adding a create a new league button to the end of the list
        if (this.state.create === true){
            //We want to check if the create button was clicked, if so then we display the create a league form
            return(
                <LeagueForm back={this.leagueCreated.bind(this)} username={this.props.username}/>
            )
        } else if(this.state.leagueChosen === '' && this.state.leagues != null){
            //Map every league to a button
            const leagues = l.map((league) =>
                    <div key={league} className='leagues'><Button variant="primary" onClick={() => this.chooseLeague(league)}>{league}</Button></div> 
            );
            return (
                <div className='Navigation'>
                    {leagues}
                </div>
            ) 
        } else if (this.state.leagueChosen !== '') {
            //If a league has been chosen, switch to it's view
            return (
                <League name={this.state.leagueChosen} username={this.props.username} />
            ) 
        }

    }
}

export default LeagueList
