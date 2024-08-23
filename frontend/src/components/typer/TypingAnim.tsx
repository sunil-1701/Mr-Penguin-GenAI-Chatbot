import { React } from "react";
import { TypeAnimation } from "react-type-animation";

export const TypingAnim = ( ) =>{
    return (
        <TypeAnimation
  sequence={[
    'Mr. Penguin 🐧 is custom made AI',
    700,
    'Built with Gemini AI',
    1400,

  ]}
  speed={40}
  style={{ fontSize: '45px',color:"white",display:"inline-block",textShadow:"1px 1px 10px #5A4FCF" }}
  repeat={Infinity}
/>
    )
};