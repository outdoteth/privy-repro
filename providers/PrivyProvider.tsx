"use client";

import { PrivyProvider as _PrivyProvider } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { base, baseGoerli, mainnet, goerli } from "@wagmi/chains";
import { chainConfigs } from "./WagmiProvider";

export const PrivyProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <_PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        loginMethods: ["email", "google", "twitter", "tiktok"],
        appearance: {
          theme: "#ffffff",
          accentColor: "#38CCCD",
          logo: "https://pump.fun/logo.png",
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
        defaultChain: chainConfigs["84531"].chain,
        supportedChains: [chainConfigs["84531"].chain],
        fiatOnRamp: {
          useSandbox: true,
        },
      }}
    >
      {children}
    </_PrivyProvider>
  );
};
