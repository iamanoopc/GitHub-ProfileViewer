import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/Profile.jsx';
import Search from './github/Search.jsx';
export default class App extends Component{
  constructor(props){
    super(props);
    this.state ={
      username: 'iamanoopc',
      userData: [],
      userRepos: [],
      perPage: 10
    }

  }
  handleFormSubmit(username){
    this.setState({username: username}, function () {
      this.getUserData();
      this.getUserRepos();
    });
  }
  //Get UserData from Github
  getUserData(){
    $.ajax({
      url: 'https://api.github.com/users/'+this.state.username+'?client_id='+this.props.clientId+'&client_secret='+this.props.client_secret,
      dataType: 'json',
      cache: false,
      success:function(data) {
        this.setState({userData: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({username: null});
        alert(err);
      }.bind(this)
    });
  }
  //Get User Repos from Github
  getUserRepos(){
    $.ajax({
      url: 'https://api.github.com/users/'+this.state.username+'/repos?per_page='+this.state.perPage+'&client_id='+this.props.clientId+'&client_secret='+this.props.client_secret+'&sort=created',
      dataType: 'json',
      cache: false,
      success:function(data) {
        this.setState({userRepos: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({username: null});
        alert(err);
      }.bind(this)
    });
  }
  componentDidMount(){
    this.getUserData();
    this.getUserRepos();
  }
  render(){
    return(
      <div>
        <Search onFormSubmit={this.handleFormSubmit.bind(this)}/>
       <Profile {...this.state} />
      </div>
    );
  }
}

App.propTypes = {
  clientId: React.PropTypes.string,
  clientSecret: React.PropTypes.string
};
App.defaultProps = {
  clientId: '21eaadc085edbecf6fea',
  clientSecret: 'a8fc1fe3e546617fb00970c0f5b47a43ce064098'
}
