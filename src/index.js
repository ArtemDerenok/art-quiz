import './styles/style.scss';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './app/app';
import ClickAudio from './app/components/audioPlayer/clickAudio';
import CorrectAnswerAuido from './app/components/audioPlayer/correctAnswerAudio';
import EndRoundAudio from './app/components/audioPlayer/endRoundAudio';
import WrongAnswerAudio from './app/components/audioPlayer/wrongAnswerAudio';

const app = new App();
new ClickAudio('click.wav');
new CorrectAnswerAuido('correct-answer.mp3');
new EndRoundAudio('end-round.mp3');
new WrongAnswerAudio('wrong-answer.mp3');
app.runApp();
