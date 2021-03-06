import React from 'react';
import Login from '../Login/Login';

const Authenticate = App =>
    class extends React.Component{
        constructor(props){
            super(props);
            this.state ={
                user: '',
                loggedIn: false
            }
        }
        currentUser = e => {
            this.setState({user: e.target.value});
        }
        loginUser = () => {
            localStorage.setItem('username', this.state.user);
            window.location.reload();
        }
        componentDidMount(){
            const savedUserName=localStorage.getItem('username');
            if(savedUserName) {
                this.setState({loggedIn:true});
            } else {
                this.setState({loggedIn:false});
            }
        }        
        render(){
            if(this.state.loggedIn){
                return <App />
            }
            else {
                return <Login login={this.loginUser} username={this.currentUser}/>
            }
        }
    }

export default Authenticate;