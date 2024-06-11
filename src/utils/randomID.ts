const _charStr =
  "abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789";
function RandomIndex(min: number, max: number, i: number) {
  let index = Math.floor(Math.random() * (max - min + 1) + min);
  const numStart = _charStr.length - 10;
  //如果字符串第一位是数字，则递归重新获取
  if (i == 0 && index >= numStart) {
    index = RandomIndex(min, max, i);
  }
  //返回最终索引值
  return index;
}

export default function getRandomID(len: number) {
  const min = 0,
    max = _charStr.length - 1;
  let _str = "";
  //判断是否指定长度，否则默认长度为15
  len = len || 15;
  //循环生成字符串
  for (let i = 0, index; i < len; i++) {
    index = RandomIndex(min, max, i);
    _str += _charStr[index];
  }
  return _str;
}
