import React, { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

type Props = {
  onPickerChange: (color: string) => void;
  value?: string;
};

const ColorPicker = ({ onPickerChange, value }: Props) => {
  const [color, setColor] = useState("#aabbcc");

  return (
    <div>
      <div className="flex flex-col gap-2">
        <span>#</span>
        <HexColorInput
          className={"hex-input"}
          color={value}
          onChange={onPickerChange}
        />
      </div>

      <HexColorPicker color={value} onChange={onPickerChange} />
    </div>
  );
};

export default ColorPicker;
