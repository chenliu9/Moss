/*
 * Copyright 2021-Present Shanghai Jiusi Xinyuan Intelligent Technology Co. Ltd (www.txz.tech). All Rights Reserved.
 * This material, including without limitation any software, is the confidential trade secret and proprietary
 * information of Shanghai Jiusi Xinyuan Intelligent Technology Co. Ltd and its licensors.
 * Reproduction, use and/or distribution of this material in any form is strictly prohibited except as set forth
 * in a written license agreement with Shanghai Jiusi Xinyuan Intelligent Technology Co. Ltd.
 * This material may be covered by one or more patents or pending patent applications.
 */

import { WxAPI } from '../lib/wx/wx.api'
import WeixinShare from './weixin-share'

export default async function WeixinShareWrapper({
  url,
  title,
  desc,
  imgUrl
}: {
  url: string
  title: string
  desc: string
  imgUrl: string
}) {
  const appId = process.env['WX_APP_ID'] as string
  const [signObject, signature] = await WxAPI.sign(url)

  return (
    <WeixinShare
      signObject={signObject}
      signature={signature}
      appId={appId}
      url={url}
      title={title}
      desc={desc}
      imgUrl={imgUrl}
    />
  )
}
