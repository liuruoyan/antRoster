// export function deleteEmptyProperty(obj) {
//   var object = obj;
//   // 遍历所有属性
//   for (var i in object) {
//     var value = object[i];
//     if (typeof value === 'object') {
//       // 对象属性 -> 
//       if (Array.isArray(value)) {
//         // 数组属性
//         // 删除里面所有空对象
//         value.forEach((e, j) => {
//           if(JSON.stringify(e) == "{}")
//             value.remove(j);
//         });
//         // 如果删完之后长度为0，数组整个删掉
//         if (value.length == 0) {
//           delete object[i];
//           continue; 
//         }

//       } else {
//         // 非数组的对象
//         deleteEmptyProperty(value);
//         // 内部删完后，如果是空对象的话，删除这个属性
//         if(JSON.stringify(value) == "{}")
//           delete object[i];
//       }

//     } else {
//       // 基本类型属性 -> 空值删除
//       if (value === '' || value === null || value === undefined) {
//         // console.log('del;
//         delete object[i];
//       }
//     }
//   }

//   return object;
// }


//判断对象是否没有属性，如{}或者[]
function isEmptyObj(o) {
  for (let attr in o)
    return !1;
  return !0
}
function processArray(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === null || arr[i] === undefined) arr.splice(i, 1);
    else if (typeof arr[i] == 'object') removeNullItem(arr[i], arr, i);
  }
  return arr.length == 0
}
function proccessObject(o) {
  for (let attr in o) {
    if (o[attr] === null || o[attr] === undefined) delete o[attr];
    else if (typeof o[attr] == 'object') {
      removeNullItem(o[attr]);
      if (isEmptyObj(o[attr])) delete o[attr];
    }
  }
}

export function removeNullItem(o, arr, i) {
  let s = ({}).toString.call(o);
  if (s == '[object Array]') {
    if (processArray(o) === true) {//o也是数组，并且删除完子项，从所属数组中删除
      if (arr) arr.splice(i, 1);
    }
  }
  else if (s == '[object Object]') {
    proccessObject(o);
    if (arr && isEmptyObj(o)) arr.splice(i, 1);
  }
}