import LogInComponent from "@/components/auth/LogInComponent";
import SignUpComponent from "@/components/auth/SignUpComponent";
import Head from "next/head";
import React, { useState } from "react";
import Image from "next/image";
const Gate = () => {
    const [newUser, setNewUser] = useState<boolean>(false);

    return (
        <div>
            <Head>
                <title>Sign in | Register</title>
            </Head>

            <div className="w-[100vw] h-[100vh] flex-type2">
                <div className="w-2/5 relative h-[100vh]  ">
                    <Image src="/homePic.png" layout="fill" alt="homepic" objectFit="cover" />
                </div>
                {newUser ? <SignUpComponent /> : <LogInComponent />}
            </div>
        </div>
    );
};

export default Gate;
