// ant 自己封装好的发送ajax请求的工具
import request from "@/utils/request";

export async function queryEmps() {
  return request('http://localhost:8080/api/employees', {
    method:'GET'
  });
}

