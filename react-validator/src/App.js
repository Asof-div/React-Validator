import logo from './logo.svg';
import './App.css';
import Validator from './Validator';

function App() {
    const validator = new Validator({
        lastName: 'required|min:3',
        firstName: 'required|min:3',
        email: 'required|email',
        password: 'required|min:8|max:25',
        password_confirmation: 'required',
    });

    let validate = validator.validate('lastName', '');
    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className='App-link'
                    href='https://reactjs.org'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
