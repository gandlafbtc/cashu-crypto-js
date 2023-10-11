import { Point, utils } from "@noble/secp256k1";
import { hashToCurve,bytesToNumber } from "../util/crypto.js";

/**
 * A class that represents a blinded message that can be sent to the mint
 */
class BlindedMessage {
    Y: Point;
    r: bigint;
    private rG: Point;
    private B_: Point;
    private secret: Uint8Array;
    constructor(){
    }

    async createBlindedMessage(message: Uint8Array): Promise<Point> {
        this.secret = message
        this.Y = await hashToCurve(this.secret)
        this.r = bytesToNumber(utils.randomPrivateKey())
        this.rG = Point.BASE.multiply(this.r)
        this.B_ = this.Y.add(this.rG)
        return this.B_
    }

    async createBlindedMessageFromString(message: string): Promise<Point> {
        const enc: TextEncoder = new TextEncoder()
        this.secret = enc.encode(message)
        return await this.createBlindedMessage(this.secret)
    }

    unblindSignature(C_: Point, mintPubK: Point): {C:Point, secret: Uint8Array}{
        const C : Point = C_.subtract(mintPubK.multiply(this.r))
        return {C, secret: this.secret}
    }
}

export {BlindedMessage}