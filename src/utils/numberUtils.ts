
export function isNumber(num){
    var reg = /^[0-9]+.?[0-9]*$/;

    return reg.test(num);
}