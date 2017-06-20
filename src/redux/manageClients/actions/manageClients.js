import { createAction } from 'redux-actions';
import {fireAjax} from 'src/services/index';
import * as constants from 'appRedux/constants';
import {show_loading, hide_loading} from 'appRedux/generic/actions/frontend';

export function successClientDetails (data) {
  return createAction(constants.ACTION_SUCCESS_CLIENT_DETAILS)(data);
}
export function emptyClientDetails (data) {
  return createAction(constants.ACTION_EMPTY_CLIENT_DETAILS)(data);
}
export function errorClientDetails (data) {
  return createAction(constants.ACTION_ERROR_CLIENT_DETAILS)(data);
}

function asyncGetClientDetails (clientid) {
  return fireAjax('POST', '', {
    'action': 'get_client_detail',
    'client_id': clientid
  });
}

export function getClientDetails (clientid) {
  return function (dispatch, getState) {
    return new Promise((reslove, reject) => {
      dispatch(show_loading());
      asyncGetClientDetails(clientid).then(
				(json) => {
          dispatch(hide_loading());
          if (json.error === 0) {
            dispatch(successClientDetails(json.data));
          } else {
            dispatch(emptyClientDetails(json.data.message));
          }
        },
        (error) => {
          dispatch(hide_loading());
          dispatch(errorClientDetails('error occurs!!!'));
        }
			);
    });
  };
}

export function success_add_new_client (data) {
  return createAction(constants.ACTION_SUCCESS_ADD_NEW_CLIENT)(data);
}
export function error_add_new_client (data) {
  return createAction(constants.ACTION_ERROR_ADD_NEW_CLIENT)(data);
}

function async_add_new_client (n_client_name, n_client_address) {
  return fireAjax('POST', '', {
    'action': 'create_new_client',
    'name': n_client_name,
    'address': n_client_address
  });
}

export function addNewClient (new_client_details) {
  return function (dispatch, getState) {
    let n_client_name = '';
    let n_client_address = '';

    if (typeof new_client_details.client_name !== 'undefined') {
      n_client_name = new_client_details.client_name;
    }
    if (typeof new_client_details.client_address !== 'undefined') {
      n_client_address = new_client_details.client_address;
    }

    if (n_client_name === '') { return Promise.reject('Client name is empty'); }
    if (n_client_address === '') { return Promise.reject('Client Address is empty'); }

    return new Promise((reslove, reject) => {
      dispatch(show_loading());
      async_add_new_client(n_client_name, n_client_address).then(
				(json) => {
          dispatch(hide_loading());
          if (json.error == 0) {
            dispatch(success_add_new_client(json.data.message));
            reslove(1);
          } else {
            dispatch(error_add_new_client(json.data.message));
            reslove(0);
          }
        },
				(error) => {
          dispatch(hide_loading());
          dispatch(error_add_new_client('error occurs!!!'));
          reslove(0);
        }
			);
    });
  };
}

export function success_update_client_details (data) {
  return createAction(constants.ACTION_SUCCESS_UPDATE_CLIENT_DETAILS)(data);
}
export function error_update_client_details (data) {
  return createAction(constants.ACTION_ERROR_UPDATE_CLIENT_DETAILS)(data);
}

function async_update_client_details (n_client_id, n_client_name, n_client_address) {
  return fireAjax('POST', '', {
    'action': 'update_client_details',
    'client_id': n_client_id,
    'name': n_client_name,
    'address': n_client_address
  });
}

export function update_client_details (new_client_details) {
  return function (dispatch, getState) {
    let n_client_id = '';
    let n_client_name = '';
    let n_client_address = '';

    if (typeof new_client_details.client_id !== 'undefined') {
      n_client_id = new_client_details.client_id;
    }
    if (typeof new_client_details.client_name !== 'undefined') {
      n_client_name = new_client_details.client_name;
    }
    if (typeof new_client_details.client_address !== 'undefined') {
      n_client_address = new_client_details.client_address;
    }

    if (n_client_id === '') { return Promise.reject('Client id is empty'); }
    if (n_client_name === '') { return Promise.reject('Client name is empty'); }
    if (n_client_address === '') { return Promise.reject('Client Address is empty'); }

    return new Promise((reslove, reject) => {
      dispatch(show_loading());
      async_update_client_details(n_client_id, n_client_name, n_client_address).then(
				(json) => {
          dispatch(hide_loading());
          if (json.error == 0) {
            dispatch(success_update_client_details(json.data.message));
            reslove(n_client_id);
		 			} else {
		 				dispatch(ACTION_ERROR_UPDATE_CLIENT_DETAILS(json.data.message));
		 				reslove(0);
		 			}
        },
				(error) => {
          dispatch(hide_loading());
          dispatch(ACTION_ERROR_UPDATE_CLIENT_DETAILS('error occurs!!!'));
          reslove(0);
        }
			);
    });
  };
}

