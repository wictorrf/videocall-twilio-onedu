import { useRef } from "react";
import React from 'react';
import {useEffect} from 'react';
import TwilioVideo, { RemoteDataTrack } from 'twilio-video';
import logo from '../image/logo.png';

function TwilioVideos ({token, room}) {

    const localVideoRef = useRef();
    const remoteVideoRef = useRef();

    function appendNewParticipant(track, identity){
        const chat = document.createElement('div');
        chat.setAttribute("id", identity);
        chat.appendChild(track.attach());
        remoteVideoRef.current.appendChild(chat);
    }

    useEffect(() => {
    console.log('Trying to connect twilio with token :', token);
        TwilioVideo.connect(token, {
            video: true,
            audio: true,
            name: room,
        })
        .then((room) => {
            console.log('connected to Twilio');
            TwilioVideo.createLocalVideoTrack().then(
                Track => {
                    localVideoRef.current.appendChild(Track.attach());
                }
            );

            function removeParticipant(participant) {
                console.log('Remove participant with identity ', participant.identity)
                const elem = document.getElementById(participant.identity);
                elem.parentNode.removeChild(elem);
            }

            function addParticipant(participant) {
                console.log('Adding a new participant');
                participant.tracks.forEach(publication => {
                    if(publication.isSubscribed){
                        const track = publication.track;
                        appendNewParticipant(track, participant.identity);
                        console.log('attached a track');
                    }
                });
                participant.on('trackSubscribed', track => {
                    console.log('Append a new track')
                    appendNewParticipant(track, participant.identity);
                })
            }
            room.participants.forEach(addParticipant);
            room.on('participantConnected', addParticipant);
            room.on('participantDisconnected', removeParticipant);
        })
        .catch((error) => {
            console.log('an error happend ', error)
        })
        
        return () => {};

    }, [token, room])

    return (
        <div>
        <nav className="navbar navbar-dark" style={{backgroundColor: '#FA8072'}} >
            <img src={logo} width="150px" height="45px" style={{margin: 'auto'}}  />
         
        </nav>
            
            <div className="mt-4" style={{  width: '50%', float: 'left' }} ref={localVideoRef} ></div>
            <div className="mt-4" style={{  width: '50%', float: 'right' }} ref={remoteVideoRef} ></div>
        </div>
    )
}
export default TwilioVideos;