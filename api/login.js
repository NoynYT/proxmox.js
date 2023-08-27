const rp = require("request-promise")

module.exports = async function(host, username, password, realm, insecure){
try{
    if (insecure == true){
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
    }
    var res = await rp.post(`https://${host}:8006/api2/extjs/access/ticket`, {
        body: `username=${username}&password=${password}&realm=${realm}&new-format=1`
    })
    return JSON.parse(res).data
}catch(err){throw Error(err);}}
