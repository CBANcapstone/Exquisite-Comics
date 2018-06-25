import React, { Component } from 'react';
import { render } from 'react-dom';
import { Strip, Panel, Character, Balloon } from 'react-komik';

export default class extends Component{
    render(){
        const title = this.props.title || 'Chapter Main';
        return(
            <div id='komik'>
                <h1>In Komik Canvas Component</h1>
                <Strip title={title} column='2' upperCase={true}>
                    <Panel>
                        <Character
                            image="https://cdn0.iconfinder.com/data/icons/flowers-3/450/lilly-128.png"
                        >

                        </Character>
                    </Panel>
                    <Panel>

                    </Panel>
                    <Panel>

                    </Panel>

                </Strip>
            </div>
        )
    }
}