export function success_create_client_invoice (data) {
  return createAction(constants.ACTION_SUCCESS_CREATE_CLIENT_INVOICE)(data);
}
export function error_create_client_invoice (data) {
  return createAction(constants.ACTION_ERROR_CREATE_CLIENT_INVOICE)(data);
}

function async_create_client_invoice (n_client_id, n_client_name, n_client_address, n_currency, n_items, n_sub_total, n_service_tax, n_total_amount, n_due_date) {
  return fireAjax('POST', '', {
    'action': 'create_client_invoice',
    'client_id': n_client_id,
    'client_name': n_client_name,
    'client_address': n_client_address,
    'currency': n_currency,
    'items': n_items,
    'sub_total': n_sub_total,
    'service_tax': n_service_tax,
    'total_amount': n_total_amount,
    'due_date': n_due_date
  });
}

export function create_client_invoice (new_client_invoice_details) {
  return function (dispatch, getState) {
    let n_client_id = '';
    let n_client_name = '';
    let n_client_address = '';
    let n_currency = '';
    let n_items = '';
    let n_sub_total = '';
    let n_service_tax = '';
    let n_total_amount = '';
    let n_due_date = '';

    if (typeof new_client_invoice_details.client_id !== 'undefined') {
      n_client_id = new_client_invoice_details.client_id;
    }
    if (typeof new_client_invoice_details.client_name !== 'undefined') {
      n_client_name = new_client_invoice_details.client_name;
    }
    if (typeof new_client_invoice_details.client_address !== 'undefined') {
      n_client_address = new_client_invoice_details.client_address;
    }
    if (typeof new_client_invoice_details.currency !== 'undefined') {
      n_currency = new_client_invoice_details.currency;
    }
    if (typeof new_client_invoice_details.items !== 'undefined') {
      n_items = new_client_invoice_details.items;
    }
    if (typeof new_client_invoice_details.sub_total !== 'undefined') {
      n_sub_total = new_client_invoice_details.sub_total;
    }
    if (typeof new_client_invoice_details.service_tax !== 'undefined') {
      n_service_tax = new_client_invoice_details.service_tax;
    }
    if (typeof new_client_invoice_details.total_amount !== 'undefined') {
      n_total_amount = new_client_invoice_details.total_amount;
    }
    if (typeof new_client_invoice_details.due_date !== 'undefined') {
      n_due_date = new_client_invoice_details.due_date;
    }

    if (n_client_id === '') { return Promise.reject('Client id is empty'); }
    if (n_client_name === '') { return Promise.reject('Client name is empty'); }
    if (n_client_address === '') { return Promise.reject('Client Address is empty'); }
    if (n_currency === '') { return Promise.reject('Currency is empty'); }
    if (n_items === '') { return Promise.reject('Invoice Item is empty'); }
    if (n_sub_total === '') { return Promise.reject('Sub total is empty'); }
    if (n_service_tax === '') { return Promise.reject('Service tax is empty'); }
    if (n_total_amount === '') { return Promise.reject('Total amount is empty'); }
    if (n_due_date === '') { return Promise.reject('Due date is empty'); }

    return new Promise((reslove, reject) => {
      dispatch(show_loading());
      async_create_client_invoice(n_client_id, n_client_name, n_client_address, n_currency, n_items, n_sub_total, n_service_tax, n_total_amount, n_due_date).then(
				(json) => {
          dispatch(hide_loading());
          if (json.error === 0) {
            dispatch(success_add_new_client(json.data.message));
            reslove(n_client_id);
		 			} else {
		 				dispatch(error_add_new_client(json.data.message));
		 				reslove(0);
		 			}
        },
				(error) => {
          dispatch(hide_loading());
          dispatch(error_add_new_client('error occurs!!!'));
          reslove(0);
        }
			);
    });
  };
}

export function success_delete_invoice_delete (data) {
  return createAction(constants.ACTION_SUCCESS_INVOICE_DELETE)(data);
}
export function error_delete_invoice_delete (data) {
  return createAction(constants.ACTION_ERROR_INVOICE_DELETE)(data);
}

function async_delete_invoice (invoice_id) {
  return fireAjax('POST', '', {
    'action': 'delete_invoice',
    'invoice_id': invoice_id
  });
}

export function delete_invoice (invoice_id) {
  return function (dispatch, getState) {
    let n_invoice_id = '';
    if (typeof invoice_id !== 'undefined') {
      n_invoice_id = invoice_id;
    }
    if (n_invoice_id === '') { return Promise.reject('Invoice id is empty'); }

    return new Promise((reslove, reject) => {
      dispatch(show_loading());
      async_delete_invoice(invoice_id).then(
				(json) => {
          dispatch(hide_loading());
          if (json.error == 0) {
            dispatch(success_delete_invoice_delete(json.data.message));
            reslove(1);
		 			} else {
		 				dispatch(error_delete_invoice_delete(json.data.message));
		 				reslove(0);
		 			}
        },
				(error) => {
          dispatch(hide_loading());
          dispatch(error_delete_invoice_delete('error occurs!!!'));
          reslove(0);
        }
			);
    });
  };
}
