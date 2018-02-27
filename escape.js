function escapeFunction () {
  //select document body
  var wholeDoc = document.querySelector('body');
  //create new link element
  var newEl = document.createElement("a");
  //attach new link to body
  wholeDoc.appendChild(newEl);
  //give id of 'escapeButton' to new link
  newEl.setAttribute("id", "escapeButton");
  //add style to button if bootstrap is loaded
  newEl.setAttribute("class", "btn btn-primary");
  //set link of button to a believable domain --don't use Google
  newEl.setAttribute("href", "http://www.todayifoundout.com");
  //select button by ID
  var newButton = document.getElementById("escapeButton");
  //set the text of the button
  newButton.textContent = "Escape";
  //create variable to make it easier to style
  var style = newButton.style;
  //make button always visible
  style.position = "fixed";
  //place button at the bottom
  style.bottom = "0px";
  //button takes up full width
  style.width = "100%";
  //center the escape text inside the button
  style.textAlign = "center";
  //button text size
  style.fontSize = "30px";
  //change cursor to show it's a clickable link
  style.cursor = "pointer";
  //color of button, used for dinahphilly.org--choose your own color
  style.backgroundColor = "#b980c2";
  //style text color--here it's white
  style.color = "#fff";
  //ensure the button is always visible
  style.zIndex = "999999999999999";
  //give some space around the text
  style.padding = "20px";
  //add a click event listener to the button
  newButton.addEventListener("click", function(event) {
    //prevent default link functionality
    event.preventDefault();
    //navigate to a safe site--using this as a backup if the loop below doesn't properly use location.replace for button
    location.replace("https://www.google.com");
  });



  //select all link elements on page into an array like object
  var els = document.querySelectorAll('a');
  //loop through the array like variable above of all links on the page
  for (var i = 0; i < els.length; i++) {
    //assign a local variable--doing this instead of ES6 let for backwards compatability
    var k = i;
    //attach an event listener to each variable
    els[k].addEventListener("click", function(event) {
      //stop normal link navigation
      event.preventDefault();
      //assign the path object to a variable
      var paths = event.path;
      //make sure there is a path on the object
      if (paths != undefined || paths != null) {
        //loop through the path object
        for (var j = 0; j < paths.length; j++) {
          //loop through the object and look for a path with a valid link type
          if (paths[j].localName == "a") {
            //make sure that the link type has a valid href
            if (paths[j].href != "#" && paths[j].href != null && paths[j].href != undefined) {
              //replace current location
              location.replace(paths[j].href);
            }
          }
        }
      } else {
        //check to make sure it's not an empty link, and that there's a valid link
        if (event.target.href != "#" && event.target.href != null && event.target.href != undefined) {
          //replace current history object
          location.replace(event.target.href)
        }
      }
    });
  }
}
//load function when document has finished loading
if (document.readyState != 'loading') escapeFunction();
//listen for docuemnt to load -- check if browser supports document.addEventListener
else if (document.addEventListener) document.addEventListener('DOMContentLoaded', escapeFunction);
//for other browsers, attach event listener (IE) and load when ready
else document.attachEvent('onreadystatechange', function() {
  if (document.readyState == 'complete') escapeFunction();
});
