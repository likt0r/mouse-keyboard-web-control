#!/bin/bash
SINK=$(pacmd list-sinks|awk '/\* index:/{ print $3 }') || "@DEFAULT_SINK@"
pactl set-sink-mute "$SINK" "$@"
canberra-gtk-play -i audio-volume-change -d "$(basename "$0")"