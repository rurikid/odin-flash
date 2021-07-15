const initControls = () => {
  console.log('Hello Odin!');
  document.addEventListener('keyup', (e) => {
    console.log(e.code);
  });
}

export { initControls };