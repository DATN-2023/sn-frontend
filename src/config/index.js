import FingerprintJS from "@fingerprintjs/fingerprintjs";
import config from "./config";
import notificationApi from "@/api/notification";

const {urlConfig: {imageUrl, thumborUrl, videoUrl}} = config

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

export function isVideo(filename) {
    const ext = filename.split('.').pop()
    switch (ext.toLowerCase()) {
        case 'm4v':
        case 'avi':
        case 'mpg':
        case 'mp4':
            return true;
    }
    return false;
}

export function genImageUrl(endpoint, size) {
    const protocol = endpoint.split('://').shift()
    if (protocol === 'http' || protocol === 'https') return endpoint
    else return `${thumborUrl}/unsafe/${size || 'x'}/${encodeURIComponent(imageUrl)}${encodeURIComponent(endpoint)}`
}

export function genVideoUrl(endpoint, size) {
    const protocol = endpoint.split('://').shift()
    if (protocol === 'http' || protocol === 'https') return endpoint
    else return `${videoUrl}${endpoint}`
}

export function genTime(createdAt) {
    const currentTime = Math.floor(new Date() / 1000)
    const diff = Math.abs(currentTime - createdAt)
    if (diff < 0) {
        return '0 giây trước'
    } else if (diff <= 60) {
        return `${diff} giây trước`
    } else if (60 < diff && diff  <= 3600) {
        return `${Math.floor(diff / 60)} phút trước`
    } else if (3600 < diff && diff <= 3600 * 24) {
        return `${Math.floor(diff / 3600)} giờ trước`
    } else {
        return `${Math.floor(diff / 3600 / 24)} ngày trước`
    }
}

export function genGroupName(name) {
    return name.length > 28 ? `${name.substring(0, 27)}...` : name
}
