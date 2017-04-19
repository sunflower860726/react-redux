import {createAction} from 'redux-actions'
import {CONFIG} from '../../config/index'
import * as _ from 'lodash'
import {fireAjax} from '../../services/index'
import {show_loading, hide_loading} from '../generic/frontend'
var moment = require('moment')

// -------add New machine
export const ACTION_SUCCESS_ADD_NEW_MACHINE = 'ACTION_SUCCESS_ADD_NEW_MACHINE'
export const ACTION_ERROR_ADD_NEW_MACHINE = 'ACTION_ERROR_ADD_NEW_MACHINE'

export function success_add_new_machine (data) {
  return createAction(ACTION_SUCCESS_ADD_NEW_MACHINE)(data)
}

export function error_add_new_machine (data) {
  return createAction(ACTION_ERROR_ADD_NEW_MACHINE)(data)
}

function async_addNewMachine (n_machine_type, n_machine_name, n_machine_price, n_serial_no, n_purchase_date, n_mac_address, n_operating_system, n_status, n_comment) {
  return fireAjax('POST', '', {
    'action': 'add_office_machine',
    'machine_type': n_machine_type,
    'machine_name': n_machine_name,
    'machine_price': n_machine_price,
    'serial_no': n_serial_no,
    'purchase_date': n_purchase_date,
    'mac_address': n_mac_address,
    'operating_system': n_operating_system,
    'status': n_status,
    'comment': n_comment
  })
}

export function addNewMachine (new_machine_details) {
  return function (dispatch, getState) {
    let n_machine_type = ''
    let n_machine_name = ''
    let n_machine_price = ''
    let n_serial_no = ''
    let n_purchase_date = ''
    let n_mac_address = ''
    let n_operating_system = ''
    let n_status = ''
    let n_comment = ''

    if (typeof new_machine_details.machine_type === 'undefined' || new_machine_details.machine_type == '') {
      return Promise.reject('Machine Type is empty')
    } else {
      n_machine_type = new_machine_details.machine_type
    }

    if (typeof new_machine_details.machine_name === 'undefined' || new_machine_details.machine_name == '') {
      return Promise.reject('Machine Name is empty')
    } else {
      n_machine_name = new_machine_details.machine_name
    }

    if (typeof new_machine_details.machine_price === 'undefined' || new_machine_details.machine_price == '') {
      return Promise.reject('Machine Price is empty')
    } else {
      n_machine_price = new_machine_details.machine_price
    }

    if (typeof new_machine_details.serial_no === 'undefined' || new_machine_details.serial_no == '') {
      return Promise.reject('Serial Number is empty')
    } else {
      n_serial_no = new_machine_details.serial_no
    }

    if (typeof new_machine_details.purchase_date === 'undefined' || new_machine_details.purchase_date === '') {
      return Promise.reject('Date of Purchase is empty')
    } else {
      n_purchase_date = new_machine_details.purchase_date
    }
    if (new_machine_details.machine_type === 'Keyboard' || new_machine_details.machine_type == 'Mouse') {
      n_mac_address = new_machine_details.mac_address
    } else {
      if (typeof new_machine_details.mac_address === 'undefined' || new_machine_details.mac_address === '') {
        return Promise.reject('Mac Address is empty')
      } else {
        n_mac_address = new_machine_details.mac_address
      }
    }

    if (typeof new_machine_details.operating_system === 'undefined') {
      return Promise.reject('Operating System is empty')
    } else {
      n_operating_system = new_machine_details.operating_system
    }

    if (typeof new_machine_details.status === 'undefined' || new_machine_details.status == '') {
      return Promise.reject('Status is empty')
    } else {
      n_status = new_machine_details.status
    }

    if (typeof new_machine_details.comment === 'undefined' || new_machine_details.comment == '') {
      return Promise.reject('comment is empty')
    } else {
      n_comment = new_machine_details.comment
    }

    return new Promise((resolve, reject) => {
      dispatch(show_loading())
      async_addNewMachine(n_machine_type, n_machine_name, n_machine_price, n_serial_no, n_purchase_date, n_mac_address, n_operating_system, n_status, n_comment).then((json) => {
        dispatch(hide_loading())
        console.log(json)
        if (json.error === 0) {
          // console.log(json, '----action wala-----')
          dispatch(success_add_new_machine(json.message))
          resolve(json.message)
        } else {
          dispatch(error_add_new_machine(json.message))
          reject(json.message)
        }
      }, (error) => {
        dispatch(hide_loading())
        dispatch(error_add_new_machine('error occurs!!!'))
        reject('error occurs!!!')
      })
    })
  }
}

// Get Devicelist

export const ACTION_SUCCESS_DEVICE_LIST = 'ACTION_SUCCESS_DEVICE_LIST'
export const ACTION_EMPTY_DEVICE_LIST = 'ACTION_EMPTY_DEVICE_LIST'
export const ACTION_ERROR_DEVICE_LIST = 'ACTION_ERROR_DEVICE_LIST'

export function success_device_list (data) {
  return createAction(ACTION_SUCCESS_DEVICE_LIST)(data)
}

