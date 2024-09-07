import React from 'react';

const VolumeSlider = ({ volume, onVolumeChange }) => {
  return (
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={volume}
      onChange={onVolumeChange}
      className="volumeSlider"
    />
  );
};

export default VolumeSlider;