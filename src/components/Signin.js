import React from 'react';
import axios from 'axios';
import logo from '../image/logo.png';
import botao from '../image/botao.png';

function Signin ({setToken, setName, setRoom, name, room}) {


async function handleSubmit(event) {
    event.preventDefault();
    const result = await axios.post('Coloque seu Token(url)',
    {
    identity: name,
    room,
    }
    );
    setToken(result.data);
    console.log('Got the token with the value :', result.data)
}

    return(
        <>
        <nav className="navbar navbar-dark" style={{backgroundColor: '#FA8072'}} >
        <img src={logo} width="150px" height="45px"/>
        </nav>
        

        <form className="form-signin  " onSubmit={handleSubmit}>
            <div className="text-center mb-4 mt-4">
               
                <h1 className="h3 mb-3 font-weight-normal">Video Chamada!</h1>
                
            </div>

            <div className="form-label-group">
            <label htmlFor="name" >
                Name
             <input type="text" id="name"  className="form-control" value={name} onChange = {e => setName(e.target.value) } />   
            </label>

            </div>

           

            <div>
                 <button className="btn btn-lg btn-secondary " style={{backgroundColor: '#FA8072', borderRadius: '20px', marginTop: '5px' }} type="submit"><img src={botao} width="50px" height="50px"/></button>
            </div>
        </form>

        </>
    )
}
export default Signin;
