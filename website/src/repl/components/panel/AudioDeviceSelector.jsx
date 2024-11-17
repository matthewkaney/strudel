import { useState } from 'react';
import { getAudioDevices, setAudioDevice } from '../../util.mjs';
import { SelectInput } from './Forms';

const initdevices = new Map();

// Allows the user to select an audio interface for Strudel to play through
export function AudioDeviceSelector({ audioDeviceName, onChange, isDisabled }) {
  const [devices, setDevices] = useState(initdevices);
  const devicesInitialized = devices.size > 0;

  const onClick = () => {
    if (devicesInitialized) {
      return;
    }
    getAudioDevices().then((devices) => {
      setDevices(devices);
    });
  };
  const onDeviceChange = (deviceName) => {
    if (!devicesInitialized) {
      return;
    }
    const deviceID = devices.get(deviceName);
    onChange(deviceName);
    setAudioDevice(deviceID);
  };
  const options = new Map();
  Array.from(devices.keys()).forEach((deviceName) => {
    options.set(deviceName, deviceName);
  });
  return (
    <SelectInput
      label="Audio Output Device"
      isDisabled={isDisabled}
      options={options}
      onClick={onClick}
      value={audioDeviceName}
      onChange={onDeviceChange}
    />
  );
}
