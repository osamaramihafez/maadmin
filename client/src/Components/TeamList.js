import React, { Component } from 'react'
import axios from 'axios'
import TeamRegistration from './TeamRegistration'

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
        return (
            <div>
                <TeamRegistration />
            </div>
        )
    }
}

export default Teams
