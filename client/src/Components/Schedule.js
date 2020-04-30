import React, { Component } from 'react'
import Game from './Game.js'

export class Schedule extends Component {
    
    constructor(){
        this.state = {
            schedule = null
        }
    }
    
    render() {
        return (
            <div>
                <table>
                    {}
                    <Game></Game>
                </table>
            </div>
        )
    }
}

export default Schedule
