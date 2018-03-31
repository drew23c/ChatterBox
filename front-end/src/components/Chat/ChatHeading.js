import React from 'react';
import FAVideo from 'react-icons/lib/fa/video-camera'
import FAUserPlus from 'react-icons/lib/fa/user-plus'
import MdEllipsisMenu from 'react-icons/lib/md/keyboard-control'
import MdEject from 'react-icons/lib/md/eject'

export default function({name, numberOfUsers, usersOnline, logout, user, show}) {
	return (
		<div className="chat-header">
			<div className="user-info">
				<div className="user-name">{name}</div>
				<div className="users-online"><b>{usersOnline}</b></div>
				<div className="status">
					<div className="indicator"></div>
					<span>{numberOfUsers ? numberOfUsers : null}</span>
				</div>
			</div>
			<div className="user-show" id="userShow">{show}</div>
			<div>
			<div onClick={()=>{logout()}} title="Logout" className="logout">
			<MdEject/>	
		</div>
			</div>
		</div>
	);
	
}
