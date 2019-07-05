import React, { PureComponent  } from 'react';
import { connect } from "dva";
import { Table, Divider, Tag, Button } from 'antd';

// @ts-ignore
// @connect(({ country, loading }) => ({
//   data: country.data, // 将data赋值给
//   loading: loading
// }))
// const columns = [
//   {
//     title: 'code',
//     dataIndex: 'code',
//     key: 'code',
//   },
//   {
//     title: 'name',
//     dataIndex: 'name',
//     key: 'name',
//   },
//   {
//     title: 'idNumber',
//     dataIndex: 'idNumber',
//     key: 'idNumber',
//   },
//   {
//     title: 'phone',
//     dataIndex: 'phone',
//     key: 'phone',
//   },
//   {
//     title: 'hireDate',
//     dataIndex: 'hireDate',
//     key: 'hireDate',
//   },
//   {
//     title: 'jobGrade',
//     dataIndex: 'jobGrade',
//     key: 'jobGrade',
//   },
//   {
//     title: 'position',
//     dataIndex: 'position',
//     key: 'position',
//   },
//   {
//     title: 'job',
//     dataIndex: 'job',
//     key: 'job',
//   },
//   {
//     title: 'empNo',
//     dataIndex: 'empNo',
//     key: 'empNo',
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     render: (text, record) => (
//       <span>
//         <a href="javascript:;">Invite {record.name}</a>
//         <Divider type="vertical" />
//         <a href="javascript:;">Delete</a>
//       </span>
//     ),
//   },
// ];

const mapStateToProps = (state) => {
  const data = state['conntest'].data;
  const columns = state['conntest'].columns;
  return {
    data,columns
  }
};

const mapDispatchToProps = (dispatch) =>{
  return {
    addNewData: () => {
      dispatch({
          type: 'conntest/add'
      });
    },
    initData: () => {
      dispatch({
        type: 'conntest/fetch'
      })

    }
  }
}

@connect(mapStateToProps, mapDispatchToProps)
class Conntest extends PureComponent {
  // componentWillMount渲染之前调用，一般处理ajax异步回来的数据，
  // 等下面render渲染的时候好绑定
  componentWillMount() {
    console.log("渲染之前调用");
    console.log("只调用一次");
  }

  // 每次调用render之前渲染
  componentDidMount() {
    // 分发器,用dispatch一定要写@connect注解
    // @ts-ignore
    const { dispatch } = this.props;
    this.props.initData();
    // 分发器调用models发起请求，具体流程是dispatch=>models=>services
    // dispatch({
      // newPage命名空间，fetch是该文件中的方法，对应src/models/newPage.js，因为newPage的namespace的值newPage
      // type: "conntest/fetch",
      // 参数，一般采用json格式
      // payload: { id : "1"}
    // });
  }

 

  render() {
    // @ts-ignore
    let { data, columns } = this.props;
    return (
      <div>
        <h2>Table</h2>
        <Button type="primary" onClick={()=> this.props.addNewData()}>add</Button>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default Conntest;
