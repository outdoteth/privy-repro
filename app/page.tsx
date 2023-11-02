"use client";

import { useLogin, usePrivy } from "@privy-io/react-auth";
import { Address, usePublicClient, useWalletClient } from "wagmi";
import Image from "next/image";
import { getContract } from "wagmi/actions";
import pumpAbi from "../abis/pump.abi.json";

export default function Home() {
  const { authenticated, logout } = usePrivy();
  const { data: signer } = useWalletClient();
  const { login } = useLogin({
    onComplete: async (user, isNewUser, wasAlreadyAuthenticated) => {
      console.log("user", user);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const submitTx = async () => {
    if (!signer) throw Error("Connect your wallet");

    const contract = getContract({
      address: process.env.NEXT_PUBLIC_PUMP_ADDRESS as Address,
      abi: pumpAbi,
      walletClient: signer,
    });

    await contract.write.create([]);
  };

  return (
    <main className="p-12 grid gap-12">
      {authenticated ? (
        <button
          className="border p-2 rounded"
          onClick={() => {
            console.log("logging in");
            logout();
          }}
        >
          Logout
        </button>
      ) : (
        <button
          className="border p-2 rounded"
          onClick={() => {
            console.log("logging in");
            login();
          }}
        >
          Login
        </button>
      )}

      <button className="border p-2 rounded" onClick={() => submitTx()}>
        Submit transaction
      </button>
    </main>
  );
}
