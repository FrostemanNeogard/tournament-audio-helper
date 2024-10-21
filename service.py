import sounddevice as sd

def get_sound_devices():
    sd.query_devices()

def set_audio_device(input_device_index, output_device_index):
    sd.default.device = [input_device_index, output_device_index]