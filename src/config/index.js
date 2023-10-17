import FingerprintJS from "@fingerprintjs/fingerprintjs";

export async function getFingerPrintBrowser() {
    const fpPromise = FingerprintJS.load()
    const fp = await fpPromise
    const result = await fp.get()

    // This is the visitor identifier:
    return result.visitorId
}

export function extractHashtags(str) {
    const rgx = /#(\w+)\b/gi;
    const result = [];
    let temp;
    while (temp = rgx.exec(str)) {
        result.push(temp[1])
    }
    return result;
}