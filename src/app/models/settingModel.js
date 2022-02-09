class SettingModel {
  static _instance;

  constructor() {
    if (SettingModel._instance) {
      return SettingModel._instance;
    }
    this._settings = {
      sound: {
        onSound: false,
        volumeLevel: 0,
      },
      timer: {
        onTimer: false,
        time: 0,
      },
    };
    this._instance = this;
  }

  set settings({ isSound, soundLevel, isTimer, timeValue }) {
    this._settings = {
      sound: {
        onSound: isSound,
        volumeLevel: soundLevel,
      },
      timer: {
        onTimer: isTimer,
        time: timeValue,
      },
    };
    this._setLocalStorage();
  }

  get settings() {
    return this._settings;
  }

  _setLocalStorage() {
    const json = JSON.stringify(this.settings);
    localStorage.setItem('settingsQuiz', json);
  }

  _getLocalStorage() {
    return JSON.parse(localStorage.getItem('settingsQuiz'));
  }

  checkLocalStorage() {
    if (!localStorage.getItem('settingsQuiz')) {
      this._setLocalStorage();
    }
  }
}

export default SettingModel;
