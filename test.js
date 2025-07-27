const axios = require('axios');

axios.post('http://localhost:3000/api/auth/register', {
  name: 'test',
  email: 'test@test.com',
  password: '123456'
})
.then(res => {
  console.log(res.data);
})
.catch(err => {
  console.error(err.message);
});
