document.addEventListener('DOMContentLoaded', () => {
    const launchButton = document.getElementById('launchButton');
  
    launchButton.addEventListener('click', handleButtonClick);
  });
  
  function handleButtonClick() {
    alert('Hello world!');
  }
  

  