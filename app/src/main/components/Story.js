import React from 'react';
import './Story.scss';
import { ScaleLoader} from 'react-spinners';
import WebView from 'react-electron-web-view';

class Story extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            url : props.url,
            display : 'none',
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            url : nextProps.url,
            display : 'none'
        });
        if(nextProps.url){
            setTimeout(() => {
                this.setState({
                    display : 'block'
                });
            }, 4000)
        }
    }

    render(){
        return (
            <div className="story col-md-8 col-lg-9 h-100">
                {
                    this.state.display === 'block' ?
                        <WebView
                            className="web-view"
                            src={this.state.url}
                            style={{
                                'height' : '100%',
                                'width' : '100%',
                                'display' : this.state.display
                            }}
                        /> :

                        <div className="spinner-icon">
                            <ScaleLoader
                                color={'#000'}
                                loading={true}
                            />
                        </div>
                }
            </div>
        )
    }
}

export default Story;
