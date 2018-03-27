import React from 'react';
import FAVideo from 'react-icons/lib/fa/video-camera'
import FAUserPlus from 'react-icons/lib/fa/user-plus'
import MdEllipsisMenu from 'react-icons/lib/md/keyboard-control'
<<<<<<< HEAD

export default function({name, numberOfUsers, usersOnline}) {
	
	return (
		<div className="chat-header">
			<div className="user-info">
				<div className="user-name">{name}</div>{" "}
=======
import MdEject from 'react-icons/lib/md/eject'

export default function({name, numberOfUsers, usersOnline, logout}) {
	return (
		<div className="chat-header">
			<div className="user-info">
				<div className="user-name">{name}</div>
>>>>>>> 59c4ec94fc297ea86285d56631060cc4587cba83
				<div className="users-online"><b>{usersOnline}</b></div>
				<div className="status">
					<div className="indicator"></div>
					<span>{numberOfUsers ? numberOfUsers : null}</span>
				</div>
			</div>
<<<<<<< HEAD
			<div className="options">
				<FAVideo />
				<FAUserPlus />
				<MdEllipsisMenu />
=======
			<div>
			<div onClick={()=>{logout()}} title="Logout" className="logout">
			<MdEject/>	
		</div>
>>>>>>> 59c4ec94fc297ea86285d56631060cc4587cba83
			</div>
		</div>
	);
	
}
