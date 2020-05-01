import React, { Component } from 'react'
import axios from 'axios'

export class league extends Component {
    
    constructor(){
        this.state = {
            league: null,
            schedule: null
        }
    }
    
    render() {

        axios.get('/maadmin/api/league').then((res) => {
            this.setState({
                league: res.data.league
            })
        })

        if(this.state.league != null){
            var schedule = getSchedule();
        } else {
            var schedule = <div>
                <h3>There doesn't seem to a be schedule prepared yet.</h3>
            </div>;
        }

        return (
            <div>
                
            </div>
        )    
    }
}

export default league
