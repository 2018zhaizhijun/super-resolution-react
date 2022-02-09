import React, { memo } from 'react';
import { Divider } from 'antd';
import { ComparisonWrapper, PageWrapper, SectionWrapper } from './style';

export default memo(function Intro(props) {
    return (
        <PageWrapper>
            <div className='introPage'>
                <br></br>
                <h2>
                    超分辨率技术（Super-Resolution）
                </h2>
                <p>
                    从观测到的低分辨率图像重建出相应的高分辨率图像
                </p>
                <br></br>
                <SectionWrapper>
                    <p>图像超分辨率模型：ESRGAN</p>
                    <div className="rowWrapper">
                        <div className="colWrapper">
                            <span>经过缩放的原图像</span>
                            <img src={require("@assets/img/raw1.png")} alt="原图像示例1" />
                            <img src={require("@assets/img/raw2.png")} alt="原图像示例2" />
                            <img src={require("@assets/img/raw3.png")} alt="原图像示例3" />
                        </div>
                        <div className="colWrapper">
                            <span>超分转换后的图像</span>
                            <img src={require("@assets/img/SR1.png")} alt="超分图像示例1" />
                            <img src={require("@assets/img/SR2.png")} alt="超分图像示例2" />
                            <img src={require("@assets/img/SR3.png")} alt="超分图像示例3" />
                        </div>
                    </div>
                </SectionWrapper>
                <br></br>
                <br></br>
                <SectionWrapper>
                    <p>视频超分辨率模型：TecoGAN</p>
                    <div className="rowWrapper">
                        <div className="colWrapper">
                            <span>经过缩放的原视频</span>
                            <video src={require("@assets/video/raw1.mp4")} controls>原视频示例1</video>
                        </div>
                        <div className="colWrapper">
                            <span>超分转换后的视频</span>
                            <video src={require("@assets/video/SR1.mp4")} controls>超分视频示例1</video>
                        </div>
                    </div>
                </SectionWrapper>
            </div>
            <Divider />
            <ComparisonWrapper>
                <h2>
                    图像超分辨率与其他图像处理技术的对比
                </h2>
                <br></br>
                <h3>
                    图像修复技术 VS 图像超分辨率技术
                </h3>
                <p>
                    图像修复的目标是恢复一个被模糊或者噪声破坏的图像，但是它不改变图像的尺寸。
                    事实上图像修复和SR复原在理论是完全相关的，超分辨率技术可以看作是第二代图像修复技术，
                    主要区别是图像修复技术在处理后图像中的像素数并不增加。
                </p>
                <h3>
                    图像插值 VS 图像超分辨率
                </h3>
                <p>
                    图像插值，即增加单幅图像的尺寸。一般的插值并不能恢复LR采样过程中丢失的高频信息，
                    但是图像超分辨率可以，因此图像插值方法不能被认作是SR技术。
                </p>
                <h3>
                    图像锐化 VS 图像超分辨率
                </h3>
                <p>
                    图像锐化可以提升高频信息，但仅增强已有的高频成分；
                    超分辨率技术能估计出原始图像中没有表现出来的高分辨率细节。
                </p>
                <h3>
                    图像拼接 VS 图像超分辨率
                </h3>
                <p>
                    图像拼接虽然将多幅图像结合成更大的图像，包含了更多的像素，
                    但没有提供更多的细节信息，所以不能算是超分辨率技术。
                </p>
            </ComparisonWrapper>
            <br></br>
        </PageWrapper>
    );
});