/*
 * Copyright 2021-Present Shanghai Jiusi Xinyuan Intelligent Technology Co. Ltd (www.txz.tech). All Rights Reserved.
 * This material, including without limitation any software, is the confidential trade secret and proprietary
 * information of Shanghai Jiusi Xinyuan Intelligent Technology Co. Ltd and its licensors.
 * Reproduction, use and/or distribution of this material in any form is strictly prohibited except as set forth
 * in a written license agreement with Shanghai Jiusi Xinyuan Intelligent Technology Co. Ltd.
 * This material may be covered by one or more patents or pending patent applications.
 */

'use client'

import { useEffect } from 'react'

export default function WeixinShare({
  signObject,
  signature,
  appId,
  url,
  title,
  desc,
  imgUrl
}: {
  signObject: any
  signature: any
  appId: string
  url: string
  title: string
  desc: string
  imgUrl: string
}) {
  useEffect(() => {
    const wxjs: typeof import('weixin-js-sdk-ts')['default'] = require('weixin-js-sdk')

    wxjs.config({
      debug: false,
      appId,
      timestamp: signObject['timestamp'],
      nonceStr: signObject['noncestr'],
      signature,
      jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'],
      openTagList: []
    })

    wxjs.ready(function () {
      wxjs.updateAppMessageShareData({
        title: title,
        link: url,
        desc: desc,
        imgUrl:
          imgUrl ||
          `${window.location.protocol}//${window.location.host}/assets/logo-img.png`,
        success: () => {},
        cancel: () => {}
      })
      wxjs.updateTimelineShareData({
        title: title,
        link: url,
        imgUrl: imgUrl,
        success: () => {},
        cancel: () => {}
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <></>
}
