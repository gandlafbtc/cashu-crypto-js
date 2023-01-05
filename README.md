# Blinded Signatures
`@gandlaf21/blind-signature` is a JavaScript Module implementing blind signatures using `@noble/secp256k1` elliptic curve. 

## Usage 

__install:__

```shell
npm i @gandlaf21/blind-signature
```

__use:__ 

Take a look at this example for the complete flow:

```javascript
import { SigningAuthority, BlindedMessage } from "@gandlaf21/blind-signature";
//Mint(Alice)
const mint: SigningAuthority = new SigningAuthority();

//Wallet(Bob)
const message: BlindedMessage = new BlindedMessage()
const B_ = await message.createBlindedMessageFromString("secret")

//Mint
const C_ = mint.createBlindSignature(B_)

//Wallet
const {C, secret} = message.unblindSignature(C_, mint.publicKey)

//Mint
const aY  = await mint.calculateCVerify(secret)

//if C===aY, the message was signed by the mint with private key a 
```

In the most likely case, the Signing Authority is not running alongside the creator of the blinded messages. We can serialize and deserialize the points, to hex strings, for simplified data transfer:

```javascript
import { hexToPoint, pointToHex } from "@gandlaf21/blind-signature";

//serialize
const b_ = pointToHex(B_)

//deserialize
const B_dec: = hexToPoint(b_)
```