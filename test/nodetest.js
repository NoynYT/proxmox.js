(async function(){
const proxmox = require("../index.js")

await proxmox.login("192.168.72.72", "test", "password", "pve", true)
var pve = await proxmox.getNode("pve")

console.log(`Logged in\n-----------`)
console.log(`Version: ${(await pve.version()).version}`)
console.log(`\n-------------\n     CTs\n-------------`)
console.log(`1st CT Name: ${(await pve.listCT())[0].name}`)
console.log(`\n-------------\n     VMs\n-------------`)
console.log(`1st VM Name: ${(await pve.listVM())[0].name}`)

})()