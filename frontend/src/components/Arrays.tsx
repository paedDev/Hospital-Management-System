import React from "react";

let numbers: number[] = [1, 2, 3, 4];
const fruits: string[] = ["Banana", "Orange", "Apple", "Mango"];
fruits.pop();
const Arrays = () => {
  return (
    <div>
      <div>
        {fruits.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
      {numbers.map((num, index) => (
        <div key={index}>{num}</div>
      ))}
    </div>
  );
};

export default Arrays;
