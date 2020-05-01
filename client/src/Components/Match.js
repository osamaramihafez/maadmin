import React, { Component } from 'react'

export class Match extends Component {
    
    constructor(){
        super()
        this.state = {
            match: this.props.match
        }
    }

    render() {
        return (
            <tr className='Match'>
                <td class='team'>{this.state.match.home.name}</td>
                <td class='home_score'>{this.state.match.homeScore}</td>
                <td>-</td>
                <td class='away_score'>{this.state.match.awayScore}</td>
                <td class='team'>{this.state.match.away.name}</td>
                <td>Time</td>
                <td>Day</td>
                <td>Field</td>
            </tr>
        )
    }
}

export default Match
