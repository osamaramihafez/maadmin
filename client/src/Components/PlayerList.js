import React, { Component } from 'react'
import axios from 'axios'
import PlayerRegistration from './PlayerRegistration'
import Button from 'react-bootstrap/Button'
import './List.css'
import './Form.css'

export class PlayerList extends Component {
    constructor(props){
        super(props);
        this.state = {
            players: [],
            view: ''
        }
    }

    componentDidMount(){
        axios.get('/maadmin/api/playerList/' + this.props.league).then((res) => {
            console.log(res.data)
            this.setState({
                players: res.data.players
            })
        })
    }

    updateList(){
        axios.get('/maadmin/api/playerList/' + this.props.league).then((res) => {
            console.log(res.data)
            this.setState({
                players: res.data.players
            })
        })
    }

    chooseLeague(player){
        this.setState({
            view: player
        });
    }
    

    render() {
        if (this.state.players !== null){
            const players = this.state.players.map((player) =>
                        <div key={player}><Button variant="primary" onClick={() => this.chooseLeague(player)}>{player}</Button></div> 
                );
            var playerList = <div className='Container'><h2>Modify a player</h2><hr></hr> <div className='List'> {players}</div></div>
        }
        return (
            <div className = 'Panel'>
                <PlayerRegistration league={this.props.league} callBack={this.updateList.bind(this)} />
                {playerList}
            </div>
        ) 
    }
}

export default PlayerList
