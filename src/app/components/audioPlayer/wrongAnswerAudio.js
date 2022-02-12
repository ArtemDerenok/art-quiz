import AudioPlayer from '../../templates/audioPlayer';

class WrongAnswerAudio extends AudioPlayer {
  static _instance;

  constructor(url) {
    if (WrongAnswerAudio._instance) {
      return WrongAnswerAudio._instance;
    }

    super(url);
    WrongAnswerAudio._instance = this;
  }
}

export default WrongAnswerAudio;
