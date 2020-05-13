import React, { Component } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import './navigation.css'

export class Leagues extends Component {
    
    constructor(){
        super();
        this.state = {
            leagues: [],
            schedule: null
        }

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

        const leagues = this.state.leagues.map((league) =>
                <div><br></br> <Button variant="primary">{league}</Button></div> 
        );

        return (
            <div className='Navigation'>
                Choose from one of the following leagues: <br></br>
                {leagues}
            </div>
        )    
    }
}

export default Leagues
