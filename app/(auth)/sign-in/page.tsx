import AuthForm from "@/components/AuthForm";
import React from "react";

const page = () => {
  return (
    <div>
      <AuthForm
        type="SIGN-In"
        defaultValues={{
          email:'',
          password:''
        }}
      />
    </div>
  );
};

export default page;
