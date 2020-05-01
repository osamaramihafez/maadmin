import React, { Component } from 'react'
import Match from './Match.js'

export class Schedule extends Component {
    
    constructor(){
        super();
        if (this.props){
            var s = this.props.schedule
        }
        this.state = {
            schedule: s,
            matchComponents: []
        }
    }

    gamesList(){
        // for(game in schedule)
        //  create a game component
        //  Append the game component to a list
        var match = <Match match=''></Match>
        var matches = this.state.matchComponents;
        matches.push(match)
        this.setState({
            matchComponents: matches
        })
    }
    
    render() {
        return (
            <table className='Schedule'>
                <tr><td>Let's see what happens</td></tr>
            </table>
        )
    }
}

export default Schedule
