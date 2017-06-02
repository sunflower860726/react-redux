import React from 'react';
import {connect} from 'react-redux';
import {Router, browserHistory, Link, withRouter} from 'react-router';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

import {CONFIG} from '../../config/index';
import * as _ from 'lodash';
import {notify} from '../../services/index';
import Menu from '../../components/generic/Menu';
import LoadingIcon from '../../components/generic/LoadingIcon';
import AlertNotification from 'components/generic/AlertNotification';
import Header from '../../components/generic/header';

// -----------------------------------------
import * as actions_login from 'appRedux/auth/actions/index';
import * as actions_usersList from 'appRedux/generic/actions/usersList';
import * as actions_policy from 'appRedux/policyDocuments/actions/index';
import * as actions_manageUsers from 'appRedux/manageUsers/actions/manageUsers';
import * as actions_managePayslips from 'appRedux/salary/actions/managePayslips';
import * as actions_getTeamData from '../../actions/admin/teamList';

import UsersList from '../../components/generic/UsersList';

import FormUserProfileDetails from '../../components/manageUsers/FormUserProfileDetails';
import FormUserBankDetails from '../../components/manageUsers/FormUserBankDetails';
import FormUserDeviceDetails from '../../components/manageUsers/FormUserDeviceDetails';
import FormAddNewEmployee from '../../components/manageUsers/FormAddNewEmployee';
import UserPayslipsHistory from 'components/salary/managePayslips/UserPayslipsHistory';
import UpdateEmployeeDocument from '../../components/manageUsers/UpdateEmployeeDocument';

// ---------------------------------------------
import ToggleButton from 'react-toggle-button';

class ManageUsers extends React.Component {
  constructor (props) {
    super(props);

    this.props.onIsAlreadyLogin();

    this.state = {
      status_message: '',
      'defaultUserDisplay': '',
      user_profile_detail: {},
      user_bank_detail: [],
      user_assign_machine: [],
      user_documents: {},
      user_payslip_history: [],
      'openIframe': false,
      username: ''
    };

    this.onUserClick = this.onUserClick.bind(this);
    this.callUpdateUserBankDetails = this.callUpdateUserBankDetails.bind(this);
    this.callUpdateUserDeviceDetails = this.callUpdateUserDeviceDetails.bind(this);
    this.callUpdateUserProfileDetails = this.callUpdateUserProfileDetails.bind(this);
    this.callAddNewEmployee = this.callAddNewEmployee.bind(this);
    this.handleOpenIframe = this.handleOpenIframe.bind(this);
    this.handleCloseIframe = this.handleCloseIframe.bind(this);
    this.changeEmployeeStatus = this.changeEmployeeStatus.bind(this);
  }
  componentWillMount () {
    this.props.onFetchUserPolicyDocument();
    this.props.onUsersList();
    this.props.onFetchTeam();
  }
  componentWillReceiveProps (props) {
    // window.scrollTo(0, 0);

    if (props.logged_user.logged_in == -1) {
      this.props.router.push('/logout');
    } else {
      if (props.logged_user.role == CONFIG.ADMIN || props.logged_user.role == CONFIG.GUEST) {

      } else if (props.logged_user.role == CONFIG.HR) {
        let unread = _.filter(props.policy_documents.policyDocuments, function (o) { return o.read == 0; }) || [];
        if (unread.length > 0) {
          this.props.router.push('/policy_documents');
        }
      } else {
        this.props.router.push('/home');
      }
    }
    this.setState({user_payslip_history: props.managePayslips.user_payslip_history, username: props.manageUsers.username, user_profile_detail: props.manageUsers.user_profile_detail, user_bank_detail: props.manageUsers.user_bank_detail, user_assign_machine: props.manageUsers.user_assign_machine, user_documents: props.manageUsers.user_documents});
  }
  componentDidUpdate () {
    if (this.state.defaultUserDisplay == '') {
      if (this.props.usersList.users.length > 0) {
        let firstUser = this.props.usersList.users[0];
        let defaultUserId = firstUser.user_Id;
        let defaultUserName = firstUser.username;
        this.onUserClick(defaultUserId, defaultUserName);
      }
    }
  }
  onUserClick (userid, username) {
    let selected_user_name = '';
    let selected_user_image = '';
    let selected_user_jobtitle = '';
    let selected_user_id = '';
    // this.setState({username: username})

    if (this.props.usersList.users.length > 0) {
      let userDetails = _.find(this.props.usersList.users, {'user_Id': userid});
      if (typeof userDetails !== 'undefined') {
        selected_user_name = userDetails.name;
        selected_user_image = userDetails.slack_profile.image_192;
        selected_user_jobtitle = userDetails.jobtitle;
        selected_user_id = userDetails.user_Id;
      }
    }
    this.setState({'defaultUserDisplay': userid, 'selected_user_name': selected_user_name, 'selected_user_image': selected_user_image, 'selected_user_jobtitle': selected_user_jobtitle, 'selected_user_id': selected_user_id});
    this.props.onUserProfileDetails(userid, username);
    this.props.onGetUserDocument(userid);
    this.props.onUserManagePayslipsData(userid);
  }

