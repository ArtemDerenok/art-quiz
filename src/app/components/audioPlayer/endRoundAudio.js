import AudioPlayer from '../../templates/audioPlayer';

class EndRoundAudio extends AudioPlayer {
  static _instance;

  constructor(url) {
    if (EndRoundAudio._instance) {
      return EndRoundAudio._instance;
    }

    super(url);
    EndRoundAudio._instance = this;
  }
}

export default EndRoundAudio;
