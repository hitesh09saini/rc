import React, { useState } from 'react';

function App() {
  const [device, setDevice] = useState(null);
  const [characteristic, setCharacteristic] = useState(null);


  const connectToDevice = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
      });

      const server = await device.gatt.connect();
      const characteristic = await server.getPrimaryService('serial').getCharacteristic('tx');

      setDevice(device);
      setCharacteristic(characteristic);
    } catch (error) {
      console.error('Error connecting to device:', error);
    }
  };



  const sendCommand = async (command) => {
    try {
      await characteristic.writeValue(new TextEncoder().encode(command));
    } catch (error) {
      console.error('Error sending command:', error);
    }
  };

  return (
    <div className="App">
      <h1>Bluetooth RC Car Control</h1>
      <button onClick={connectToDevice}>Connect to RC Car</button>

      {device && (
        <>
          <div>
            <button onClick={() => sendCommand('F')}>Forward</button>
            <button onClick={() => sendCommand('B')}>Backward</button>
          </div>

          <div>
            <button onClick={() => sendCommand('L')}>Left</button>
            <button onClick={() => sendCommand('R')}>Right</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
