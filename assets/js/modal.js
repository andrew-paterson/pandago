function insertModal(initialMarkup, callback, opts) {
  const modalEl = document.createElement('section');
  modalEl.classList.add('modal');
  modalEl.classList.add('page-gutters');
  const closeButton = opts.showCloseButton ? `<button class="close-modal no-styles" data-close-modal>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.3 34.3" class="single-colour cross"><path class="st0" d="M21.4 17.1l12-12c1.2-1.2 1.2-3.1 0-4.2 -1.2-1.2-3.1-1.2-4.2 0l-12 12 -12-12C4-0.3 2-0.3 0.9 0.9c-1.2 1.2-1.2 3.1 0 4.2l12 12 -12 12c-1.2 1.2-1.2 3.1 0 4.2C1.5 34 2.2 34.3 3 34.3s1.5-0.3 2.1-0.9l12-12 12 12c0.6 0.6 1.4 0.9 2.1 0.9s1.5-0.3 2.1-0.9c1.2-1.2 1.2-3.1 0-4.2L21.4 17.1z"></path></svg>
  </button>` : '';
  modalEl.innerHTML = `${closeButton}<div class="modal-content"></div>`
  const modalContent = modalEl.querySelector('.modal-content');
  if (initialMarkup) {
    modalContent.innerHTML = initialMarkup;
  }
  const body = document.querySelector('body');
  body.append(modalEl);
  window.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
      modalEl.remove();
    }
  })
  const closeModalButton = modalEl.querySelector('[data-close-modal]');
  if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
      modalEl.remove();
    })
  }
  if (callback) {
    callback(modalEl);
  }
}