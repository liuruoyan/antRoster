// import request from 'umi-request';
import request from '../../../utils/request';
import { TableListParams } from './data.d';
import {isNumber} from '../../../utils/numberUtils'

export async function queryRule(params: TableListParams) {
  // 分页参数名转成后端需要的格式
  // 如果params中没有page和size 用1和10代替
  params = {pageSize : 10, currentPage : 1, ...params};
  // payload{pageSize->size currentPage->page}
  params["size"] = params.pageSize;
  delete params.pageSize;
  if(!isNumber(params["size"])){
    params["size"] = 10;
  }
  // 前端的page从1开始，后端的page从0开始
  params["page"] = params.currentPage - 1;
  delete params.currentPage;
  if(!isNumber(params["page"])){
    params["page"] = 0;
  }
  // 把 # 替换回 . 
  let s_params = JSON.stringify(params).replace(/#/g,'.');
  params = JSON.parse(s_params);
  let response = request('/server/roster/api/employees', {
    params,
    getResponse: true
  })
  response.then(res => {
    try{
      res["list"] = res.data;
      delete res.data;
      res["pagination"] = {
        // total在response header中
        total:parseInt(res.response.headers.get('X-Total-Count')),
        // page和size从request参数回取, 前端的page从1开始
        pageSize:params["size"],
        current:params["page"] + 1
      }
      delete res.response;
    } catch(e){

    }
    
  });

  return response;
}

export async function removeRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
