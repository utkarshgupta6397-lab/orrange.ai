const http = require('http');
http.get('http://localhost:3000/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log("Status:", res.statusCode);
    if (data.includes('404: This page could not be found')) {
      console.log("Found 404 text in body");
    }
    if (data.includes('LivingOperationsGraph')) {
      console.log("Found LivingOperationsGraph in body");
    }
    if (data.includes('Internal Server Error')) {
      console.log("Found Internal Server Error in body");
    }
  });
});
