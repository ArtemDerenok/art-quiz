import AudioPlayer from '../../templates/audioPlayer';

class CorrectAnswerAuido extends AudioPlayer {
  static _instance;

  constructor(url) {
    if (CorrectAnswerAuido._instance) {
      return CorrectAnswerAuido._instance;
    }

    super(url);
    CorrectAnswerAuido._instance = this;
  }
}

export default CorrectAnswerAuido;
