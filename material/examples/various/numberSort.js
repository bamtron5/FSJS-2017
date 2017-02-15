//@param unsorted:array<Number>
function numberSort(unsorted) {
  for(var i = 0; i < unsorted.length; i++) {
    var target = unsorted[i];
    for(var j = i - 1; j >= 0 && (unsorted[j] > target); j--) {
      unsorted[j+1] = unsorted[j];
    }
    unsorted[j+1] = target;
  }
  return unsorted;
}
