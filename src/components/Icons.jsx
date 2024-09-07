import { useState, useRef } from "react";
import iconsData from "../data/iconsData";
import VolumeSlider from "./VolumeSlider";

const Icons = () => {
    const [playingId, setPlayingId] = useState(null);
    const [volume, setVolume] = useState({});
    const [toggleSlider, setToggleSlider] = useState(null);
    const audioRefs = useRef({});

    const handleClick = (iconId, audioSrc) => {
        if (audioRefs.current[iconId]) {
            console.log('Stop and remove audio for icon:', iconId);
            audioRefs.current[iconId].pause();
            audioRefs.current[iconId].currentTime = 0;
            delete audioRefs.current[iconId];

            if (playingId === iconId) {
                setPlayingId(null);
                setToggleSlider(null);
                return;
            }
        }
    
        console.log('Start audio for icon:', iconId);
        const audio = new Audio(audioSrc);
        audio.volume = volume[iconId] || 0.5;
        audioRefs.current[iconId] = audio;
        audio.play();
    
        setPlayingId(iconId);
        setToggleSlider(iconId);

        playAllAudio();
    };
    
    const playAllAudio = () => {
        Object.values(audioRefs.current).forEach(audio => {
            if (audio && audio.paused) {
                audio.play();
            }
        });
    };
    
    const handleVolumeChange = (iconId) => (e) => {
        const newVolume = e.target.value;
        setVolume((prevVolume) => ({ ...prevVolume, [iconId]: newVolume }));

        if (audioRefs.current[iconId]) {
        audioRefs.current[iconId].volume = newVolume;
        }
    };

    return (
        <div className="iconContainer">
            {iconsData.map((icon) => (
                <div key={icon.id} className="iconWrapper">
                    <div
                        className="iconLogo"
                        style={{ backgroundImage: `url(${icon.img})` }}
                        onClick={() => handleClick(icon.id, icon.audio)}
                    />
                    {toggleSlider === icon.id && (
                    <VolumeSlider
                        volume={volume[icon.id] || 0.5}
                        onVolumeChange={handleVolumeChange(icon.id)}
                    />
                )}
                </div>
            ))}
        </div>
    );
};

export default Icons;
