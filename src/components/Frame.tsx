import React, { useCallback, useEffect, useRef, useState } from "react";
import { jitsiApi } from "./jitsi";

const DOMAIN = import.meta.env.VITE_DOMAIN;
const EXTERNAL_API = `https:/${DOMAIN}/external_api.js`;

const user = {
  name: Math.random().toFixed(5).toString(),
};

export default function Frame() {
  console.log(DOMAIN)
  const [roomInfo] = useState({ name: "sonht" });

  const [ready, setReady] = useState(false);

  const refApi = useRef<any>(null);
  const myWindow: any = window;

  const getParticipants = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(refApi.current?.getParticipantsInfo()); // get all participants
      }, 500);
    });
  };

  // event listener
  const handleClose = () => {
    console.log("-------handleClose");
  };

  const handleParticipantLeft = async (participant: any) => {
    console.log("---------handleParticipantLeft", participant); // { id: "2baa184e" }
    const data = await getParticipants();
  };

  const handleParticipantJoined = async (participant: any) => {
    console.log("------handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
    const data = await getParticipants();
  };

  const handleVideoConferenceJoined = async (participant: any) => {
    console.log("---------handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
    const data = await getParticipants();
  };

  const handleVideoConferenceLeft = () => {
    console.log("----------handleVideoConferenceLeft");
  };

  const handleMuteStatus = (audio: any) => {
    console.log("------handleMuteStatus", audio); // { muted: true }
  };

  const handleVideoStatus = (video: any) => {
    console.log("------handleVideoStatus", video); // { muted: true }
  };

  const handleOutgoingMessage = (message: any) => {
    console.log("------handleOutgoingMessage", message); // { message: string, privateMessage: boolean }
  };
  // end event listener

  // start meet
  const startMeet = useCallback(() => {
    console.log(">>>>>>>>>>>>>>>>>>>>>> START MEET");
    const options = {
      roomName: roomInfo.name,
      width: "100%",
      height: 500,
      configOverwrite: { prejoinPageEnabled: false },
      parentNode: document.querySelector("#jitsi-iframe"),
      intefaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
      },
      userInfo: {
        displayName: user.name,
      },
    };
    refApi.current = new myWindow.JitsiMeetExternalAPI(DOMAIN, options);
    const refApiCurrent = refApi.current;

    if (refApiCurrent) {
      refApiCurrent.addEventListeners({
        readyToClose: handleClose,
        participantLeft: handleParticipantLeft,
        participantJoined: handleParticipantJoined,
        videoConferenceJoined: handleVideoConferenceJoined,
        videoConferenceLeft: handleVideoConferenceLeft,
        audioMuteStatusChanged: handleMuteStatus,
        videoMuteStatusChanged: handleVideoStatus,
        outgoingMessage: handleOutgoingMessage,
      });
    }
  }, []);

  useEffect(() => {
    if (!ready) {
      setReady(true);
    }
  }, [ready]);

  useEffect(() => {
    if (ready) {
      (async () => {
        await jitsiApi(EXTERNAL_API).then(() => {
          startMeet();
        });
      })();
    }
  }, [startMeet, ready]);

  return (
    <div style={{ width: "100vw", display: "flex", justifyContent: "center" }}>
      <div id="jitsi-iframe" style={{ width: "100%", maxWidth: 600 }}></div>
    </div>
  );
}
