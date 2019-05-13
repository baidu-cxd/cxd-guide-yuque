export function pageFilter(page) {
    console.log(page)
    let filteredPage = ''
    // 取消图片宽限制
    let reg =  new RegExp("width:.[0-9]+\.[0-9]+px\;",'g')
    filteredPage  = page.replace(reg,'')
    // 重新创建链接地址
    let reg1 = new RegExp('(<h[1-9] id=")[a-z0-9]*(">)(.*?)(</h[1-9]>)','g')
    filteredPage  = page.replace(reg1,"$1$3$2$3<a href='"+'#'+"$3"+"'>#</a>$4")
    return filteredPage
}

export function resolveYaml(data) {
    let resolvedData = []
    const dataToArray = data.split(/\s-/)
    const path = window.location.href
    const lastPath = path.split('/')[path.split('/').length-1]
    for (let i = 1; i < dataToArray.length; i++){
        const item = dataToArray[i]
        const level = item.match(/level:\s([0-9])/)[1] // 获得等级
        // 获得 url
        let url = ''
        if (item.match(/url:\s(.*)/)) {
            url = item.match(/url:\s(.*)/)[1]
        }
        // 控制父级目录展开
        if (level !== '0' && lastPath === url){
            resolvedData[resolvedData.length - 1].open = true
        }
        if (path.indexOf('test/docs')>-1) { // 测试站的
            url = '/test/docs/' + url
        } else (
            url = '/docs/' + url
        )
        // 获得标题和判断是否上线
        let title = item.match(/title:\s(.*)/)[1]
        let publish = true
        if (title.match(/\/\/(.+)/)){
            title = title.match(/\/\/(.+)/)[1]
            publish = false
        }
        // 判断是一个标题还是一个文章链接
        let type = item.match(/type:\s(.*)/)[1]
        let resolvedItem = {
            type : type,
            title : title,
            url : url,
            publish: publish,
            open : false,
            children : []
        }
        if (level === '0'){
            resolvedData.push(resolvedItem)
        } else if (level === '1') {
            resolvedData[resolvedData.length - 1].children.push(resolvedItem)
        } else if (level === '2') {
            resolvedData[resolvedData.length - 1].children[resolvedData[resolvedData.length - 1].children.length-1].children.push(resolvedItem) 
        }
    }
    return resolvedData
}