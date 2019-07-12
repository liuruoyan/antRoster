import request from "../../../utils/request";

export async function SubmitForm(params: any) {

  return request('/server/roster/api/employees/forms', {
    method: 'POST',
    data: params,
    getResponse: true
  });
}
