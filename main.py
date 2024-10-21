import PySimpleGUI as sg
from service import get_sound_devices


window_title = "Tournament audio helper"
window_margins = (100, 50)


audio_device_picker_column = [
	[sg.Text("Select an audio device you want to lock:")],
	[sg.Listbox(
		values = [],
		enable_events = True,
		size = (40, 20),
		key="-AUDIO DEVICE LIST-"
	)]
]


window_layout = [
	[
		sg.Column(audio_device_picker_column),
	],
	[
		sg.Button("Exit")
	]
]

main_window = sg.Window(
	title = window_title,
	layout = window_layout,
	margins = window_margins
)

while True:
    get_sound_devices()

    event, values = main_window.read()
    if event == "Exit" or event == sg.WIN_CLOSED:
        break

main_window.close()