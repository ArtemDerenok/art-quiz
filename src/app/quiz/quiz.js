import getRandomNum from '../../utils/getRandomNum';
import getQuestions from '../api/api';
import Question from './question';

class Quiz {
  constructor(categoryName) {
    this._questions = [];
    this._categoryName = categoryName;
    this._main = document.createElement('div');
    this._body = document.body;
    this._header = document.createElement('div');
  }

  _rednerHeader() {
    this._header.classList.add('container');
    this._header.innerHTML = `<div class="row"><img src="logo.png" class="col quiz-logo"></img><h3 class="col">Who is the author of this picture?</h3><div class="col"><img src="timer-picture.png" class="quiz-timer-logo"></img></div></div>`;
    return this._header;
  }

  _renderQuestion() {
    this._main.classList.add('container');
    this._main.append(
      new Question(
        this._questions[0].imageNum,
        this._questions[0].author,
        this._questions[0].name,
        this._questions[0].year
      ).render()
    );
    this._body.append(this._rednerHeader());
    this._body.append(this._main);
  }

  async _getQuestions() {
    const questions = await getQuestions();
    for (let i = 0; i < 10; i += 1) {
      const randomNumber = getRandomNum(0, questions.length - 1);
      this._questions.push(questions[randomNumber]);
    }
    this._renderQuestion();
  }

  runQuiz() {
    this._getQuestions();
  }
}

export default Quiz;
