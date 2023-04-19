import React from 'react';
import './App.css';

const firstBank = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const secondBank = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

const Control = (props) => {
  return (
    <div className='control text-center'>
      <label className="form-check-label" htmlFor="flexSwitchCheckDefault1">Power {props.power ? 'ON' : 'OFF'}</label>
        <div className="form-switch">
          <input defaultChecked className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault1" onClick={props.controlPower}/>
        </div>
      <div className='action rounded text-center' id='display'>
        <p>{props.actionName}</p>
      </div>
      <div className='text-center'>
        <label htmlFor="customRange1" className="form-label">Volume: {Math.round(props.volume*100)}</label>
        <input min='0' max='1' step='0.01' type="range" className="form-range" id="customRange1" onChange={props.handleVolume}></input>
      </div>
      <label className="form-check-label" htmlFor="flexSwitchCheckDefault2">Bank</label> 
        <div className="form-switch">
          <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault2" onClick={props.changeBanks}/>
        </div>
      </div>
  );
};

const PadKey = (props) => {

  const handleKeydown = (e) => {
    if(e.keyCode === props.sound.keyCode)
    {
      props.play(props.sound.keyTrigger, props.sound.id);
    }
  }
 
  React.useEffect( () => {
    document.addEventListener('keydown', handleKeydown)
  })

  return (
        <button className='drum-pad border-0 rounded' id={props.sound.id} onClick={()=>props.play(props.sound.keyTrigger, props.sound.id)}>
          <audio className='clip' id={props.sound.keyTrigger} src={props.sound.url} />
          {props.sound.keyTrigger}
        </button>
      )
};

const Pad = (props) => {
return (
    <div className='pad'>
      {props.power 
      ? props.bank.map(sound => <PadKey key={sound.id} play={props.play} sound={sound} />)
      : props.bank.map(sound => <PadKey key={sound.id} play={props.play} sound={{...sound, url: '#'}} />)}
    </div>
)};

function App() {

  const [sounds,setSounds] = React.useState(firstBank);
  const [actionName, setActionName] = React.useState('Heater Kit');
  const [volume, setVolume] = React.useState(0.5);
  const [power, setPower] = React.useState(true);

  const controlPower = () => {
    setPower(!power);
  }

  const changeBanks = () => {
      if(sounds===firstBank)
      { 
        setSounds(secondBank);
        setActionName('Smooth Piano Kit');
      }
      else
      {
        setSounds(firstBank);
        setActionName('Heater Kit');
      }
    };

  const handleVolume = (e) => {
    setVolume(e.target.value);
  }

  const activStyle = (audio) => {
    audio.parentElement.style.backgroundColor = 'rgb(112, 165, 32)';
    audio.parentElement.style.transform = 'translateY(2px)';
  }

  const initialStyle = (audio) => {
    setTimeout( () => { 
    audio.parentElement.style.backgroundColor = 'rgb(255, 255, 255)';
    audio.parentElement.style.transform = 'translateY(-2px)';
  },200);
  }
   
  const playAudio = (keyTrigger, keyId) => {
    setActionName(keyId);
    const audio = document.getElementById(keyTrigger);
    activStyle(audio);
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play();
    initialStyle(audio);
  };

  return (
  
    <div id='drum-machine'>
      <h1 className='text-center pt-3'>Drum Machine</h1>
      <div className='panel rounded container-fluid' >
        <div className='row'>
          <div className='col-sm align-self-center '>
              <Pad play={playAudio} bank={sounds} power={power} />
          </div>
          <div className='col-sm align-self-center'>
            <Control 
              actionName={actionName} 
              changeBanks={changeBanks} 
              handleVolume={handleVolume} 
              volume={volume} 
              controlPower={controlPower}
              power={power}/>         
          </div>
        </div>   
      </div>   
    </div>
  
  );
};


export default App;
