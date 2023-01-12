import {  Point, utils } from "@noble/secp256k1";
import { hashToCurve,bytesToNumber } from "../util/crypto.js";
class SigningAuthority {
    private privateKey: Uint8Array
    publicKey: Point
    constructor(privateKey?: Uint8Array){
        if (privateKey) {
            this.privateKey = privateKey
        }
        else {
            this.privateKey = utils.randomPrivateKey()
        }
        this.publicKey = Point.BASE.multiply(bytesToNumber(this.privateKey))
    }

    createBlindSignature(B_: Point) : Point{
        const C_ : Point = B_.multiply(bytesToNumber(this.privateKey))
        return C_
    }

    async calculateCVerify(secret: Uint8Array) : Promise<Point> {
        const Y : Point = await hashToCurve(secret)
        const aY : Point = Y.multiply(bytesToNumber(this.privateKey))
        return aY
    }
    verify(aY: Point, C: Point): boolean{
        return aY.equals(C)
    }
}

export {SigningAuthority}