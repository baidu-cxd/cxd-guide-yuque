export function resolveYaml(data) {
    let resolvedData = []
    const dataToArray = data.split(/\s-/)
    const path = window.location.hash
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