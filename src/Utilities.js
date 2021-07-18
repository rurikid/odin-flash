const ShuffleArray = (array) => {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    let randIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    let temp = array[currentIndex];
    array[currentIndex] = array[randIndex];
    array[randIndex] = temp;
  }
  return array;
}

export { ShuffleArray };