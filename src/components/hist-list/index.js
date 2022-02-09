import React, { memo, useState, useEffect } from 'react';
import { Card, message } from 'antd';
import { getHistList, deleteHist, deleteHistBatch } from '@service/history';
import histListStyle from './style.module.css';
import { CloseOutlined } from '@ant-design/icons';
import { BASE_URL } from '@service/config';

function HistItem(props) {
    const { historyId, rawFile, processedFile, 
            mediaType, deleteCallback } = props;

    const handleDownload = (fileUrl) => {
        let num = fileUrl.lastIndexOf('/')+1,
            a = document.createElement("a"),
            event = new MouseEvent("click");
        let name = fileUrl.substring(num);
        a.download = name;
        a.href = fileUrl;
        a.dispatchEvent(event);
    };

    const handleDelete = () => {
        deleteHist(historyId).then((res) => {
            if (res.statusCode == 200) {
                deleteCallback();
            }
            else {
                throw new Error('statusCode' + res.statusCode);
            }
        }).catch((e) => {
            console.error('deleteHistError', e);
            message.error("历史记录删除失败");
        })
    };

    const showGridItem = (fileUrl, type) => {
        return (
            <Card.Grid className={histListStyle.gridItem}
              hoverable={false}>
                {
                    mediaType == '0' ? 
                    <img src={fileUrl} alt={type+" image"} /> :
                    <video src={fileUrl} controls="controls">
                        该浏览器不支持 video 播放，请下载后观看
                    </video>
                }
                <div onClick={()=>handleDownload(fileUrl)}>
                    <span>下载</span>
                </div>
            </Card.Grid>
        )
    }

    return (
      <div className={histListStyle.card}>
        <CloseOutlined className={histListStyle.closeTag}
          onClick={handleDelete} />
          
        <Card 
          key={historyId}
          title="日期："
        >
            {showGridItem(rawFile, 'raw')}
            {showGridItem(processedFile, 'processed')}
        </Card>
      </div>
    );
}

export default memo(function HistList({ initialList=[] }) {
    const [histList, setHistList] = useState(initialList);

    const showHistItem = (item, index) => {
        const itemProps = {
            historyId: item.id,
            rawFile: BASE_URL+item.rawMaterial,
            processedFile: BASE_URL+item.result,
            mediaType: item.type,
            deleteCallback: () => {
                let histListNew = histList.slice(0);
                histListNew.splice(index, 1)
                setHistList(histListNew);
            },
        };

        return (
            <HistItem {...itemProps} />
        );
    };

    useEffect(() => {
        getHistList().then((data) => {
            //console.log(data);
            setHistList(data);
        }).catch((e) => {
            console.error('getHistListError', e);
            message.error("历史记录获取失败");
        })
    }, []);

    return (
        <div className={histListStyle.histListWrapper}>
            {histList.map(showHistItem)}
        </div>
    );
});