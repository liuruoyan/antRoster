import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { addRule, queryRule, removeRule, updateRule } from './service';

import { TableListDate } from './data.d';
import { QueryEnumIdTypes } from '../add/service';

interface RosterTableListDate extends TableListDate{
  types: number[],
  statuses: number[],
}

export interface StateType {
  data: RosterTableListDate;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
  
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    add: Effect;
    remove: Effect;
    update: Effect;
    fetchDictionaryEntry: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'rosterTableList',

  state: {
    data: {
      list: [],
      pagination: {
        pageSize: 10,
        current: 1
      },
      types:[],
      statuses:[],
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      // console.log('fetch payload');
      // console.log(payload);
      const response = yield call(queryRule, payload);

      console.log('fetch response');
      console.log(response)

      yield put({
        type: 'save',
        payload: response,
      });

    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *fetchDictionaryEntry({ payload }, { call, put }) {
      const response = yield call(QueryEnumIdTypes, payload);
      console.log(response);
      const key = payload.key;

      const payloadData = {};
      payloadData[key] = response.data;

      console.log('fetchDictionaryEntry.put');
      console.log(payloadData);

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
      // let pageData = action.payload;

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