  callUpdateUserBankDetails (new_bank_details) {
    this.props.onUpdateUserBankDetails(new_bank_details).then((data) => {}, (error) => {
      notify(error);
    });
  }
  callUpdateUserDeviceDetails (new_device_details) {
    this.props.onUpdateUserDeviceDetails(new_device_details).then((data) => {}, (error) => {
      notify(error);
    });
  }
  callUpdateUserProfileDetails (new_profile_details) {
    console.log(new_profile_details);
    this.props.onUpdateUserProfileDetails(new_profile_details).then((data) => {}, (error) => {
      notify(error);
    });
  }
  callAddNewEmployee (new_employee_details) {
    this.props.onAddNewEmployee(new_employee_details).then((data) => {
      // on success of adding a new client referch list
      notify(data);
      this.props.onUsersList();
    }, (error) => {
      notify(error);
    });
  }
  changeEmployeeStatus (userid, status) {
    this.props.onChangeEmployeeStatus(userid, status).then(() => {
      this.props.onUsersList().then(() => {
        if (this.props.usersList.users.length > 0) {
          let firstUser = this.props.usersList.users[0];
          let defaultUserId = firstUser.user_Id;
          this.onUserClick(defaultUserId);
        }
      });
    });
  }
  handleOpenIframe () {
    this.setState({openIframe: true});
  };

