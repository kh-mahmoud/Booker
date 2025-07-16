'use client'

import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

const SocialBtn = () => {
  return (
    <div>
      <Button onClick={()=>signIn("google",{redirectTo:"/"})}>google auth</Button>
    </div>
  );
};

export default SocialBtn;
