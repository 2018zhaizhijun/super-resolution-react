import request from './request';

export const downloadFile = (fileType, fileName)=>{
    return request({
        url: `/download/${ fileType=='0'?'image':'video' }/single`,
        method: 'get',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
        'responseType': 'blob',
        params: {
            filename: fileName,
        },
    }).then(function (response) {
        const blob = new Blob([response.data]);
        const linkNode = document.createElement('a');
        linkNode.download = fileName;
        linkNode.style.display = 'none';
        linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
        document.body.appendChild(linkNode);
        linkNode.click();
        URL.revokeObjectURL(linkNode.href); // 释放URL对象
        document.body.removeChild(linkNode);
    }).catch((e) => {
        console.error("download failed: " + e);
    });
}