class Page {
  constructor(idPage) {
    this._container = document.createElement('div');
    this._container.classList.add('container');
    this._container.classList.add('d-flex');
    this._container.classList.add('flex-column');
    this._container.id = idPage;
    this._header = document.createElement('div');
    this._logo = document.createElement('img');
    this._main = document.createElement('div');
  }

  _createHeader() {
    this._header.classList.add('text-center');
    this._header.classList.add('pt-5');
    this._logo.classList.add('rounded');
    this._logo.src = 'logo.png';
    this._header.append(this._logo);
    return this._header;
  }
}

export default Page;
