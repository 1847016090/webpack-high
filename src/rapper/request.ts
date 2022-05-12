/* md5: 30ab226b94461f8da7f1978ca615f45b */
/* Rap仓库id: 302382 */
/* Rapper版本: 1.3.1 */
/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

/**
 * 本文件由 Rapper 同步 Rap 平台接口，自动生成，请勿修改
 * Rap仓库 地址: http://rap2.taobao.org/repository/editor?id=302382
 */

import * as commonLib from 'rap/runtime/commonLib'

export interface IModels {
  /**
   * 接口名：示例接口
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302382&mod=510629&itf=2262481
   */
  'GET/example/1652324045668': {
    Req: {
      /**
       * 请求属性示例
       */
      foo?: string
    }
    Res: {
      /**
       * 字符串属性示例
       */
      string: string
      /**
       * 数字属性示例
       */
      number: number
      /**
       * 布尔属性示例
       */
      boolean: boolean
      /**
       * 正则属性示例
       */
      regexp: string
      /**
       * 函数属性示例
       */
      function: string
      /**
       * 数组属性示例
       */
      array: {
        /**
         * 数组元素示例
         */
        foo: number
        /**
         * 数组元素示例
         */
        bar: string
      }[]
      /**
       * 自定义数组元素示例
       */
      items: any[]
      /**
       * 对象属性示例
       */
      object: {
        /**
         * 对象属性示例
         */
        foo: number
        /**
         * 对象属性示例
         */
        bar: string
      }
      /**
       * 占位符示例
       */
      placeholder: string
    }
  }

  /**
   * 接口名：获取用户数据
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=302382&mod=510629&itf=2262483
   */
  'GET/getUserList': {
    Req: {}
    Res: {
      list: {
        name: string
        age: number
        gender: string
      }[]
    }
  }
}

type ResSelector<T> = T

export interface IResponseTypes {
  'GET/example/1652324045668': ResSelector<IModels['GET/example/1652324045668']['Res']>
  'GET/getUserList': ResSelector<IModels['GET/getUserList']['Res']>
}

export function createFetch(fetchConfig: commonLib.RequesterOption, extraConfig?: {fetchType?: commonLib.FetchType}) {
  // if (!extraConfig || !extraConfig.fetchType) {
  //   console.warn('Rapper Warning: createFetch API will be deprecated, if you want to customize fetch, please use overrideFetch instead, since new API guarantees better type consistency during frontend lifespan. See detail https://www.yuque.com/rap/rapper/overridefetch')
  // }
  const rapperFetch = commonLib.getRapperRequest(fetchConfig)

  return {
    /**
     * 接口名：示例接口
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302382&mod=510629&itf=2262481
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/example/1652324045668': (req?: IModels['GET/example/1652324045668']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/example/1652324045668',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/example/1652324045668']>
    },

    /**
     * 接口名：获取用户数据
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=302382&mod=510629&itf=2262483
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/getUserList': (req?: IModels['GET/getUserList']['Req'], extra?: commonLib.IExtra) => {
      return rapperFetch({
        url: '/getUserList',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/getUserList']>
    },
  }
}
