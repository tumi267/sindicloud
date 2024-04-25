'use client'
import Sindi_download from "../components/Sindi_download"
import Sindi_upload from "../components/Sindi_upload"
import DownloadAudio from "../components/DownloadAudio"
import SindiFile from "../components/SindiFiles"
import UploadAudio from "../components/UploadAudio"
import DownloadFile from "../components/DownloadFile"
import Menu from "../components/Menu"
import { useState } from "react"
import styles from './user.module.css'
function Page() {
  const [option,setOption]=useState('image')

  return (
    <div>
        <h1>Hello My Sindi</h1>
       <p>over time ill make it look and work better dont know why im being lazy </p>
        <Menu
        opetions={setOption}
        />
        <div className={styles.contain_content}>

        {option=='image'&&
        <div>
        <Sindi_upload/>
        <Sindi_download/>
        </div>
        }
        {option=='audio'&&
        <div>
        <UploadAudio/>
        <DownloadAudio/>
        </div>
        }
        {option=='files'&&
        <div>
        <SindiFile/>
        <DownloadFile/>
        </div>
        }
        </div>
    </div>
  )
}

export default Page