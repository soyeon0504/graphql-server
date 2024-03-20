// 실제 DB 활용시 교체 대상
// 임시로 csv 파일을 활용 모듈 설치
const csvToJson = require("convert-csv-to-json");
// 위에서 불러들인 csv 내용을 보관할 배열
const database = {
  todos: [],
};

// 객체의 key 를 파악해서 반복하는 코드
Object.keys(database).forEach((key) => {
  database[key] = [...database[key], ...csvToJson.fieldDelimiter(",").getJsonFromCsv(`./data/${key}.csv`)];
  if (database[key].length > 0) {
    const firstItem = database[key][0];
    Object.keys(firstItem).forEach((itemKey) => {
      if (
        database[key].every((item) => {
          return /^-?\d+$/.test(item[itemKey]);
        })
      ) {
        database[key].forEach((item) => {
          item[itemKey] = Number(item[itemKey]);
        });
      }
    });
  }
});
// 외부에서 사용할 수 있도록 외부노출
module.exports = database;