export function empty_device_list (data) {
  return createAction(ACTION_EMPTY_DEVICE_LIST)(data)
}

export function error_device_list (data) {
  return createAction(ACTION_ERROR_DEVICE_LIST)(data)
}

function async_get_AllDevice () {
  return fireAjax('POST', '', {'action': 'get_machines_detail'})
}

export function get_machines_detail () {
  return function (dispatch, getState) {
    return new Promise((resolve, reject) => {
      dispatch(show_loading()) // show loading icon
      async_get_AllDevice().then((json) => {
        dispatch(hide_loading()) // hide loading icon
        if (json.error == 0) {
          dispatch(success_device_list(json.data))
          resolve(json.data)
        } else {
          dispatch(empty_device_list([]))
        }
      }, (error) => {
        dispatch(hide_loading()) // hide loading icon
        dispatch(error_device_list([]))
      })
    })
  }
}

export const ACTION_SUCCESS_GET_DEVICELIST = 'ACTION_SUCCESS_GET_DEVICELIST'

export function success_getDevice (data) {
  return createAction(ACTION_SUCCESS_GET_DEVICELIST)(data)
}

function getAsync_getDeviceById (id) {
  return fireAjax('POST', '', {
    'action': 'get_machine',
    'id': id
  })
}

export function getDeviceById (id) {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading())
      return getAsync_getDeviceById(id).then((res) => {
        dispatch(hide_loading())
        console.log(res)
        if (res.data) {
          resolve(res.data)
          dispatch(success_getDevice(res.data))
        }
      }, (error) => {
        dispatch(hide_loading())
        reject(error)
      })
    })
  }
}

export const ACTION_SUCCESS_UPDATE_DEVICELIST = 'ACTION_SUCCESS_UPDATE_DEVICELIST'

export function success_updateDevice (data) {
  return createAction(ACTION_SUCCESS_UPDATE_DEVICELIST)(data)
}

function getAsync_updateDeviceById (deviceId, data) {
  return fireAjax('POST', '', {
    'action': 'update_office_machine',
    'id': deviceId,
    'machine_type': data.machine_type,
    'machine_name': data.machine_name,
    'machine_price': data.machine_price,
    'serial_no': data.serial_no,
    'purchase_date': data.purchase_date,
    'mac_address': data.mac_address,
    'operating_system': data.operating_system,
    'status': data.status,
    'comment': data.comment
  })
}

export function updateDevice (id, data) {
  console.log(id, '//////////////')
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading())
      return getAsync_updateDeviceById(id, data).then((res) => {
        dispatch(hide_loading())
        if (res.error === 0) {
          dispatch(success_updateDevice(res.message))
          resolve(res.message)
        }
      }, (error) => {
        dispatch(hide_loading())
        reject(error)
      })
    })
  }
}

export const ACTION_SUCCESS_DELETE_DEVICELIST = 'ACTION_SUCCESS_DELETE_DEVICELIST'

export function success_deleteDevice (data) {
  return createAction(ACTION_SUCCESS_DELETE_DEVICELIST)(data)
}

function getAsync_deleteDeviceById (deviceId) {
  return fireAjax('POST', '', {
    'action': 'remove_machine_detail',
    'id': deviceId
  })
}

export function deleteDevice (id) {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading())
      return getAsync_deleteDeviceById(id).then((res) => {
        dispatch(hide_loading())
        if (res.error === 0) {
          dispatch(success_deleteDevice(res.message))
          resolve(res.message)
        }
      }, (error) => {
        dispatch(hide_loading())
        reject(error)
      })
    })
  }
}

export const ACTION_SUCCESS_ASSIGN_DEVICE = 'ACTION_SUCCESS_ASSIGN_DEVICE'
export const ACTION_ERROR_ASSIGN_DEVICE = 'ACTION_ERROR_ASSIGN_DEVICE'

export function success_assignDevice (data) {
  return createAction(ACTION_SUCCESS_ASSIGN_DEVICE)(data)
}

export function error_assignDevice (data) {
  return createAction(ACTION_ERROR_ASSIGN_DEVICE)(data)
}

function getAsync_assignDeviceToUser (deviceId, userId) {
  console.log(deviceId, '-----------------')
  return fireAjax('POST', '', {
    'action': 'assign_user_machine',
    'machine_id': deviceId,
    'user_id': userId
  })
}

export function assignDevice (deviceId, id) {
  return (dispatch, getState) => {
    return new Promise(function (resolve, reject) {
      dispatch(show_loading())
      return getAsync_assignDeviceToUser(deviceId, id).then((res) => {
        dispatch(hide_loading())
        resolve(res.message)
        // if (res.error === 0) {
        //   // dispatch(success_assignDevice(res.message))
        //   resolve(res.message)
        // } else {
        //   // dispatch(error_assignDevice(res.message))
        //   reject(res.message)
        // }
      }, (error) => {
        dispatch(hide_loading())
        dispatch(error_assignDevice('error occurs!!!'))
        reject('error occurs!!!')
      })
    })
  }
}
