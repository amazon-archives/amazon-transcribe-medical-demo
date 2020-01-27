import React, { Component } from "react";
import { Button } from "react-bootstrap";
// import { HashLink as Link } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";

export default class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div className="navbar_background navbar_border_style mb-3 fixed-top">
                <header className="d-flex align-items-center">
                    <div className="logobox m-3">
                        <Link to="/">
                            <img
                                src={require("./AWS_logo_RGB.png")}
                                alt="logo"
                                class="rounded float-left"
                                style={{ height: '40px' }}
                            />
                        </Link>
                    </div>
                    <div class="m-3">
                        <h1>Amazon Transcribe Medical</h1>
                    </div>
                </header>
            </div>
        );
    }
}
