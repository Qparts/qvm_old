import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialize, updateCurrentSocket } from 'src/redux/slices/authJwt';
import { io } from "socket.io-client"
import { updateOnlineUsers, updateRecivedMessages } from 'src/redux/slices/chat';

// ----------------------------------------------------------------------

JwtProvider.propTypes = {
  children: PropTypes.node
};

function JwtProvider({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authJwt);
  const socket = useRef(io("http://localhost:8900"));


  useEffect(() => {
    dispatch(getInitialize());
    dispatch(updateCurrentSocket(socket));
  }, [dispatch]);

  useEffect(() => {
    if (user != null && user.subscriber != null) {
      console.log("init app.");
      socket.current.emit("addUser", user.subscriber.id);
      socket.current.on("getUsers", users => {
        console.log("current users", users);
        dispatch(updateOnlineUsers(users));

      });
    }
    else {
      console.log("destroy app.");
      socket.current.emit("removeUser");
      socket.current.on("getUsers", users => {
        // console.log("current users login", users);
        dispatch(updateOnlineUsers(users));
      });
    }

  }, [user]);

  return <>{children}</>;
}

export default JwtProvider;
