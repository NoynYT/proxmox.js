const rp = require("request-promise")

module.exports = {
    /**
    * Fetches current proxmox version. 
    * 
    * @since v0.1.1
    */
    async version(){
        if (!global.proxmoxusercookie) throw Error("Login has not been initiated yet, use \"login()\".");
        else{
            var res = await rp.get(`${global.apilink}/version`, {"headers": {"Cookie": `PVEAuthCookie=${global.proxmoxusercookie}`}})
            return JSON.parse(res).data
        }
    },
    /**
    * This function will log in to the user you provided, this is needed to run anything.
    * 
    * @param host The link to your proxmox server ({IP/URL}:8006)
    * @param username The username you use to login with
    * @param password The password you use to login with
    * @param realm Realm's default is either PAM (Linux's User Database) or PVE (Proxmox's User Database)
    * @param enableinsecure Use this only when testing or when your ssl certificate is not trusted.
    * @param cookie Use your cookie that you logged in with (can be found with dev console in the applications tab). If you use a cookie to log in, you don't need to fill out the rest.
    * @since v0.1.1
    */
    // implementing checking for cookie soon!
    async login(host, username, password, realm="pam", enableinsecure=false, cookie){
        if (cookie) {
            global.proxmoxusercookie = cookie
            return true
        }
        else {
            var res = await require("./api/login.js")(host, username, password, realm, enableinsecure)
            if (res == false){
                throw Error("failed to login")
            }
            global.proxmoxusercookie = res.ticket
            global.apilink = `https://${host}:8006/api2/extjs`
            return true
        }
    }, 
    /** 
     * This function retrieves the node's information.
     * 
     * This currently is limited to versions, lxc (CT) and qemu (VM). But will be expanded future (mostly in 4-5 days from this release.)
     * 
     * @node The name of the node. (is usually pve)
     * @since v0.1.2
     */
    async getNode(node="pve"){
        if (!global.proxmoxusercookie) throw Error("Login has not been initiated yet, use \"login()\".");
        var n = await require("./api/pve.js")(node)
        return n
    },
    /**
     * This function retrieves all the nodes that are currently visible to this user.
     * 
     * Contains the following
     * {
     *  name <- Name of the node (default is usually pve).
     *  cpus <- Thread (or core lol) count of the node.
     *  status <- Status of the node.
     *  fingerprint <- The SSL Fingerprint of the node.
     *  level <- tbh i dont know what is this
     *  uptime <- Uptime of node.
     *  data <- Data dump of request.
     * }
     * 
     * @since v0.1.2
     */
    async listNodes(){
        if (!global.proxmoxusercookie) throw Error("Login has not been initiated yet, use \"login()\".");
        try{
            if (enableinsecure == true){
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
            }
            var res = await rp(`${global.apilink}/nodes`, {
                "headers": {"Cookie": `PVEAuthCookie=${global.proxmoxusercookie}`},
            })
            console.log(res)
            var data = JSON.parse(res).data
            var ret = []
            for (var i=0; i<data.length; i++){
                ret.push({
                    "name": data[i].name,
                    "cpus": data[i].maxcpu,
                    "status": data[i].status,
                    "fingerprint": data[i].ssl_fingerprint,
                    "level": data[i].level,
                    "uptime": data[i].uptime,
                    "data": data[i]
                })
            }
        }catch(err){console.error(err);return false}
    }, 
    /**
     * Send request to api.
     * 
     * @param url the link.
     * @param method POST/DELETE/GET, you name it!
     * @param body your context or whatever
     * @param enableinsecure i am not explaining this again
     * @since v0.1.2
     */
    async request(url, method, enableinsecure=false, body){
        if (!global.proxmoxusercookie) throw Error("Login has not been initiated yet, use \"login()\".");
        try{
            if (enableinsecure == true){
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
            }
            var res = await rp(url, {
                body: body,
                "headers": {"Cookie": `PVEAuthCookie=${global.proxmoxusercookie}`},
                method: method
            })
            console.log(res)
            return JSON.parse(res)
        }catch(err){console.error(err);return false}
    }, 

}
