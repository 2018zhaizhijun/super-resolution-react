import { performLogin, performLogout } from '@components/login/store' // 待测试的action路径
import * as actionTypes from '@components/login/store/actionTypes';
import configureMockStore from 'redux-mock-store'// 模拟store
import thunk from 'redux-thunk'
import MockAdapter from 'axios-mock-adapter' // axios官方提供的mock拦截适配器
import axiosInstance from '@service/request' // action对应使用的请求实例

// store通过middleware进行模拟
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
// 对需要mock拦截的axios实例创建mock adapter
let axiosMock = new MockAdapter(axiosInstance)

describe('actions about login and logout', () => {
    it('should be done with right return of performLogin', () => {
        // mock数据
        const mockLoginData = {
          'statusCode': 200,
          'errmsg': '成功',
          'data': {
            'token': 'mockToken'
          }
        }
        const mockProfileData = {
          'statusCode': 200,
          'errmsg': '成功',
          'data': {
              'avatar': 'mockUrl',
              'trueName': 'zz',
              'sex': 1,
          }
        }
        // 使用axios mock拦截指定请求，并返回相关数据
        axiosMock.onGet('/user/login/password').reply(200, mockLoginData)
        axiosMock.onGet('/user/info').reply(200, mockProfileData)
        // 期望请求成功后redux的action变化，用于测试匹配
        const data = mockProfileData.data;
        const mockLoginAction = [
            { type: actionTypes.CHANGE_LOGIN_STATE, payload: true },
            { type: actionTypes.CHANGE_TOKEN, payload: mockLoginData.data.token },
            { type: actionTypes.CHANGE_IS_VISIBLE, payload: false },
            { type: actionTypes.CHANGE_PROFILE, payload: {
                avatarUrl: data.avatar,
                usrname: data.trueName,
                telephone: '12345678910',
                sex: data.sex,
            }}
        ]
        const store = mockStore({})
        // return返回一个promise对象，告诉jest这是一个异步测试
        return store.dispatch(performLogin('12345678910', '123abc'))
        .then(() => {
            // 使用toContainEqual判断数组中是否有匹配的action
            // https://jestjs.io/docs/en/expect#tocontainitem
            expect(store.getActions()).toEqual(mockLoginAction)
        })
    })

    it('should be done with right return of performLogout', () => {
        const mockLogoutData = {
          'statusCode': 200,
          'errmsg': '成功',
          'data': {}
        }
        
        axiosMock.onGet('/user/logout').reply(200, mockLogoutData)
        const mockLogoutAction = [{ type: actionTypes.CHANGE_LOGIN_STATE, payload: false }]
        const store = mockStore({})
        return store.dispatch(performLogout()).then(() => {
            expect(store.getActions()).toEqual(mockLogoutAction)
        })
    })
})