  handleCloseIframe () {
    this.setState({openIframe: false});
  };
  render () {
    return (
      <div>

        <AlertNotification message={this.props.manageUsers.status_message} />

        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">

          <Header pageTitle={'Manage Employees Profile'} {...this.props} />

          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-md-4 p-b">
                  <FormAddNewEmployee callAddNewEmployee={this.callAddNewEmployee} />
                    </div>

          <div style={{'marginTop': ' 7px'}} className="col-md-4 pull-left">
            <label style={{'float': 'inherit'}}><i className="fa fa-bell-slash fa-lg" aria-hidden="true">
            </i> Slack Notifications</label>
              <div style={{'margin': '0 0 0 10px'}} className='pull-left'>

              <ToggleButton
                value={this.state.user_profile_detail.slack_msg === '0' || false}
                onToggle={() => {
                  let user = this.refs.userForm.state;
                  if (user.slack_msg == '0') user.slack_msg = '1';
                  else if (user.slack_msg == '1') user.slack_msg = '0';
                  this.callUpdateUserProfileDetails(user);
                }} />
              </div>
            </div>

                <div className="col-md-4 text-center"></div>
                <div className="col-md-4 text-right">
                  <button className="btn btn-fw btn-danger" onTouchTap={() => this.changeEmployeeStatus(this.state.selected_user_id, 'Disabled')}>Disable Selected User</button>
                </div>

              </div>
              <div className="row">

                <div className="col-md-2">
                  <UsersList users={this.props.usersList.users} selectedUserId={this.state.selected_user_id} onUserClick={this.onUserClick} {...this.props} />
                </div>

                <div className="col-md-10 p">
                  <div className="row box">
                    <div className="col-md-7 p-t p-b p-r b-r">
                      <FormUserProfileDetails ref="userForm" user_profile_detail={this.state.user_profile_detail} callUpdateUserProfileDetails={this.callUpdateUserProfileDetails} username={this.state.username} {...this.props} />
                    </div>
                    <div className="col-md-5 p-t p-b">
                      <div className="col-md-12">

                        <FormUserBankDetails user_bank_detail={this.state.user_bank_detail} callUpdateUserBankDetails={this.callUpdateUserBankDetails} />
                      </div>
                      <div className="col-md-12">

                        <FormUserDeviceDetails user_assign_machine={this.state.user_assign_machine} callUpdateUserDeviceDetails={this.callUpdateUserDeviceDetails} />
                      </div>
                      <div className="col-md-12">
                        <UpdateEmployeeDocument user_documents={this.state.user_documents} user_id={this.state.selected_user_id} onUpdatedocuments={this.props.onUpdatedocuments} {...this.props} />
                      </div>
                      <div className="col-md-12">
                        <h6 className="text-center">
                          <u>Previous Payslips</u>
                        </h6>
                        <hr />
                        <UserPayslipsHistory user_payslip_history={this.state.user_payslip_history} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    frontend: state.frontend.toJS(),
    managePayslips: state.managePayslips.toJS(),
    logged_user: state.logged_user.toJS(),
    usersList: state.usersList.toJS(),
    manageUsers: state.manageUsers.toJS(),
    policy_documents: state.policyDocuments.toJS(),
    teamList: state.teamList.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions_login.isAlreadyLogin());
    },
    onUsersList: () => {
      return dispatch(actions_usersList.get_users_list());
    },
    onUserProfileDetails: (userid, username) => {
      return dispatch(actions_manageUsers.getUserProfileDetails(userid, username));
    },
    onUpdateUserBankDetails: (new_bank_details) => {
      return dispatch(actions_manageUsers.updateUserBankDetails(new_bank_details));
    },
    onUpdateUserProfileDetails: (new_profile_details) => {
      return dispatch(actions_manageUsers.updateUserProfileDetails(new_profile_details));
    },
    onUpdateUserDeviceDetails: (new_device_details) => {
      return dispatch(actions_manageUsers.updateUserDeviceDetails(new_device_details));
    },
    onAddNewEmployee: (new_employee_details) => {
      return dispatch(actions_manageUsers.addNewEmployee(new_employee_details));
    },
    onUpdatedocuments: (document_link) => {
      return dispatch(actions_manageUsers.updateDocument(document_link));
    },
    onChangeEmployeeStatus: (userid, status) => {
      return dispatch(actions_manageUsers.changeEmployeeStatus(userid, status));
    },
    onGetUserDocument: (userid) => {
      return dispatch(actions_manageUsers.getUserDocument(userid));
    },
    onDeleteDocument: (doc_id) => {
      return dispatch(actions_manageUsers.deleteDocument(doc_id));
    },
    onUserManagePayslipsData: (userid) => {
      return dispatch(actions_managePayslips.get_user_manage_payslips_data(userid));
    },
    onFetchUserPolicyDocument: () => {
      return dispatch(actions_policy.fetchUserPolicyDocument());
    },
    onFetchTeam: () => {
      return dispatch(actions_getTeamData.get_all_team());
    }
  };
};

const VisibleManageUsers = connect(mapStateToProps, mapDispatchToProps)(ManageUsers);

const RouterVisibleManageUsers = withRouter(VisibleManageUsers);

export default RouterVisibleManageUsers;
