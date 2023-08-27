const rp = require("request-promise")

module.exports = async function(node="pve"){
    var mod = {
        /**
        * Fetches current proxmox version. 
        * 
        * @since v0.1.2
        */
        async version(){
            if (!global.proxmoxusercookie) throw Error("Login has not been initiated yet, use \"login()\".");
            else{
                var res = await rp.get(`${global.apilink}/version`, {"headers": {"Cookie": `PVEAuthCookie=${global.proxmoxusercookie}`}})
                return JSON.parse(res).data
            }
        },
        /**
        * Fetches all the CTs and their information. 
        * 
        * @since v0.1.2
        */
        async listCT(){
            if (!global.proxmoxusercookie) throw Error("Login has not been initiated yet, use \"login()\".");
            try{
                var res = await rp.get(`${global.apilink}/nodes/pve/lxc`, {"headers": {"Cookie": `PVEAuthCookie=${global.proxmoxusercookie}`}})
                var data = JSON.parse(res).data
                var ret = []
                
                for (var i=0; i<data.length; i++){
                    ret.push({
                        "name": data[i].name,
                        "id": data[i].vmid,
                        "status": data[i].status,
                        "ram": data[i].maxmem,
                        "usedram": data[i].mem,
                        "cpus": data[i].cpus, 
                        "data": data[i]
                    })
                }

                return ret
            } catch(err){console.error(err); return false}
        },
        /**
        * Fetches all the VMs and their information. 
        * 
        * @since v0.1.2
        */
        async listVM(){
            if (!global.proxmoxusercookie) throw Error("Login has not been initiated yet, use \"login()\".");
            try{
                var res = await rp.get(`${global.apilink}/nodes/pve/qemu`, {"headers": {"Cookie": `PVEAuthCookie=${global.proxmoxusercookie}`}})
                var data = JSON.parse(res).data
                var ret = []
                
                for (var i=0; i<data.length; i++){
                    ret.push({
                        "name": data[i].name,
                        "id": data[i].vmid,
                        "status": data[i].status,
                        "ram": data[i].maxmem,
                        "usedram": data[i].mem,
                        "cpus": data[i].cpus, 
                        "data": data[i]
                    })
                }

                return ret
            } catch(err){console.error(err); return false}
        },
    } 
    return mod
}