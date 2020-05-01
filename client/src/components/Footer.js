import React, { Component } from 'react'
import '../css/Footer.module.css'

export class Footer extends Component {
    render() {
        return (
            <footer className="bg-dark">
                <div className="row justify-content-center">
                    <span className="text-muted text-md-left col-6">{this.props.messageLeft}</span>
                    <span className="text-muted text-md-right col-6">{this.props.messageRight}</span>
                </div>
            </footer>
        )
    }
}

export default Footer
