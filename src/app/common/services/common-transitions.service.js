export class CommonTransitionsService {
  constructor($transitions) {
    this._transitions = $transitions;
  }

  _blockLoader = true;

  returnLoaderState() {
    return this._blockLoader;
  }

  setTransitionsHooks() {
    this._transitions.onBefore({}, () => {
      this._blockLoader = false;
    });
    this._transitions.onSuccess({}, () => {
      this._blockLoader = true;
    });
    this._transitions.onError({}, () => {
      this._blockLoader = true;
    });
  }
}