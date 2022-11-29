const img = document.getElementById('img');

img.addEventListener('error', function handleError() {
  const defaultImage =
    'https://brunswick.ces.ncsu.edu/wp-content/uploads/2022/05/pets-g6fa575878_1920.jpg';

  img.src = defaultImage;
  img.alt = 'default';
});