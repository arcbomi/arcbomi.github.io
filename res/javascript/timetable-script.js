function updateScale() {
    const screenWidth = window.innerWidth;
    const scaleFactor = 2 + screenWidth /3600;
    const timetbElements = document.querySelectorAll('.timetb');

    timetbElements.forEach((element) => {
      element.style.transform = `scale(${scaleFactor})`;
    });
  }

  window.addEventListener('load', updateScale);
  window.addEventListener('resize', updateScale);