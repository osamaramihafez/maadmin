import React, { Component } from 'react'
import axios from 'axios'

export class league extends Component {
    
    constructor(){
        this.state = {
            league: null
        }
    }
    
    render() {

        axios.get('maadmin/api/league').then((res) => {
            this.setState({
                league: res.data.league
            })
        })

        return (
            <div>
                
            </div>
        )
    
        constructor(){
            this.state = {

            }
        }
    
    }
}

export default league
