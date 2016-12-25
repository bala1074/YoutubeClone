import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import SearchBar from './components/search_bar';
import VideoDetails from './components/video_details';
import VideoList from './components/video_list';
import YTApiSearch from 'youtube-api-search';

const API_KEY = "AIzaSyARuoQevigT10WAku731EdeapLSrhXM9Mk";

//Create component
class App extends Component{
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('surfboards');
    }
    videoSearch(term) {
        YTApiSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }
    render(){
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
        return (
            <div>
                <SearchBar  onSearchTermChange={videoSearch}/>
                <VideoDetails video={this.state.selectedVideo}/>
                <VideoList videos={this.state.videos} onVideoSelect={selectedVideo => this.setState({selectedVideo}) }/>
            </div>
                );
    }
}
//Render component
ReactDOM.render(<App/>,document.getElementById("app"));