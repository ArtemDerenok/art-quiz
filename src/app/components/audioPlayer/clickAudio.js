import AudioPlayer from '../../templates/audioPlayer';

class ClickAudio extends AudioPlayer {
  static _instance;

  constructor(url) {
    if (ClickAudio._instance) {
      return ClickAudio._instance;
    }
    super(url);
    ClickAudio._instance = this;
  }
}

export default ClickAudio;
