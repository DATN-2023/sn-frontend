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

export function formatDate(date) {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
}

export function stringToSlug (str) {
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
