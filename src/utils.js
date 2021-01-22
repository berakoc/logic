const is = Object.is;
const type = (v) => typeof v;
const isNil = (v) => is(v, undefined) || is(v, null);

module.exports = {
    is,
    type,
    isNil
};
