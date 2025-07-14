import { AlertCircle, Verified } from "lucide-react";
import React from "react";

const UserVerified = ({isVerified}) => {
  return (
    <div className="flex items-center gap-1 mt-2 text-sm font-medium">
      {isVerified ? (
        <>
          <Verified className="size-4 text-blue-500" />
          Verified
        </>
      ) : (
        <>
          <AlertCircle className="text-destructive size-4" />
          Not Verified
        </>
      )}
    </div>
  );
};

export default UserVerified;
