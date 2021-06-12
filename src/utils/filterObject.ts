// Shortest one liners for ES6+

// Filter all falsy values ( "", 0, false, null, undefined )
// Object.entries(obj).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})

// Filter null and undefined values:
// Object.entries(obj).reduce((a,[k,v]) => (v == null ? a : (a[k]=v, a)), {})

// Filter ONLY null
// Object.entries(obj).reduce((a,[k,v]) => (v === null ? a : (a[k]=v, a)), {})

// Filter ONLY undefined
// Object.entries(obj).reduce((a,[k,v]) => (v === undefined ? a : (a[k]=v, a)), {})

export default function filterObject(obj: object): object {
    return Object.entries(obj).reduce((a,[k,v]) => (v == null ? a : (a[k]=v, a)), {})
} 