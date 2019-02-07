func();

function func() {
  const url = "127:0:0:1:5000";
  const data = {
    headlines: "Bank forecasts worst year for UK since 2009"
  };
  params = {
    headers: {
      "content-type": "application/json"
    },
    body: data,
    method: "GET"
  };
  window.fetch(url)
    .then(info => {
      return info.json();
    })
    .then(res => {
      alert(res);
    });
}

