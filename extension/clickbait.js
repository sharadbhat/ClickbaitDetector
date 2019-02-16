fetch("http://localhost:5000/", {
  method: "post",
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ url: "http://facebook.com" })
})
  .then(res => res.json())
  .then(res => console.log(res));
