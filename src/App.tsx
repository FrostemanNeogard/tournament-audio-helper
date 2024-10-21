import { SyntheticEvent, useEffect, useState } from "react";

function App() {
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedAudioOutputDevice, setSelectedAudioOutputDevice] =
    useState<MediaDeviceInfo | null>();
  const [selectedAudioInputDevice, setSelectedAudioInputDevice] =
    useState<MediaDeviceInfo | null>();

  useEffect(() => {
    const getAudioDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        setAudioDevices(devices);
      } catch (error) {
        console.error(`An error ocurred when fetching audio devices: ${error}`);
      }
    };

    getAudioDevices();

    const handleDeviceChange = () => {
      console.log("Audio device changed.");
      getAudioDevices();
    };

    navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);

    return () => {
      navigator.mediaDevices.removeEventListener(
        "devicechange",
        handleDeviceChange
      );
    };
  }, []);

  const lockAudioOutputDevice = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Locking this one for output: ", selectedAudioOutputDevice);
    console.log("Locking this one for input: ", selectedAudioInputDevice);
  };

  return (
    <form onSubmit={lockAudioOutputDevice}>
      <label htmlFor="audio-devices">Audio Output devices</label>
      <select
        name="audio-devices"
        id="audio-devices"
        onChange={(e) =>
          setSelectedAudioOutputDevice(
            audioDevices.find((d) => d.label == e.target.value)
          )
        }
      >
        {audioDevices
          .filter((device) => device.kind == "audiooutput")
          .map((device) => (
            <option key={device.deviceId}>{device.label}</option>
          ))}
      </select>
      <br />
      <label htmlFor="audio-devices">Audio Output devices</label>
      <select
        name="audio-devices"
        id="audio-devices"
        onChange={(e) =>
          setSelectedAudioInputDevice(
            audioDevices.find((d) => d.label == e.target.value)
          )
        }
      >
        {audioDevices
          .filter((device) => device.kind == "audioinput")
          .map((device) => (
            <option key={device.deviceId}>{device.label}</option>
          ))}
      </select>
      <br />
      <button>Lock audio device(s)</button>
    </form>
  );
}

export default App;
