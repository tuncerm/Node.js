const input = document.querySelector("input");
const button = document.querySelector("button");
const show = document.getElementById('show');

button.onclick = function(e){
  fetch('/', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ city: input.value })
  })
  .then(data => data.json())
  .then(json=>{
    show.innerHTML = json.message ? `<p class="capitalize">${json.message}</p>` : `<p>The temperature in ${json.city} is ${json.temp} °C!</p>`;
  })
  .catch(e => {
    show.innerHTML = `<p class="capitalize">Something Went Wrong!</p>`;
  });
};

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    button.click();
  }
});