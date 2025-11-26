import { useState } from "react";

type ButtonProps = {
  backgroundColor: string;
  fontSize: number;
};

const Button = ({ backgroundColor, fontSize }: ButtonProps) => {
  const [style, setStyle] = useState({ backgroundColor, fontSize });
  const [bgColor, setBgColor] = useState("white");
  const changeStyle = () => {
    setStyle({
      backgroundColor: "#14b8a6",
      fontSize: style.fontSize + 4,
    });
    setBgColor("red");
  };
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ backgroundColor: bgColor }}
    >
      <button
        className={`px-4 py-2 text-white rounded-full bg-blue-500`}
        style={style}
        onClick={changeStyle}
      >
        Click Me
      </button>
    </div>
  );
};

export default Button;
