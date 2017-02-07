/*jshint esversion: 6 */

//DOCS return typeof everything in the array
let types = [
  null,
  undefined,
  Object,
  Date,
  Number,
  String,
  Array,
  Error,
  {},
  1,
  "1",
  "A",
  () => {},
  function(){},
  class MyClass{},
  // below this line should augmented gotchas
  (() => 2 + "2")()
];

function getTypes() {
  types.forEach((v,k) => {
    console.log(`${k}: typeof ${v} = ${typeof v}`);
  });
}
