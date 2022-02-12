import SettingModel from '../models/settingModel';

class AudioPlayer {
  constructor(url) {
    this._audio = new Audio(url);
    this._gameSettings = new SettingModel().getLocalStorage();
    this._audio.volume = this._gameSettings.sound.volumeLevel;
  }

  playAudio() {
    this._audio.play();
  }

  stopAudio() {
    this._audio.pause();
    this._audio.currentTime = 0;
  }

  setVolume(levelVolume) {
    this._audio.volume = levelVolume;
  }
}

export default AudioPlayer;
