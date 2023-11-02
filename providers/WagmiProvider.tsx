"use client";

import { PrivyWagmiConnector } from "@privy-io/wagmi-connector";
import { baseGoerli, base } from "@wagmi/chains";
import { configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

export const chainConfigs: Record<number, any> = {
  84531: { chain: baseGoerli, url: "https://base-goerli.g.alchemy.com/v2/" },
  8453: { chain: base, url: "https://base.g.alchemy.com/v2/" },
};

const configureChainsConfig = configureChains(
  [baseGoerli, base],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `${84531}${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
      }),
    }),
    publicProvider(),
  ]
);

export const WagmiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
      {children}
    </PrivyWagmiConnector>
  );
};
