import { ActionReducer } from '@ngrx/store';

export function loggerMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if (typeof window !== 'undefined') {
      console.groupCollapsed(`[NgRx Action] ${action.type}`);
      console.log('Previous State:', state);
      console.log('Action Payload:', action);
    }

    const nextState = reducer(state, action);

    if (typeof window !== 'undefined') {
      console.log('Next State:', nextState);
      console.groupEnd();
    }

    return nextState;
  };
}
