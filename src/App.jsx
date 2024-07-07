import { useState, useEffect, useRef } from 'react';
import './App.css';

// This is the only way I was able to render the logo
import birdLogo from './assets/bird.svg';
import fireplaceLogo from './fireplace.svg';
import coffeeShopLogo from './coffee-shop.svg';
import windLogo from './wind.svg';
import rainLogo from './rain.svg';
import stormLogo from './storm.svg';

// This is the only way I was able to play the mp3 file
import birdsMP3 from './birds.mp3';
import firePlaceMP3 from './fireplace.mp3';
import coffeeShopMP3 from './coffeeshop.mp3';
import windMP3 from './wind.mp3';
import rainMP3 from './rain.mp3';
import stormMP3 from './storm.mp3';

function App() {
  const ambientSounds = [
    { id: 'bird', background: birdLogo, soundEffect: birdsMP3 },
    { id: 'fire', background: fireplaceLogo, soundEffect: firePlaceMP3 },
    { id: 'coffee', background: coffeeShopLogo, soundEffect: coffeeShopMP3 },
    { id: 'wind', background: windLogo, soundEffect: windMP3 },
    { id: 'rain', background: rainLogo, soundEffect: rainMP3 },
    { id: 'storm', background: stormLogo, soundEffect: stormMP3 },
  ];

  const [playingSounds, setPlayingSounds] = useState({
    bird: false,
    fire: false,
    coffee: false,
    wind: false,
    rain: false,
    storm: false,
  });

  const audioRefs = useRef({});

  const buttonHandler = soundId => {
    setPlayingSounds(prev => ({
      ...prev,
      [soundId]: !prev[soundId],
    }));
  };

  const volumeHandler = (event, soundId) => {
    const sliderValue = event.target.value / 100;
    const audio = audioRefs.current[soundId];

    if (audio) {
      audio.volume = sliderValue;
    }
  };

  ambientSounds.forEach(sound => {
    useEffect(() => {
      const audio = new Audio(sound.soundEffect);
      audioRefs.current[sound.id] = audio;
      const soundIcon = document.querySelector(
        `.sound-icon[data-sound-id='${sound.id}']`
      );
      const volumeSlider = document.querySelector(
        `.volumeSliderBar[ data-volume-id='${sound.id}']`
      );

      if (playingSounds[sound.id]) {
        audio.play();
        audio.loop = true;
        soundIcon.style.filter =
          'invert(100%) sepia(0) saturate(1%) hue-rotate(87deg) brightness(105%) contrast(100%)'; //change for css class
        volumeSlider.style.display = 'block';
      } else {
        audio.pause();
        delete audioRefs.current[sound.id];
        soundIcon.style.filter =
          'invert(100%) sepia(0) saturate(1%) hue-rotate(87deg) brightness(105%) contrast(0)';
        volumeSlider.style.display = 'none';
      }

      return () => audio.pause();
    }, [playingSounds[sound.id]]);
  });

  return (
    <div className="sound-container">
      {ambientSounds.map(sound => (
        <div className="sound-item" key={sound.id}>
          <div
            className="sound-icon"
            data-sound-id={sound.id}
            style={{ backgroundImage: `url(${sound.background})` }}
            onClick={() => buttonHandler(sound.id)}
          ></div>
          <div className="volumeSliderBar" data-volume-id={sound.id}>
            <input
              type="range"
              min="0"
              max="100"
              className="slider"
              data-slider-id={sound.id}
              onChange={e => volumeHandler(e, sound.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
