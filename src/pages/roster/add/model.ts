import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { SubmitForm, QueryEnumIdTypes } from './service';
import router from 'umi/router';
import { message } from 'antd';

export interface StateType {
  data: EnumListDate;
}

export interface EnumListDate{
  idTypes:[],
  contractTypes:[],
  types:[],
  genders:[],
  accountTypes:[],
  highestEducations:[],
  politicsStatuses:[],
  maritalStatuses:[],
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submitAdvancedForm: Effect;
    fetchDictionaryEntry: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'rosterAdvancedForm',

  state: {
    data:{
      idTypes:[],
      contractTypes:[],
      types:[],
      genders:[],
      accountTypes:[],
      highestEducations:[],
      politicsStatuses:[],
      maritalStatuses:[],
    }
  },

  effects: {
    *submitAdvancedForm({ payload }, { call }) {
      const response = yield call(SubmitForm, payload);
      console.log(response);
      if(response.response.status >= 200 && response.response.status < 300){
        message.success("添加成功",()=>{router.push('/roster/list')});
      }
    },

    *fetchDictionaryEntry({ payload }, { call, put }) {
      const response = yield call(QueryEnumIdTypes, payload);
      console.log(response);
      const key = payload.key;

      const payloadData = {};
      payloadData[key] = response.data;
      yield put({
        type: 'save',
        payload: payloadData
      });
    },
  },

  reducers: {
    save(state, action) {
      // action.payload = {list: [], pagination:{}}
      console.log('save.state');
      console.log(state);
      console.log('save.action');
      console.log(action);

      let resData = {...state.data, ...action.payload}

      let res = {
        ...state,
        data: resData,
      };

      console.log('return')
      console.log(res);
      return res;
    },
  },
};

export default Model;
