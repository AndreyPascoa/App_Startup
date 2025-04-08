import { useEffect, useState } from "react";
import { StartBluetooth } from "./voice";
//@ts-ignore
import { startVoiceRecognition, useVoiceRecognition } from 'react-native-microphone';

export function FluxoConversa() {
    
    const result = useVoiceRecognition();
    const [voiceResult, setVoiceResult] = useState<string>("");

    useEffect(() => {
        StartBluetooth();
        startVoiceRecognition();
        console.log("Iniciando reconhecimento de voz");
    }, []);

    useEffect(() => {
        setVoiceResult(result);
        conversation(result);
    },[result])

    function conversation (texto: string) {
        console.log("Texto reconhecido: ", texto);

        

    }

}
