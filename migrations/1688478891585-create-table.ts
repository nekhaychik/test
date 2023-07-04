import { MigrationInterface, QueryRunner } from "typeorm";

export class createTable1688478891585 implements MigrationInterface {
    name = 'createTable1688478891585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("hash" bytea NOT NULL, "fetchedCoinBalance" numeric(100) NOT NULL, "fetchedCoinBalanceBlockNumber" integer NOT NULL, "contractCode" bytea, "nonce" integer, "decompiled" boolean NOT NULL DEFAULT false, "verified" boolean NOT NULL DEFAULT false, "gasUsed" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_c0361c19c955237ba7bdbbb88d6" PRIMARY KEY ("hash"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("hash" bytea NOT NULL, "blockNumber" integer NOT NULL, "cumulativeGasUsed" numeric(100) NOT NULL, "earliestProcessingStart" TIMESTAMP NOT NULL, "error" character varying(255) NOT NULL, "gas" numeric(100) NOT NULL, "gasPrice" numeric(100) NOT NULL, "gasUsed" numeric(100), "index" integer NOT NULL, "createdContractCodeIndexedAt" TIMESTAMP, "input" bytea NOT NULL, "nonce" integer NOT NULL, "r" numeric(100) NOT NULL, "s" numeric(100) NOT NULL, "status" integer NOT NULL, "v" numeric(100) NOT NULL, "value" numeric(100) NOT NULL, "revertReason" text, "maxPriorityFeePerGas" numeric(100), "maxFeePerGas" numeric(100), "type" integer, "timestamp" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "blockHash" bytea, "fromAddressHash" bytea, "toAddressHash" bytea, CONSTRAINT "PK_de4f0899c41c688529784bc443f" PRIMARY KEY ("hash"))`);
        await queryRunner.query(`CREATE INDEX "IDX_23c12ee2f2eb39f935dc787d64" ON "transaction" ("fromAddressHash") `);
        await queryRunner.query(`CREATE INDEX "IDX_a08af727a75eaccd47e55b446b" ON "transaction" ("toAddressHash") `);
        await queryRunner.query(`CREATE INDEX "IDX_b39efec8ac50249f9bd91bdbf3" ON "transaction" ("blockNumber") `);
        await queryRunner.query(`CREATE TABLE "block" ("hash" bytea NOT NULL, "consensus" boolean NOT NULL, "difficulty" numeric(100) NOT NULL, "gasLimit" numeric(100) NOT NULL, "gasUsed" numeric(100) NOT NULL, "nonce" bytea NOT NULL, "number" integer NOT NULL, "size" integer NOT NULL, "timestamp" TIMESTAMP NOT NULL, "totalDifficulty" numeric(100) NOT NULL, "baseFeePerGas" numeric(100) NOT NULL, "isEmpty" boolean NOT NULL, "parentHash" bytea NOT NULL, "miner" bytea NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "minerHash" bytea, CONSTRAINT "PK_f8fba63d7965bfee9f304c487aa" PRIMARY KEY ("hash"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "blockNumberIndex" ON "block" ("number") `);
        await queryRunner.query(`CREATE TABLE "log" ("data" bytea NOT NULL, "index" integer NOT NULL, "type" character varying(255) NOT NULL, "firstTopic" character varying(255) NOT NULL, "secondTopic" character varying(255) NOT NULL, "thirdTopic" character varying(255) NOT NULL, "fourthTopic" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "addressHash" bytea NOT NULL, "transactionHash" bytea NOT NULL, "blockHash" bytea NOT NULL, "blockNumber" integer NOT NULL, CONSTRAINT "PK_8b17aa14cbb334f9ac5d3683ed9" PRIMARY KEY ("index", "transactionHash", "blockHash"))`);
        await queryRunner.query(`CREATE INDEX "IDX_22b3994de470097e74a600bb1d" ON "log" ("type") `);
        await queryRunner.query(`CREATE INDEX "IDX_1e3312c5ef1888548b0937e29b" ON "log" ("firstTopic") `);
        await queryRunner.query(`CREATE INDEX "IDX_f7cd625789058657d71511963c" ON "log" ("secondTopic") `);
        await queryRunner.query(`CREATE INDEX "IDX_fd6b225e0e1862e083064f751c" ON "log" ("thirdTopic") `);
        await queryRunner.query(`CREATE INDEX "IDX_19363dc10d3c7f58d31a3f9eed" ON "log" ("fourthTopic") `);
        await queryRunner.query(`CREATE INDEX "IDX_ffe46f862e86912337c1a914c3" ON "log" ("transactionHash") `);
        await queryRunner.query(`CREATE INDEX "IDX_1ea244b46664cce07a810d81b4" ON "log" ("blockNumber") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_8b17aa14cbb334f9ac5d3683ed" ON "log" ("transactionHash", "blockHash", "index") `);
        await queryRunner.query(`CREATE INDEX "IDX_88ecd513476222fbfd73a49764" ON "log" ("transactionHash", "index") `);
        await queryRunner.query(`CREATE INDEX "IDX_14c4d223234747ab938181a9a3" ON "log" ("addressHash", "transactionHash") `);
        await queryRunner.query(`CREATE INDEX "IDX_d4a8ac0f7ec52b5b75de144a04" ON "log" ("addressHash") `);
        await queryRunner.query(`CREATE TABLE "token" ("name" character varying(255) NOT NULL, "symbol" character varying(255) NOT NULL, "totalSupply" numeric NOT NULL, "decimals" numeric NOT NULL, "type" character varying(255) NOT NULL, "contractAddressHash" bytea NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "skipMetadata" boolean, CONSTRAINT "PK_7222dfb5b9e7cb8c91cf0d9837b" PRIMARY KEY ("contractAddressHash"))`);
        await queryRunner.query(`CREATE INDEX "symbolIndex" ON "token" ("symbol") `);
        await queryRunner.query(`CREATE INDEX "IDX_5677006427151eb0f734664500" ON "token" ("type") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_7222dfb5b9e7cb8c91cf0d9837" ON "token" ("contractAddressHash") `);
        await queryRunner.query(`CREATE TABLE "tokenTransfer" ("transactionHash" bytea NOT NULL, "logIndex" integer NOT NULL, "amount" numeric, "tokenId" numeric(78), "blockHash" bytea NOT NULL, "blockNumber" integer NOT NULL, "amounts" numeric array, "tokenIds" numeric(78) array, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "fromAddressHash" bytea, "toAddressHash" bytea, "tokenContractAddressHash" bytea, CONSTRAINT "PK_312b5a58a8a2fe99a652b4153c7" PRIMARY KEY ("transactionHash", "blockHash"))`);
        await queryRunner.query(`CREATE INDEX "IDX_900f6182fda893fb2ec81702c0" ON "tokenTransfer" ("transactionHash") `);
        await queryRunner.query(`CREATE INDEX "IDX_e5b09aad5de0b2d082f86dd559" ON "tokenTransfer" ("fromAddressHash") `);
        await queryRunner.query(`CREATE INDEX "IDX_8d3bead7fdb20fa3b9e8d36d52" ON "tokenTransfer" ("toAddressHash") `);
        await queryRunner.query(`CREATE INDEX "IDX_c9bdf9be702f7cb591e44353e7" ON "tokenTransfer" ("tokenContractAddressHash") `);
        await queryRunner.query(`CREATE INDEX "IDX_1448a082f796f54c6f7262e6a0" ON "tokenTransfer" ("blockNumber") `);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_08f3024b3fad3c62274225faf91" FOREIGN KEY ("blockHash") REFERENCES "block"("hash") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_23c12ee2f2eb39f935dc787d640" FOREIGN KEY ("fromAddressHash") REFERENCES "address"("hash") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_a08af727a75eaccd47e55b446b8" FOREIGN KEY ("toAddressHash") REFERENCES "address"("hash") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "block" ADD CONSTRAINT "FK_fe54f4355aa873408a106fe34fd" FOREIGN KEY ("minerHash") REFERENCES "address"("hash") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_d4a8ac0f7ec52b5b75de144a04c" FOREIGN KEY ("addressHash") REFERENCES "address"("hash") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_ffe46f862e86912337c1a914c3e" FOREIGN KEY ("transactionHash") REFERENCES "transaction"("hash") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_50c030023782c7ae4bfb876553f" FOREIGN KEY ("blockHash") REFERENCES "block"("hash") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_7222dfb5b9e7cb8c91cf0d9837b" FOREIGN KEY ("contractAddressHash") REFERENCES "address"("hash") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tokenTransfer" ADD CONSTRAINT "FK_900f6182fda893fb2ec81702c03" FOREIGN KEY ("transactionHash") REFERENCES "transaction"("hash") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tokenTransfer" ADD CONSTRAINT "FK_e5b09aad5de0b2d082f86dd5596" FOREIGN KEY ("fromAddressHash") REFERENCES "address"("hash") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tokenTransfer" ADD CONSTRAINT "FK_8d3bead7fdb20fa3b9e8d36d520" FOREIGN KEY ("toAddressHash") REFERENCES "address"("hash") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tokenTransfer" ADD CONSTRAINT "FK_c9bdf9be702f7cb591e44353e75" FOREIGN KEY ("tokenContractAddressHash") REFERENCES "address"("hash") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tokenTransfer" ADD CONSTRAINT "FK_9fe9a9bd37c4e290507a7205bd4" FOREIGN KEY ("blockHash") REFERENCES "block"("hash") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tokenTransfer" DROP CONSTRAINT "FK_9fe9a9bd37c4e290507a7205bd4"`);
        await queryRunner.query(`ALTER TABLE "tokenTransfer" DROP CONSTRAINT "FK_c9bdf9be702f7cb591e44353e75"`);
        await queryRunner.query(`ALTER TABLE "tokenTransfer" DROP CONSTRAINT "FK_8d3bead7fdb20fa3b9e8d36d520"`);
        await queryRunner.query(`ALTER TABLE "tokenTransfer" DROP CONSTRAINT "FK_e5b09aad5de0b2d082f86dd5596"`);
        await queryRunner.query(`ALTER TABLE "tokenTransfer" DROP CONSTRAINT "FK_900f6182fda893fb2ec81702c03"`);
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_7222dfb5b9e7cb8c91cf0d9837b"`);
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_50c030023782c7ae4bfb876553f"`);
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_ffe46f862e86912337c1a914c3e"`);
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_d4a8ac0f7ec52b5b75de144a04c"`);
        await queryRunner.query(`ALTER TABLE "block" DROP CONSTRAINT "FK_fe54f4355aa873408a106fe34fd"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_a08af727a75eaccd47e55b446b8"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_23c12ee2f2eb39f935dc787d640"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_08f3024b3fad3c62274225faf91"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1448a082f796f54c6f7262e6a0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c9bdf9be702f7cb591e44353e7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8d3bead7fdb20fa3b9e8d36d52"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e5b09aad5de0b2d082f86dd559"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_900f6182fda893fb2ec81702c0"`);
        await queryRunner.query(`DROP TABLE "tokenTransfer"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7222dfb5b9e7cb8c91cf0d9837"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5677006427151eb0f734664500"`);
        await queryRunner.query(`DROP INDEX "public"."symbolIndex"`);
        await queryRunner.query(`DROP TABLE "token"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d4a8ac0f7ec52b5b75de144a04"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_14c4d223234747ab938181a9a3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_88ecd513476222fbfd73a49764"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8b17aa14cbb334f9ac5d3683ed"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1ea244b46664cce07a810d81b4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ffe46f862e86912337c1a914c3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_19363dc10d3c7f58d31a3f9eed"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fd6b225e0e1862e083064f751c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f7cd625789058657d71511963c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1e3312c5ef1888548b0937e29b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_22b3994de470097e74a600bb1d"`);
        await queryRunner.query(`DROP TABLE "log"`);
        await queryRunner.query(`DROP INDEX "public"."blockNumberIndex"`);
        await queryRunner.query(`DROP TABLE "block"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b39efec8ac50249f9bd91bdbf3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a08af727a75eaccd47e55b446b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_23c12ee2f2eb39f935dc787d64"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
