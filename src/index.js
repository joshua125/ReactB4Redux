//create a new component, this componenet should produce some html
import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from "./components/video_list";
import VideDetail from "./components/video_detail";
import VideoDetail from './components/video_detail';


const API_KEY = "AIzaSyBtmpwP2HcIERZi9QERuubvXnRjJ707NWI";
//our top level component
 /**
  * Downward Data-flow - top level component should be repsonsible for fetching data
  */

class App extends Component{

    constructor(props){
        super(props);

        //list of videos grabbed by our YTSearch()
        this.state = { videos: [], 
        selectedVideo: null }; //default video for videoDetail
        //YTSearch queries Youtube for our search term, and we call setState to update our videos property
        this.videoSearch('neotokyo ost');
    }
    videoSearch(term){
        YTSearch({key: API_KEY, term: term }, (videos) =>{
            this.setState({videos: videos, 
                           selectedVideo: videos[0] //initialize our default video for videoDetail
                        });
            console.log(videos);
        });
    }

   render(){
    //pass in videoSearch to a debounce method that throttles i every 300ms..so that we
    //dont continually trigger our searches on every searchbar input event
    const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 300)

    return (
    <div>  
        <SearchBar onSearchTermChange={videoSearch}/> 
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList onVideoSelect={selectedVideo=>this.setState({selectedVideo})}
                   videos={this.state.videos} />
    </div>
    );
    }
}

//insert component's generated HTML into the DOM
ReactDOM.render(<App />, document.querySelector('.container'));
