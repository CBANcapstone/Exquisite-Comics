import React, {Component} from 'react';
import {Stage, Layer} from 'react-konva';
import SelectionBar from './SelectionBar';
import ResizeCanvasImage from './ResizeCanvasImage';
import CanvasBox from './CanvasBox';

export default class extends Component {
    constructor(){
        super();
        this.canvasBoxDisRatio = 3.3;
        this.canvasBoxPos = 60;
        this.state = {
            images: [],
            width: window.innerWidth,
            height: window.innerHeight / 2,
            canvasBoxPosX: [this.canvasBoxPos, this.canvasBoxPos + 20 + window.innerWidth / this.canvasBoxDisRatio, this.canvasBoxPos + 40 + window.innerWidth / this.canvasBoxDisRatio * 2]
        };
    }

    updateDimensions = () => {
        this.canvasBoxPos = window.innerWidth * 0.02;
        this.setState({
            width: (window.innerWidth),
            height: (window.innerHeight / 2),
            canvasBoxPosX: [this.canvasBoxPos, this.canvasBoxPos + 20 + window.innerWidth / this.canvasBoxDisRatio, this.canvasBoxPos + 40 + window.innerWidth / this.canvasBoxDisRatio * 2]
        })
    }
    componentDidMount = () => {
        window.addEventListener('resize', this.updateDimensions);
    }
    componentWillUnmount = () => {
        window.removeEventListener('resize', this.updateDimensions);
    }

    handleClick = event => {
        const image = new window.Image();
        image.src = event.target.src;
        image.onload = () => {
            this.setState({images: [...this.state.images, image]});
        };
    };

    render() {
        return (
            <div className='root-canvas'>
                <div className='root-canvas-selection-bar'>
                    <SelectionBar click={this.handleClick}/>
                </div>
                <div className="root-canvas-info">
                    <Stage width={window.innerWidth} height='700'>
                        <Layer>
                            {
                                this.state.canvasBoxPosX.map(pos => {
                                        return <CanvasBox x={pos} width={this.state.width} height={this.state.height}/>
                                    }
                                )
                            }
                            {this.state.images &&
                            this.state.images.map((img, i) => {
                                return <ResizeCanvasImage key={i} image={img}/>;
                            })}
                        </Layer>
                    </Stage>
                </div>
            </div>
        );
    }
}
