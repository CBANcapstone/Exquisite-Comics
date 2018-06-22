import React, { Component } from 'react';


let currentMousePosition = {
    x: 0,
    y: 0
};

let lastMousePosition = {
    x: 0,
    y: 0
};

export default class extends Component{
    constructor(){
        super();

        this.draw = this.draw.bind(this);
    }
    componentDidMount() {
        this.updateCanvas();
        this.setupCanvas();
    }

    setupCanvas() {
        // Set the size of the canvas and attach a listener
        // to handle resizing.
        let pos = this.pos;
        let draw = this.draw;

        window.addEventListener('mousedown', function (e) {
            console.log('in event 1', e, pos);
            currentMousePosition = pos(e)
        });

        window.addEventListener('mousemove', function (e) {
            if (!e.buttons) return;
            lastMousePosition = currentMousePosition
            currentMousePosition = pos(e)
            lastMousePosition && currentMousePosition &&
            draw(lastMousePosition, currentMousePosition, 'black', true);
        });
    }

    pos(e) {
        console.log('in pos', e)
        return [
            e.pageX - this.refs.canvas.offsetLeft,
            e.pageY - this.refs.canvas.offsetTop
        ]
    }

    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillStyle = "white";
        ctx.stroke();
        ctx.fillRect(0,0, 500, 500);
    }

    draw(start, end, strokeColor='black'){
        const ctx = this.refs.canvas.getContext('2d');
        ctx.beginPath();
        ctx.strokeStyle = strokeColor;
        ctx.moveTo(...start);
        ctx.lineTo(...end);
        ctx.closePath();
        ctx.stroke();
    }

    render(){

        return(
            <div id='canvasA'>
                <h1>In canvas A component</h1>
                <canvas ref="canvas"/>
            </div>
        )
    }
}