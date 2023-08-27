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
    * This function will log in to the user you provided.
    * 
    * @param host The link to your proxmox server ({IP/URL}:8006)
    * @param username The username you use to login with
    * @param password The password you use to login with
    * @param realm Realm's default is either PAM (Linux's User Database) or PVE (Proxmox's User Database)
    * @param cookie Use your cookie that you logged in with (can be found with dev console in the applications tab). If you use a cookie to log in, you don't need to fill out the rest.
    * @since v0.1.1
    */
    // implementing checking for cookie soon!
    async login(host, username, password, realm="pam", cookie){
        if (cookie) {
            global.proxmoxusercookie = cookie
            return true
        }
        else {
            var res = await require("./api/login.js")(host, username, password, realm)
            global.proxmoxusercookie = res.data.ticket
            global.apilink = `https://${host}/api2/extjs`
            return true
        }
    }, 
}
