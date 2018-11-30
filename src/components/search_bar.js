import React , {Component} from 'react';

//give searchbar our React component and dom functionality
class SearchBar extends Component{

    constructor(props){
        super(props);

        this.state = {term: ''};
    }

    render() {
        //ES6 prevents us from having to define a seperate method and pass it into our onchange. 
        // we grab and handle the event in a single line
    return (
    <div className="search-bar">
        <input 
            value={this.state.term}
            onChange={event=> this.onInputChange(event.target.value)} />
    </div>
      );
    }

    onInputChange(term){
        this.setState({term})
        this.props.onSearchTermChange(term);
    }

}


export default SearchBar;