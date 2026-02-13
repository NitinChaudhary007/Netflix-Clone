import React from "react";
import Button from "./Button";

export default function VideoTitle() {
  return (
    <div className="absolute text-white pt-[18%] p-12">
      <h1 className="text-3xl font-bold">Mern stack</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam{" "}
        <br />
        vel? Delectus mollitia libero, adipisci harum reiciendis alias <br />
        accusantium magnam veritatis? A autem error nostrum? <br />
      </p>
      <div>
        <Button>Play</Button>
        <Button>Watch Later</Button>
      </div>
    </div>
  );
}
