const axios = require('axios')
const iuInfo = function () {
    axios.get('http://localhost:3000/search', {
        params: {
            keywords: "iu"
        }
    })
    .then(function (response) {
        return response.data
    })
}
export default {iuInfo};