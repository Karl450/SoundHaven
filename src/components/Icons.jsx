import { useState, useRef } from "react";
import VolumeSlider from "./VolumeSlider";

const Icons = ({ icon }) => {
    const [playingId, setPlayingId] = useState(null);
    const [sliderVisibility, setSliderVisibility] = useState(false);
    const audioRef = useRef(null);
    const [localVolume, setLocalVolume] = useState(0.5);

    const handleClick = (iconId, audioSrc) => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current = null;
            setSliderVisibility(false);

            if (playingId === iconId) {
                setPlayingId(null);
                return;
            }
        }

        const audio = new Audio(audioSrc);
        audio.volume = localVolume;
        audioRef.current = audio;
        audio.play();

        setPlayingId(iconId);
        setSliderVisibility(true);
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setLocalVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    return (
        <div className="iconWrapper">
            <div
                className="iconLogo"
                style={{ backgroundImage: `url(${icon.img})` }}
                onClick={() => handleClick(icon.id, icon.audio)}
            />
            {sliderVisibility && (
                <VolumeSlider
                    volume={localVolume}
                    onVolumeChange={handleVolumeChange}
                />
            )}
        </div>
    );
};

export default Icons;
