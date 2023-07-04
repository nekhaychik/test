import { MyServer } from "@/server/start-server";
import { createConnection, DataSource } from "typeorm";
import { ChainProviderPool } from "@/server/gateway/chain-provider-pool";
import { Address } from '@/model/address';
import { Block, Log, Token, TokenTransfer, Transaction } from '@/model';

export type Gateways = {
  chainProvider: ChainProviderPool;
  dbCon: DataSource;
};

export async function setGateways(server: MyServer): Promise<void> {
  server.gateways = server.gateways || {};
  // if (server.config.gateways.postgresql.uri) {
    server.gateways.dbCon = await createConnection({
      type: "postgres",
      host: "127.0.0.1",
      port: 5432,
      username: "user",
      password: "mysecretpassword",
      database: "test_db",
      entities: [Address, Block, Log, TokenTransfer, Token, Transaction],
      synchronize: true,
      ssl: false,
    });
  // }

  const chainConfig = server.config.chain;
  server.gateways.chainProvider = new ChainProviderPool(chainConfig.rpcUrls, {
    name: chainConfig.chainName,
    chainId: chainConfig.chainId,
  });
}
