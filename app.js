(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();


// check if user agent matches a mobile device
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}



var saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", function () {
  // Get the contact information from the website
  var contact = {
    name: "Georgios Feidakis",
    phone: "+306987106768",
    email: "gfeidakis@outlook.com",
    photo: "",
    profession: "Software Engineer | Angular Developer at Cognity A.E",
    linkedin: "www.linkedin.com/in/gfeidakis",
    birthday: "29/12/1997",
    website: "https://geofeid.github.io/myportofolio/"
  };


  if(isMobile()){
  // Load the photo file
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'img/geofeid.jpeg', true);
  xhr.responseType = 'blob';
  xhr.onload = function() {
    if (this.status === 200) {
      // Generate a data URL for the photo file
      var reader = new FileReader();
      reader.onloadend = function() {
        // Create the vCard string with the photo
        var vcard = "BEGIN:VCARD\nVERSION:4.0\nFN:" + contact.name + "\nTEL;TYPE=work,voice:" + contact.phone + "\nEMAIL:" + contact.email + "\nTITLE:" + contact.profession + "\nPHOTO;TYPE=JPEG;ENCODING=b:" + btoa(reader.result) + "\nURL:" +  contact.website + "\nBDAY;value=date:" + contact.birthday + "\nitem1.URL;type=pref:" + contact.linkedin +  "\nEND:VCARD"


        
        // Create the download link and trigger the download
        var blob = new Blob([vcard], { type: "text/vcard" });
        var url = URL.createObjectURL(blob);
        const newLink = document.createElement('a');
        newLink.download = contact.name + ".vcf";
        newLink.textContent = contact.name;
        newLink.href = url;
        newLink.click();
      };
      reader.readAsBinaryString(this.response);
    }
  };
  xhr.send();
}
else {
  var div = document.getElementById("qrcode");
  var buttonText = document.querySelector("#save-btn .btn-text");
  if (div.style.display === "none") {
    div.style.display = "block";
    buttonText.innerHTML = "Hide QR Contact"
  }
   else {
    div.style.display = "none";
    buttonText.innerHTML = "Add to Contacts"
  }
}
})
