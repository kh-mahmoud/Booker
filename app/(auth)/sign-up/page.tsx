import AuthForm from "@/components/AuthForm";
import React from "react";

const page = () => {
  return (
    <div>
      <AuthForm
        type="SIGN-UP"
        defaultValues={{
          name: "",
          email: "",
          universityId: 0,
          universityCard: "",
          password: "",
        }}
      />
    </div>
  );
};

export default page;
