# Proxmox.js
This is the unofficial api for proxmox, coupled together by a single person. This api is currently unfinished, but you can use it by typing in ```npm install proxmox-api.js```

It currently does not have an documentation, but you can rely on its type.

# Initialization
You can import it into your project by doing
```
const proxmox = require("proxmox")
```

# Examples

## Getting PVE Version
```
const proxmox = require("proxmox")

async function run(){
  await proxmox.login("Host IP/URL here", "user", "password, "pve", false)
  console.log(await proxmox.version())
}
run()
```
