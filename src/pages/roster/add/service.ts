import request from "../../../utils/request";

export async function SubmitForm(params: any) {

  return request('/server/roster/api/employees/forms', {
    method: 'POST',
    data: params,
    getResponse: true
  });
}

export async function QueryEnumIdTypes(params: any) {
  return request('/server/roster/api/' + params.name, {
    method: 'GET',
    data: params,
    getResponse: true
  });
}