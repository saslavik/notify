export default function loadMore(res) {
  const messages = [];
  //  > 2
  /*
  eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["res"] }]
  */
  if (res.length > 3) {
    for (let i = 0; i < 3; i += 1) {
      res[i].address.zipcode *= 10;
      messages.push(res[i]);
    }
  } else {
    for (let i = 0; i < res.length; i += 1) {
      res[i].address.zipcode *= 10;
      messages.push(res[i]);
    }
  }
  return messages;
}
