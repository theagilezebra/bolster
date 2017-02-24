export default function (categoryList) {
  return categoryList.map((category) => {
    category.categories = JSON.parse(category.categories);
    return category;
  })
  .filter(({ categories }) => categories.length === 2)
  .reduce((obj, { categories }) => {
    !obj[categories[0]]
      ? obj[categories[0]] = []
      : obj[categories[0]].push(categories[1]);
    return obj;
  }, {});
}
