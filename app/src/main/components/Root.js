import React from 'react';
import './Root.scss';
import Sidebar from './Sidebar';
import Story from './Story';
import API from './consts';
import axios from 'axios';

class Root extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            all_stories : [],
            loaded : [],
            active_story : ''
        }
    }

    componentDidMount(){
        this.getStories();
    }

    getStories(){
        axios.get(API.GET_STORIES)
            .then(function (res) {
                this.setState({
                    all_stories : res.data
                }, () => {
                    this.loadStories(this.state.loaded.length, this.state.loaded.length + 20)
                });
            }.bind(this))
            .catch(function (err) {
                console.log(err);
            });
    }

    loadStories(startIndex, endIndex){
        const load_stories = this.state.all_stories.slice(startIndex, endIndex);

        const url_promises = load_stories.map(story => {
            return axios.get(API.STORY + story + '.json?print=pretty')
        });

        axios.all(url_promises).then(function(results) {
            const clean_results = results.filter(r => {
                r.data.active = false;
                return r.data.url;
            });
            this.setState({
                loaded: this.state.loaded.concat(clean_results.map(r => {
                    return r.data;
                }))
            }, () => {
                if(!startIndex){
                    this.updateStory(this.state.loaded[0].id)
                }
            });
        }.bind(this));
    }

    loadMoreStories(){
        this.loadStories(this.state.loaded.length, this.state.loaded.length + 20)
    }

    updateStory(id){
        this.state.loaded.filter(story => {
            if(story.id === id){
                this.setState({
                    active_story: story.url
                });
            }
        });

        this.state.loaded.map(function(story){
            const index = this.state.loaded.indexOf(story);
            const clone_loaded = [...this.state.loaded];
            clone_loaded[index].active = story.active ? story.id === id : !story.active ? story.id === id : true;
            this.setState({
                loaded : clone_loaded
            });
        }.bind(this));
    }

    render(){
        return(
            <div className="container-fluid h-100">
                <div className="row h-100">
                    <Sidebar
                        stories={this.state.loaded}
                        loadMoreStories={this.loadMoreStories.bind(this)}
                        loadStory={this.updateStory.bind(this)}
                    />
                    <Story
                        url={this.state.active_story}
                    />
                </div>
            </div>
        )
    }
}

export default Root;
