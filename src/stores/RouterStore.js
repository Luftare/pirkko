import { action, observable, computed } from 'mobx';

const pathMatchesRouteDefinition = (path, route) => {
  const pathArray = path.split('/');
  const routeArray = route.split('/');
  if (pathArray.length !== routeArray.length) return false;
  return pathArray.reduce((previousResult, segment, i) => {
    const isDynamicSegment = routeArray[i].startsWith(':');
    if (isDynamicSegment) {
      return previousResult;
    } else {
      if (routeArray[i] === pathArray[i]) {
        return previousResult;
      } else {
        return false;
      }
    }
  }, true);
};

const parseParameters = (path, route) => {
  const pathArray = path.split('/');
  return route.split('/').reduce((res, segment, i) => {
    if (segment.startsWith(':')) {
      const paramName = segment.slice(1);
      const value = pathArray[i];
      res[paramName] = isNaN(parseFloat(value)) ? value : parseFloat(value);
      return res;
    } else {
      return res;
    }
  }, {});
};

class RouterStore {
  constructor(routes) {
    window.addEventListener('hashchange', (e) => {
      this.path = window.location.hash.split('#').join('');
    });

    this.routes = routes;
  }

  @observable path = window.location.hash.split('#').join('');

  @observable routes = [];

  @computed
  get defaultRoute() {
    return this.routes.find((route) => route.path === '/');
  }

  @computed
  get currentRoute() {
    const routeObject = this.routes.reduce(
      (current, route) =>
        pathMatchesRouteDefinition(this.path, route.path) ? route : current,
      this.defaultRoute
    );
    const params = parseParameters(this.path, routeObject.path);
    if (routeObject.auth && !routeObject.auth(params, this.goTo)) {
      return this.defaultRoute;
    }
    return routeObject;
  }

  @computed
  get params() {
    return parseParameters(this.path, this.currentRoute.path);
  }

  @action
  goTo = (path) => {
    window.location.hash = path;
  };
}

export default RouterStore;
