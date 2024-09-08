(async function(){
const proxmox = require("../index.js")

await proxmox.login("192.168.72.72", "test", "password", "pve", true)

var req = await proxmox.request("https://192.168.72.72:8006/api2/extjs/nodes/", "GET", true)

console.log(req)

})()
