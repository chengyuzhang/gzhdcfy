export const encode = {
    encodeName (str) {
        return btoa(encodeURIComponent(str));
    },
    decodeName (str) {
        return decodeURIComponent(atob(str))
    }
}