export const kFormatter = (num) =>
  Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);

//MAX값 찾는 함수
export const checkMaxFunc = (data) => {
  let Max = 0;
  for (let i = 0; i < data.length; i++) {
    if (Max < data[i][2]) {
      Max = data[i][2];
    }
  }
  return Max;
};

//데이터 가공하는 함수
export const dataProcessing = (apiData) => {
  return apiData.data.measures[0]
    .map((array, index) => {
      return array.map((item, chlid_index) => {
        return [index, chlid_index, item];
      });
    })
    .flat()
    .map(function (item) {
      return [item[1], item[0], item[2] || "-"];
    });
};
