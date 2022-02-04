class ModalWindow {
  constructor() {
    this._container = document.createElement('div');
    this._modalDialog = document.createElement('div');
    this._modalContent = document.createElement('div');
    this._modalBody = document.createElement('div');
    this._modalFooter = document.createElement('div');
    this._container.classList.add('modal', 'fade');
    this._modalDialog.classList.add('modal-dialog', 'modal-lg');
    this._modalContent.classList.add('modal-content');
    this._modalBody.classList.add('modal-body');
    this._modalFooter.classList.add('modal-footer', 'justify-content-center');
  }

  render() {
    this._createMainContent();
    this._container.append(this._modalDialog);
    return this._container;
  }
}

export default ModalWindow;
