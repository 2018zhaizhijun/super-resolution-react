import request from './request';

export const uploadImage = (imgFile, onUploadProgress) => {
    const formData = new FormData();
    formData.append('image', imgFile);
    return request({
        url: '/upload/image/single',
        method: 'post',
        headers: {
            'content-type': 'multipart/form-data',
        },
        params: {
            tag: imgFile.name,
        },
        data: formData,
        onUploadProgress,
    });
};

export const uploadVideo = (videoFile, onUploadProgress) => {
    const formData = new FormData();
    formData.append('video', videoFile);
    return request({
        url: '/upload/video/single',
        method: 'post',
        headers: {
            'content-type': 'multipart/form-data',
        },
        params: {
            tag: videoFile.name,
        },
        data: formData,
        onUploadProgress,
    });
};