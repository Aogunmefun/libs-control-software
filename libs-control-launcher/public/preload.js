const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('server', {
    queryUpdate: async ()=> ipcRenderer.invoke('queryUpdate'),
    getUpdate: async ()=> {
        let res = await ipcRenderer.invoke('getUpdate')
        console.log("finished")
        return res
    },
    response: (callback) => ipcRenderer.on('response', callback),
    getFiles: async (files)=> {
        let res = await ipcRenderer.invoke("getFiles", files)
        console.log(res)
        return res
    },
    runAll: ()=>ipcRenderer.invoke('runAll')
})