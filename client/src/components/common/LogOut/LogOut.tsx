import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../store/users';

function LogOut(): JSX.Element {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(logOut());
	}, []);

	return (
		<h1>Logout</h1>
	)
}

export default LogOut
