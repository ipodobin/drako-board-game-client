import React, { useEffect, useRef } from 'react';
import styles from './Game.module.css';
import {useParams} from 'react-router-dom'
import Board from '../Board/Board';
import { useDispatch } from 'react-redux'
import { initGame } from '../../features/gameStateSlice.js';

const Game = () => {
  const {gameId, username} = useParams();
  const socket = useRef();
  const dispatch = useDispatch()

  useEffect(() => {
    if(!socket.current){
      socket.current = new WebSocket("ws://localhost:8080/game/" + gameId + "?username=" + username);
      socket.current.onopen = function(e) {
          console.log("[open] Connection established");
      };
      socket.current.onmessage = function(event) {
        console.log(`[message] Data received from server: ${event.data}`);
        let object = JSON.parse(event.data);
        switch(object._type) {
          case 'init':
            dispatch(initGame(object.state));
            break;
          default:
            console.log('action not supported | ', object._type);
            break;
        }
      };  
      socket.onclose = function(event) {
          if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
          } else {
            console.log('[close] Connection died');
          }
      };  
      socket.current.onerror = function(error) {
        console.log(`[error] ${error.message}`);
      };
    }
  });

  return (
  <div className={styles.Game}>
    <Board/>
  </div>
  );
};

Game.propTypes = {};

Game.defaultProps = {};

export default Game;
