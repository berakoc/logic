const is = Object.is;
const type = (v) => typeof v;
const isNil = (v) => is(v, undefined) || is(v, null);
const identity = (x) => x;

module.exports = {
    is,
    type,
    isNil,
    identity
};
