const button = document.querySelector('button');
button.addEventListener('click', () => {
  //   console.log(navigator.geolocation);
  // geolocation is used to display the location

  if (navigator.geolocation) {
    // getCurrentPosition(success, error, options)
    // geolocation.getCurrentPosition() is used to get the current position

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    button.innerHTML = 'Your Browser Not Supported';
  }
});

function onSuccess(position) {
  console.log(position);
  let {latitude, longitude} = position.coords;
  //   console.log(latitude, longitude);
  let apikey = 'e102bed8be83432f97dd73418342fde5';

  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C9.${longitude}&key=${apikey}`
  )
    .then((response) => response.json())
    .then((result) => console.log(result));
}

function onError(error) {
  //   console.log(error);

  if (error.code == 1) {
    // user Denied The Request
    button.innerHTML = 'You Denied The Request';
  } else if (error.code == 2) {
    //user Location Not Available
    button.innerHTML = 'Location Not Available';
  } else {
    // any other problem
    button.innerHTML = 'Something Went Wrong';
  }

  button.setAttribute('disabled', 'true'); // the user denied the request the button is disabled
}
