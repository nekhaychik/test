const routePrefix = "/eth/mainnet";

module.exports = {
  server: {
    siteOrigin: undefined,
    routePrefix,
    port: process.env.PORT || 4134,
    noSecurityHeadersRoutes: {
      [`${routePrefix}/api-gateway/`]: true,
      [`${routePrefix}/api/`]: true,
    },
    noCsrfRoutes: {
      [`${routePrefix}/api-gateway/`]: true,
      [`${routePrefix}/api/`]: true,
    },
    cookie: {
      secrets: ["insecure plain text", "insecure secret here"],
    },
  },
  chain: {
    chainId: 1,
    chainName: "Ethereum",
    symbol: "ETH",
    rpcUrls: ['https://ethereum.publicnode.com'],
    decimals: 18,
    networkPath: routePrefix,
    
  },
  indexer: {
    catchup: {
      enabled: false,
    },
    realtime: {
      enabled: true,
    },
  },
  gateways: {
   logger: {
     enabled: false,
   },
   postgresql: {
     uri: process.env.DATABASE_URL,
     ssl: String(process.env.DATABASE_URL).includes(".com"),
   },
 },
};
