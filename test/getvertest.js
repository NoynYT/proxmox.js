(async()=>{
    const proxmox = require("../index.js")

    await proxmox.login("192.168.72.72", "test", "password", "pve", true)
    
    console.log(await proxmox.version())

})()