import React, {Component } from 'react';
import './SignIn.css';
import Particles from 'react-particles-js';

const particlesOptions = {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
            
        }
    }
}

class SignIn extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          signInEmail: '',
          SignInPassword: ''
      }
    }
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({SignInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.SignInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
          if(user.id){
            this.props.loadUser(user);
            this.props.onRouteChange('home');
          }
        })

    }

      render() {
        const { onRouteChange } = this.props;
    return (
        <div>
        <Particles
            className="particles" 
            params={particlesOptions}
            />
        <h1>Welcome to Anonymyzer!</h1>
        <h5>Use AI to blur faces on your photos. Sign in or register to continue.</h5>
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
		    <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address" 
                            onChange={this.onEmailChange}
                        />
                            
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password" 
                            onChange={this.onPasswordChange}
                            />
                    </div>
                    </fieldset>
                    <div className="">
                    <input 
                        onClick={this.onSubmitSignIn}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Sign in" 
                    />
                    </div>
                    <div className="lh-copy mt3">
                    <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                    </div>
                </div>
            </main>
        </article>
        </div>
    )
}
    }

export default SignIn;