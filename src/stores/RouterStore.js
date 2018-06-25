import { action, observable } from 'mobx';

class RouterStore {
  constructor() {
    window.addEventListener('hashchange', (e) => {
      this.view = window.location.hash;
    });
  }

  @observable view = window.location.hash;

  @action
  goTo = (view) => {
    window.location.hash = view;
  };
}

export default new RouterStore();
