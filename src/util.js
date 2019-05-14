export function pageFilter(page) {
    let filteredPage = ''
    let nav = []
    // 添加 H1 标签,如果自带 H1 则不需要添加
    console.log(page)
    const H1 = page.title
    let html = page.body_html
    if (html.substring(0, 3) !== "<h1") {
        html = "<h1>" + H1 + "</h1>" + html
    }
    // 取消图片宽限制
    const reg =  new RegExp("width:.[0-9]+\.[0-9]+px\;",'g')
    filteredPage  = html.replace(reg,'')
    // 重新创建链接地址
    const reg1 = new RegExp('(<h[2-9] id=")[a-z0-9A-Z]*(">)(.*?)(</h[2-9]>)','g')
    filteredPage  = filteredPage.replace(reg1,"$1$3$2$3<a href='"+'#'+"$3"+"'>#</a>$4")
    // 渲染颜色块
    const reg2 = new RegExp('<p>::: (color.*?) #(.*?)</p><p>(.*?)</p><p>:::</p>','g')
    filteredPage  = filteredPage.replace(reg2,"<div class='$1' style='background-color:#$2;'>" +
                                              "<p class='title'>$3</p>" +
                                              "<p class='color'>$2</p>" +
                                              "</div>"
                                        )
    // 删除所有空行
    const reg3 = new RegExp('<[a-z0-9]+([ \f\n\r\t\v]id="[A-Za-z0-9]*")?><br /></[a-z0-9]+>','g')
    filteredPage  = filteredPage.replace(reg3," ")
    // 生成右侧导航
    const reg4 = new RegExp('<h[2-9] id="[a-z0-9A-Z\u4e00-\u9fa5]*">.*?</h[2-9]>','g')
    let navData = []
    navData = filteredPage.match(reg4)
    if (navData){
        navData.forEach((data)=>{
            const reg5 = new RegExp('<(h[2-9]) id="([a-z0-9A-Z\u4e00-\u9fa5]*)">.*?</h[2-9]>')
            const resData = data.match(reg5)
            nav.push({
                lv: resData[1],
                name: resData[2],
                link: '#'+resData[2]
            })
        })
    }
    return {filteredPage, nav}
}

export function resolveYaml(data) {
    let resolvedData = []
    let flatData = []
    const dataToArray = data.split(/\s-/)
    const path = window.location.href
    let lastPath = path.split('/')[path.split('/').length-1]
    if (lastPath.indexOf('#')>-1) {
        lastPath = lastPath.split('#')[0]
    }
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
        // 创建拍平数据
        if (type === 'DOC') {
            flatData.push(
                {
                    url: resolvedItem.url,
                    title: resolvedItem.title
                }
            )
        }
        if (level === '0'){
            resolvedData.push(resolvedItem)
        } else if (level === '1') {
            resolvedData[resolvedData.length - 1].children.push(resolvedItem)
        } else if (level === '2') {
            resolvedData[resolvedData.length - 1].children[resolvedData[resolvedData.length - 1].children.length-1].children.push(resolvedItem) 
        }
    }
    return {resolvedData, flatData}
}