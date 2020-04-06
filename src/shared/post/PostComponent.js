import React from 'react';
import EditorComponent from "./editor/EditorComponent";
import StartPostComponent from "./start-post/StartPostComponent";

export default class PostComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            startPostClicked: false,
        }
    }

    changePostState = () => {
        const { startPostClicked } = this.state;
        this.setState({
            startPostClicked: !startPostClicked,
        });
    };

    render() {
        const { startPostClicked } = this.state;

        return(
            <div>
                {startPostClicked && <EditorComponent stopPost={this.changePostState}/>}
                {!startPostClicked && <StartPostComponent startPost={this.changePostState} />}
            </div>
        )
    }
}
