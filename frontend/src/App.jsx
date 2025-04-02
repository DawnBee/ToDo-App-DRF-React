import './App.css'
import ListTasks from './components/ListTasks';
import Logo from './assets/imgs/meddicc-logo.png'

function App() {

  return (
    <>
      <div className='logo-box'>
        <img src={Logo} alt="logo" />
        <h1>MEDDICC</h1>
      </div>
      <ListTasks />
    </>
  )
}

export default App;