import _ from 'lodash';

const loadingPlugin = (store) => {
    const NAMESPACE = 'loading';

    const vuexDispatch = store.dispatch;
    store.dispatch = function dispatch(...args) {
        const result = vuexDispatch.apply(this, args);
        const _this = this;
        result.catch((err) => {
            const [type, payload] = args;
            if (Object.keys(_this.state.loading.effects).includes(type)) {
                const action = { type, payload };
                try {
                    _this._actionSubscribers
                        .filter(function(sub) {
                            return sub.after;
                        })
                        .forEach(function(sub) {
                            return sub.after(action, _this.state);
                        });
                } catch (e) {
                    {
                        console.warn('[vuex] error in after action subscribers: ');
                        console.error(e);
                    }
                }
            }
        });
        return result;
    };

    if (store.state[NAMESPACE]) {
        return;
    }

    store.registerModule(NAMESPACE, {
        state: {
            global: false,
            models: {},
            effects: {},
        },
        mutations: {
            set(state, { payload }) {
                if (!payload || !payload instanceof Object) {
                    throw new Error('error arguments: mutations payload need a type Object');
                }
                Object.keys(payload).forEach((keys) => {
                    state[keys] = _.cloneDeep(payload[keys]);
                });
            },
        },
    });
    store.subscribeAction({
        before(action, state) {
            const namespace = action.type.split('/')[0];
            store.commit({
                type: 'set',
                payload: {
                    global: true,
                    models: {
                        ...state[NAMESPACE].models,
                        [namespace]: true,
                    },
                    effects: {
                        ...state[NAMESPACE].effects,
                        [action.type]: true,
                    },
                },
            });
        },
        after(action, state) {
            try {
                const namespace = action.type.split('/')[0];
                const loadingState = _.cloneDeep(state[NAMESPACE]);
                delete loadingState.effects[action.type];
                const effectsKeysArr = Object.keys(loadingState.effects);
                if (
                    !effectsKeysArr.length ||
                    effectsKeysArr.some((_) => String.prototype.split.call(_, '/')[0] !== namespace)
                ) {
                    delete loadingState.models[namespace];
                }
                const models = loadingState.models;
                loadingState.global = Object.keys(models).some((_) => !!models[_]) || false;
                store.commit({
                    type: 'set',
                    payload: loadingState,
                });
            } catch (err) {
                console.error(err);
            }
        },
    });
};

export default loadingPlugin;
