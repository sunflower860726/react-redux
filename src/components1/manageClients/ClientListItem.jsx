import React from 'react';
import PropTypes from 'prop-types';

const ClientListItem = ({ client, selectedClientId, onClientClick }) => {
  let clientName = client.name;
  let fcName = client.name.charAt(0);
  let backgroundClass = {'cursor': 'pointer'};
  if (selectedClientId === client.id) {
    backgroundClass = {'background': '#03a9f4', 'color': 'white'};
  }
  return (
    <li className="list-item" onClick={() => onClientClick(client.id)} style={backgroundClass}>
      <div className="list-left">
        <span className="w-40 r-2x _600 text-lg accent">
          {fcName}
        </span>
      </div>
      <div className="list-body">
        <div>{clientName}</div>
        <small className="text-muted text-ellipsis"></small>
      </div>
    </li>
  );
};

export default ClientListItem;

ClientListItem.styles = {
  cursorPointer: {'cursor': 'pointer'},
  selectedUser: {'background': '#03a9f4', 'color': 'white'}
};

ClientListItem.PropTypes = {
  client: PropTypes.object.isRequired,
  clientName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fcName: PropTypes.string.isRequired,
  backgroundClass: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  selectedClientId: PropTypes.string.isRequired
};
