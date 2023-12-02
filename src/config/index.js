import FingerprintJS from "@fingerprintjs/fingerprintjs";
import config from "./config";

const {urlConfig: {imageUrl}} = config

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

export function formatDate(date) {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
}

export function stringToSlug(str) {
    const from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ'
    const to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy'
    for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(RegExp(from[i], 'gi'), to[i])
    }

    str = str.trim()
        .replace(/[^a-z0-9 \-]/g, '')
        .replace(/ +/g, '-')

    return str
}

export function genImageUrl(endpoint) {
    const protocol = endpoint.split('://').shift()
    if (protocol === 'http' || protocol === 'https') return endpoint
    else return `${imageUrl}${endpoint}`
}

export function genTime(createdAt) {
    const currentTime = Math.floor(new Date() / 1000)
    const diff = currentTime - createdAt
    if (0 < diff && diff <= 60) {
        return `${diff} giây trước`
    } else if (60 < diff && diff  <= 3600) {
        return `${Math.floor(diff / 60)} phút trước`
    } else if (3600 < diff && diff <= 3600 * 24) {
        return `${Math.floor(diff / 3600)} giờ trước`
    } else {
        return `${Math.floor(diff / 3600 / 24)} ngày trước`
    }
}
