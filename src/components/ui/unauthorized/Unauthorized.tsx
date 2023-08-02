import { FC } from "react";



const UnauthorizedScreen:FC = async() => {
  return (
    <div className="bg-grayPrimary container h-screen">
      <div className="flex justify-center items-center h-screen">
        <h1 className="main-header">Unauthorized</h1>
      </div>
    </div>
  );
}

export default UnauthorizedScreen;
