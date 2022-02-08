import ModalWindow from '../templates/modalWindow';

class FinishGameModalWindow extends ModalWindow {
  constructor(result) {
    super();
    this._resultGame = result;
  }

  _createMainContent() {}
}

export default FinishGameModalWindow;
