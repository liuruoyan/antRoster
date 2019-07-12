import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { SubmitForm } from './service';
import router from 'umi/router';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: {};
  effects: {
    submitAdvancedForm: Effect;
  };
}

const Model: ModelType = {
  namespace: 'formAdvancedForm',

  state: {},

  effects: {
    *submitAdvancedForm({ payload }, { call }) {
      const response = yield call(SubmitForm, payload);
      console.log(response);
      router.push('/roster/list');
    },
  },
};

export default Model;
