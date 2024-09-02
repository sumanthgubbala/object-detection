"use client";
import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam';
import {load as cocoSSDLoad } from "@tensorflow-models/coco-ssd"
import * as tf from "@tensorflow/tfjs";
import { renderPredictions } from '@/utils/render-predictions';

let detectInterval;
const ObjectDetection = () => {
    const [isLaoding, setisLaoding] = useState(true)
    const webcamref =useRef(null);
    const canvasref =useRef(null);
     
    const runCoco  = async() =>{
        setisLaoding(true);
       const net = await cocoSSDLoad();
       setisLaoding(false);
      detectInterval = setInterval(()=>{
       runObjectDetection(net)
       },10)
    }
    async function  runObjectDetection(net) {
        if(
            canvasref.current &&
            webcamref.current !==null &&
             webcamref.current.video?.readyState === 4
        ){
            canvasref.current.width = webcamref.current.video.videoWidth;
            canvasref.current.height= webcamref.current.video.videoHeight;

            const detectedObjects = await net.detect(
                webcamref.current.video,
                undefined,
                0.6
            );
            //console.log(detectedObjects)
            const context = canvasref.current.getContext("2d");
            renderPredictions(detectedObjects,context);

        }
    }

    const showmyvideo =()=>{
        if (webcamref.current!==null && webcamref.current.video?.readyState === 4) {
            const myVideoWidth = webcamref.current.video.videoWidth;
            const myVideoHeight = webcamref.current.video.videoHeight;
            webcamref.current.video.width = myVideoWidth;
            webcamref.current.video.height = myVideoHeight;

        }
    }
    useEffect(()=>{
        runCoco()
        showmyvideo()
    },[])
  return (
    <div className='mt-8'>{
        isLaoding ? (
            <div className='gradient'> Loading AI model</div>
        ):(
        <div className='relative flex justify-center items-center gradient p-1.5 rounded-md'>
           <Webcam ref={webcamref}
            className='rounded-md w-full lg:h-[720px]' muted
            />
            <canvas 
            ref={canvasref}
            className='absolute top-0 left-0 z-99999  w-full lg:h-[720px]'
             />

        </div>
        )}

    </div>
  );
};

export default ObjectDetection