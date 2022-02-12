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
    SettingModel._instance = this;
  }

  set settings([isSound = false, soundLevel = 0, isTimer = false, timeValue = 1]) {
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

  get soundModeValue() {
    return this._settings.sound.onSound;
  }

  _setLocalStorage() {
    const json = JSON.stringify(this._settings);
    localStorage.setItem('settingsQuiz', json);
  }

  getLocalStorage() {
    return JSON.parse(localStorage.getItem('settingsQuiz'));
  }

  checkLocalStorage() {
    if (!localStorage.getItem('settingsQuiz')) {
      this._setLocalStorage();
    } else {
      this._settings = this.getLocalStorage();
    }
  }
}

export default SettingModel;
