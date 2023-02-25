
 const stars = document.querySelectorAll(".stars i");

 stars.forEach((star, index1) => {
   // Add an event listener that runs a function when the "click" event is triggered
   star.addEventListener("click", () => {
     // Loop through the "stars" NodeList Again
     stars.forEach((star, index2) => {
     
       index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
     });
   });
 });
 