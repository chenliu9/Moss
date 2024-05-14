/*
 * Copyright 2021-Present Shanghai Jiusi Xinyuan Intelligent Technology Co. Ltd (www.txz.tech). All Rights Reserved.
 * This material, including without limitation any software, is the confidential trade secret and proprietary
 * information of Shanghai Jiusi Xinyuan Intelligent Technology Co. Ltd and its licensors.
 * Reproduction, use and/or distribution of this material in any form is strictly prohibited except as set forth
 * in a written license agreement with Shanghai Jiusi Xinyuan Intelligent Technology Co. Ltd.
 * This material may be covered by one or more patents or pending patent applications.
 */

import CryptoJS from 'crypto-js'

export class WxAPI {
  private static cacheToken: string = ''
  private static tokenExpire: number = 0
  public static async getToken() {
    if (600 > this.tokenExpire - Date.now()) return this.refreshToken()
    else return this.cacheToken
  }

  private static async refreshToken() {
    const appId = process.env['WX_APP_ID']
    const appSecret = process.env['WX_APP_SECRET']
    const fetchResponse = await fetch(
      `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`,
      {
        method: 'GET',
        mode: 'no-cors'
      }
    )
    const response = await fetchResponse.json()

    this.cacheToken = response.access_token
    this.tokenExpire = Date.now() + response.expires_in * 1000
    return this.cacheToken
  }

  private static cacheTicket: string = ''
  private static ticketExpire: number = 0
  public static async getTicket() {
    if (600 > this.ticketExpire - Date.now()) return this.refreshTicket()
    else return this.cacheTicket
  }

  private static async refreshTicket() {
    const fetchResponse = await fetch(
      `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${await this.getToken()}&type=jsapi`,
      {
        method: 'GET',
        mode: 'no-cors'
      }
    )
    const response = await fetchResponse.json()

    this.cacheTicket = response.ticket
    this.ticketExpire = Date.now() + response.expires_in * 1000
    return this.cacheTicket
  }

  public static async sign(
    url: string
  ): Promise<[Record<string, any>, string]> {
    const signObject: Record<string, any> = {
      jsapi_ticket: await this.getTicket(),
      noncestr: CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Base64),
      timestamp: (Date.now() / 1000).toFixed(),
      url
    }

    const signature = CryptoJS.SHA1(
      Object.keys(signObject)
        .map(v => `${v}=${signObject[v]}`)
        .join('&')
    ).toString(CryptoJS.enc.Hex)

    return [signObject, signature]
  }
}
