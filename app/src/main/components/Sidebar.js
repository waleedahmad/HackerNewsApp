import React from 'react';
import './Sidebar.scss';

class Sidebar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            stories : this.props.stories
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            stories : nextProps.stories
        });
    }

    onClickHandler(id, e){
        this.props.loadStory(id);
    }

    render(){
        return (
            <div className="sidebar col-md-4 col-lg-3">
                {
                    this.state.stories ? this.state.stories.map(function(story){
                        return (
                            <div className={"link " + (story.active ? 'active' : '')}
                                key={story.id}
                                 onClick={this.onClickHandler.bind(this, story.id)}
                            >{story.title}</div>
                        )
                    }.bind(this)) :
                        'Loading stories'
                }
                <a className="load-more" onClick={this.props.loadMoreStories.bind(this)}>
                    Load More Stories
                </a>
            </div>
        )
    }
}

export default Sidebar;
