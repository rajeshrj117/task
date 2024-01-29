import React, { useState } from 'react';

const Robot = () => {
  const [position, setPosition] = useState({ x: null, y: null, facing: null });
  const [output, setOutput] = useState('');

  const isValidPlacement = (x, y) => {
    return x >= 0 && x <= 4 && y >= 0 && y <= 4;
  };

  const placeRobot = (x, y, facing) => {
    if (isValidPlacement(x, y)) {
      setPosition({ x, y, facing });
      setOutput(`Placed robot at: ${x},${y},${facing}`);
    } else {
      setOutput('Invalid placement. Robot will fall.');
    }
  };

  const moveRobot = () => {
    const { x, y, facing } = position;

    if (x === null || y === null || facing === null) {
      setOutput('Robot is not properly placed on the table.');
      return;
    }

    let newX = x;
    let newY = y;

    switch (facing) {
      case 'NORTH':
        newY = y + 1;
        break;
      case 'SOUTH':
        newY = y - 1;
        break;
      case 'EAST':
        newX = x + 1;
        break;
      case 'WEST':
        newX = x - 1;
        break;
      default:
        break;
    }

    if (isValidPlacement(newX, newY)) {
      setPosition({ x: newX, y: newY, facing });
      setOutput(`Moved robot to: ${newX},${newY},${facing}`);
    } else {
      setOutput('Invalid move. Robot will fall.');
    }
  };

  const rotateLeft = () => {
    const { facing } = position;
    const directions = ['NORTH', 'WEST', 'SOUTH', 'EAST'];
    const currentIndex = directions.indexOf(facing);

    const newFacing = currentIndex === 0 ? 'WEST' : directions[currentIndex - 1];

    setPosition({ ...position, facing: newFacing });
    setOutput(`Rotated robot left. Now facing: ${newFacing}`);
  };

  const rotateRight = () => {
    const { facing } = position;
    const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    const currentIndex = directions.indexOf(facing);

    const newFacing = currentIndex === 3 ? directions[0] : directions[currentIndex + 1];

    setPosition({ ...position, facing: newFacing });
    setOutput(`Rotated robot right. Now facing: ${newFacing}`);
  };

  const reportPosition = () => {
    const { x, y, facing } = position;
    setOutput(`Current position: ${x !== null ? x : 'Not placed'}, ${y !== null ? y : 'Not placed'}, ${facing !== null ? facing : 'Not placed'}`);
  };

  return (
    <div>
      <div style={{display:'flex',justifyContent:'center',marginTop:'2rem',marginBottom:'1rem'}}>{output}</div>
      <div style={{display:'flex',justifyContent:'center'}}>
      <button onClick={() => placeRobot(0, 0, 'NORTH')}>PLACE 0,0,NORTH</button>
      <button onClick={moveRobot}>MOVE</button>
      <button onClick={rotateLeft}>LEFT</button>
      <button onClick={rotateRight}>RIGHT</button>
      <button onClick={reportPosition}>REPORT</button>
    </div>  </div>
  );
};

export default Robot;
