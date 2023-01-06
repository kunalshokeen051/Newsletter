const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
var path = require("path");
const client = require("@mailchimp/mailchimp_marketing");

const app = new express();
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));


client.setConfig({
  apiKey: "2033d78cbb1a378f8a45269ec69d07d0-us13",
  server: "us13",
})


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/signup.html");
});

app.post("/", function (req, res) {
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  // const phone = req.body.phone;
  const email = req.body.email;

  // console.log(firstname + " | " + lastname + " | " + email);

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  };
  
  const jsonData = JSON.stringify(data);
  
  const url = "https://us13.api.mailchimp.com/3.0/lists/0fdab12bf0";
  const options = {
    method: "POST",
    auth: "kunalshokeen:2033d78cbb1a378f8a45269ec69d07d0-us13"
  };
  
  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      // console.log(JSON.parse(data));
      console.log(response.statusCode);
      console.log("Member Successfully Added");
      
      if(response.statusCode == 200)
      {
        res.sendFile(__dirname+"/public/success.html");
      }
      else{ 
        res.sendFile(__dirname+"/public/success.html");
      }
    });
  });
  

  request.write(jsonData);
  request.end();
  

  
});

app.listen(3000, function () {
  console.log("server is running at port 3000");
});



// MAILCHIMP API KEY ---->   2033d78cbb1a378f8a45269ec69d07d0-us13
// audience-id------>  0fdab12bf0



