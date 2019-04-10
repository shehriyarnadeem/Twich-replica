import  React from 'react';
import {signIn, signOut} from '../actions';
import {connect} from 'react-redux';

class GoogleAuth extends React.Component{

    
    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
             clientId:'308134536332-o6hki1o9baiqf1cpf5u74ocbe7dv89jd.apps.googleusercontent.com',
             scope:'email',
             
            }).then(()=>{
               this.auth = window.gapi.auth2.getAuthInstance();
               console.log(this.auth.isSignedIn.get());
               this.onAuthChange(this.auth.isSignedIn.get());
               this.auth.isSignedIn.listen(this.onAuthChange);
               
              
            });
        });
    }

    onAuthChange = (isSignedIn)=>{
    if(isSignedIn){
        this.props.signIn();
    }else{
        this.props.signOut();
    }
    };

    onSignIn=()=>{
      this.auth.signIn()
    }
    onSignOut=()=>{
     
        this.auth.signOut()
    }
    
    renderAuthButton(){
        if(this.props.isSignedIn===null){
            return null
        }
        else if(this.props.isSignedIn){
           return (
           <button onClick={this.onSignOut} className="ui red google button">
                  <i className="google icon" />
                  Sign Out
                  </button>
                  )
        }else{
            return (
                <button onClick={this.onSignIn} className="ui red google button">
                       <i className="google icon" />
                       Sign In with Google
                       </button>
                       )
        }
    }

    render(){
       
        return <div>{this.renderAuthButton()}</div>
    }
}
const mapStateToProps=(state)=>{
        return {isSignedIn:state.auth.isSignedIn}
}
export default connect(
    mapStateToProps,
    {signIn, signOut}
)(GoogleAuth);