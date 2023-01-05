import { utils, Point } from "@noble/secp256k1";
/**
 * Takes a secret, hashes it, and maps the hash to a point on the elliptic curve
 * @param secret a secret message. Should be random, to improve security.
 * @returns Point on elliptic curve.
 */
async function hashToCurve(secret: Uint8Array): Promise<Point> {
    let point: Point
    while (!point) {
        const hash: Uint8Array = await utils.sha256(secret)
        const hashHex: string = utils.bytesToHex(hash)
        const pointX: string = '02' + hashHex
        try {
            point = Point.fromHex(pointX)
        } catch (error) {
            secret = await utils.sha256(secret)
        }
    }
    return point
}

/**
 * Converts byte array to bigint
 * @param bytes 
 * @returns 
 */
function bytesToNumber(bytes: Uint8Array): bigint {
    return hexToNumber(utils.bytesToHex(bytes));
}

/**
 * 
 * @param hex 
 * @returns 
 */
 function hexToNumber(hex: string): bigint {
    try {
        return BigInt(`0x${hex}`)
    }
    catch {
        throw new Error("could not create BigInt from string: "+hex);
    }
}

function pointToHex(point: Point): string {
    return point.toHex()
}

function hexToPoint(hex: string): Point {
    return Point.fromHex(hex)
}

export {hashToCurve, bytesToNumber, hexToNumber, pointToHex, hexToPoint}

