export const createUuid = (len = 16) => {
    const result = [];
    const str = '01qwer234tyuiop56asdfJKLZghjklznmQWE789RTYUIOPASDxcvbFGHXCVBNM';
    const abs = str.split('');
    for (let i = 0; i < len; i++) {
        const a = abs[Math.floor(Math.random() * abs.length)];
        result.push(a);
    }
    return result.join('');
};
