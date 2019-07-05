import { queryEmps } from "./service";
import React from 'react';
import {Divider} from 'antd';

export default {
  namespace: 'conntest',
  state: {
    data: [
      {
        "id" : 1,
        "code" : "mobile Fish",
        "name" : "Home Loan Account Table Computer",
        "idNumber" : "Trace",
        "phone" : "1-617-600-9789",
        "hireDate" : "2019-06-30",
        "jobGrade" : "Chips",
        "position" : "Money Market Account",
        "job" : "Albania web-readiness",
        "empNo" : "Namibia",
        "seniority" : 39986,
        "contractors" : "Gorgeous Frozen Pants",
        "workLoc" : "Common",
        "contactAddr" : "Savings Account syndicate Planner",
        "nationality" : "Refined Rubber Chicken Table",
        "firstName" : "Aniyah",
        "lastName" : "Ankunding",
        "others" : "Usability South Dakota envisioneer",
        "isSelfVerify" : false,
        "isHrVerify" : false,
        "statusId" : null,
        "idTypeId" : null,
        "contractTypeId" : null,
        "empTypeId" : null,
        "genderId" : null,
        "birthTypeId" : null
      }, {
        "id" : 2,
        "code" : "Nakfa",
        "name" : "Bahamian Dollar Investment Account",
        "idNumber" : "Games Regional Digitized",
        "phone" : "(734) 525-5109 x8749",
        "hireDate" : "2019-06-30",
        "jobGrade" : "Communications capacitor archive",
        "position" : "sky blue Tasty Plastic Pizza",
        "job" : "compress South Georgia and the South Sandwich Islands",
        "empNo" : "compelling mission-critical",
        "seniority" : 54269,
        "contractors" : "Plastic",
        "workLoc" : "Car Industrial deliverables",
        "contactAddr" : "orange Books",
        "nationality" : "magenta monitor 1080p",
        "firstName" : "Lempi",
        "lastName" : "Blanda",
        "others" : "world-class Frozen IB",
        "isSelfVerify" : true,
        "isHrVerify" : false,
        "statusId" : null,
        "idTypeId" : null,
        "contractTypeId" : null,
        "empTypeId" : null,
        "genderId" : null,
        "birthTypeId" : null
      }, {
        "id" : 3,
        "code" : "Ergonomic",
        "name" : "moratorium moratorium",
        "idNumber" : "New York tangible Mississippi",
        "phone" : "197.877.5272",
        "hireDate" : "2019-06-30",
        "jobGrade" : "Poland",
        "position" : "Small partnerships",
        "job" : "Outdoors",
        "empNo" : "Harbor Montana",
        "seniority" : 69551,
        "contractors" : "Concrete Investment Account Saint Lucia",
        "workLoc" : "User-centric",
        "contactAddr" : "Money Market Account",
        "nationality" : "Salad Web virtual",
        "firstName" : "Loren",
        "lastName" : "Breitenberg",
        "others" : "Squares mint green e-business",
        "isSelfVerify" : true,
        "isHrVerify" : true,
        "statusId" : null,
        "idTypeId" : null,
        "contractTypeId" : null,
        "empTypeId" : null,
        "genderId" : null,
        "birthTypeId" : null
      }
    ],
    columns : [
      {
        title: 'code',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'idNumber',
        dataIndex: 'idNumber',
        key: 'idNumber',
      },
      {
        title: 'phone',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'hireDate',
        dataIndex: 'hireDate',
        key: 'hireDate',
      },
      {
        title: 'jobGrade',
        dataIndex: 'jobGrade',
        key: 'jobGrade',
      },
      {
        title: 'position',
        dataIndex: 'position',
        key: 'position',
      },
      {
        title: 'job',
        dataIndex: 'job',
        key: 'job',
      },
      {
        title: 'empNo',
        dataIndex: 'empNo',
        key: 'empNo',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;">Invite</a>
            <Divider type="vertical" />
            <a href="javascript:;">Delete</a>
          </span>
        ),
      },
    ]
  },


  effects:{

    * fetch({ payload }, { call, put }) {

      let response = yield call(queryEmps, payload);

      console.log(" effects fetch response = " + response);

      // 拿到数据之后可以做一些操作
      yield put({
        // 这行对应下面的reducers处理函数名字
        type: "save",
        // 这是将最后的处理数据传递给下面的reducers函数
        payload: response
      });
    }

  },


  reducers:{
    save(state, action) {
      console.log(" reducers save action = " + action);
      console.log(" reducers save data = " + state.data);
      let list = action.payload;
      return {
        ...state,
        data:list
      };
    },

    add(state){
      
      let newData = [...state.data,...state.data];
      
      return{
        data:newData
      }
    }
  }


}
