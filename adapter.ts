import { Adapter, AdapterPayload } from "oidc-provider";
import { DataSource, Repository } from "typeorm";
import { OidcEntity } from "./entities/OidcEntity.js";

const types = [
  "Session",
  "AccessToken",
  "AuthorizationCode",
  "RefreshToken",
  "DeviceCode",
  "ClientCredentials",
  "Client",
  "InitialAccessToken",
  "RegistrationAccessToken",
  "Interaction",
  "ReplayDetection",
  "PushedAuthorizationRequest",
  "Grant",
  "BackchannelAuthenticationRequest",
].reduce(
  (map, name, i) => ({ ...map, [name]: i + 1 }),
  {} as Record<string, number>
);

export class TypeormAdapter implements Adapter {
  type: number;
  private repo: Repository<OidcEntity>;
  constructor(name: string, AppDataSource: DataSource) {
    this.repo = AppDataSource.getRepository(OidcEntity);
    this.type = types[name];
  }

  private expiresAt(expiresIn?: number): Date | null {
    return expiresIn ? new Date(Date.now() + expiresIn * 1000) : null;
  }

  private createResponse(element: OidcEntity) {
    const isPayloadJson =
      element.payload &&
      typeof element.payload === "object" &&
      !Array.isArray(element.payload);
    const payload = isPayloadJson ? element.payload : {};
    return {
      ...payload,
      ...(element.consumedAt ? { consumed: true } : undefined),
    };
  }

  async upsert(
    id: string,
    payload: AdapterPayload,
    expiresIn: number
  ): Promise<void> {
    await this.repo.save({
      id: id,
      type: this.type,
      payload: payload,
      grantId: payload.grantId,
      userCode: payload.userCode,
      uid: payload.uid,
      expiresIn: this.expiresAt(expiresIn),
    });
  }

  async find(id: string): Promise<AdapterPayload | undefined | void> {
    const element = await this.repo.findOne({
      where: { type: this.type, id: id },
    });
    if (!element) return undefined;
    if (element.expiresAt && element.expiresAt < new Date()) {
      await this.repo.delete({ id: id });
      return undefined;
    }
    return this.createResponse(element);
  }

  async findByUserCode(
    userCode: string
  ): Promise<AdapterPayload | undefined | void> {
    const element = await this.repo.findOne({
      where: { userCode: userCode },
    });
    if (!element || (element.expiresAt && element.expiresAt < new Date()))
      return undefined;
    return this.createResponse(element);
  }

  async findByUid(uid: string): Promise<AdapterPayload | undefined | void> {
    const element = await this.repo.findOne({
      where: { uid: uid },
    });
    if (!element || (element.expiresAt && element.expiresAt < new Date()))
      return undefined;
    return this.createResponse(element);
  }

  async consume(id: string): Promise<undefined | void> {
    await this.repo.update(
      { id: id, type: this.type },
      { consumedAt: new Date() }
    );
  }

  async destroy(id: string): Promise<undefined | void> {
    await this.repo.delete({ id: id, type: this.type });
  }

  async revokeByGrantId(grantId: string): Promise<undefined | void> {
    await this.repo.delete({ grantId: grantId, type: this.type });
  }
}
