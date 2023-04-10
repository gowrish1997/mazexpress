import React from "react";
import fetchJson from "@/lib/fetchServer";
import AuthLayout from "@/components/auth/AuthLayout";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n } from "next-i18next";
import ResetPasswordView from "@/components/auth/ResetPasswordView";
import { GetServerSidePropsContext } from "next";
import { APIResponse } from "@/models/api.model";
import { User } from "@/models/user.model";

const BackGate = (props: any) => {
  return (
    <div>
      <Head>
        <title>Sign in | Register</title>
      </Head>
      <AuthLayout>
        <ResetPasswordView user={props.user} magic={props.magic} />
      </AuthLayout>
    </div>
  );
};

export default BackGate;
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  const magic_id = ctx.params.id;

  const is_magic_id_valid: APIResponse<User> = await fetchJson(
    `/api/magic-links/id/${magic_id}`
  );
//   console.log(magic_id);
//   console.log(is_magic_id_valid);
  // if magic id exists return page
  // else redirect to gate
  if (is_magic_id_valid && is_magic_id_valid.data !== null) {
    return {
      props: {
        user: (is_magic_id_valid.data as User[])[0],
        magic: magic_id,
        ...(await serverSideTranslations(ctx.locale, ["common"])),
      },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/gate",
      },
    };
  }
}
