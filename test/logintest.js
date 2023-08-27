(async()=>{
    const proxmox = require("../index.js")

    await proxmox.login("192.168.1.45:8006", "test", "password", "pve")

    console.log(await proxmox.version())

})()