// new Date() 在ios兼容问题
var bind = Function.bind;
var unbind = bind.bind(bind);

function instantiate(constructor, args) {
    return new (unbind(constructor, null).apply(null, args))();
}

Date = (function(Date) {
    MyDate.prototype = Date.prototype;
    // copy date methods - this is a pain in the butt because they're mostly nonenumerable
    // Get all own props, even nonenumerable ones
    var names = Object.getOwnPropertyNames(Date);
    // Loop through them
    for (var i = 0; i < names.length; i++) {
        // Skip props already in the MyDate object
        if (names[i] in MyDate) continue;
        // Get property description from o
        var desc = Object.getOwnPropertyDescriptor(Date, names[i]);
        // Use it to create property on MyDate
        Object.defineProperty(MyDate, names[i], desc);
    }
    return MyDate;

    function MyDate() {
        // we only care about modifying the constructor if a datestring is passed in
        if (arguments.length === 1 && typeof arguments[0] === 'string') {
            // console.log(9999999, arguments)
            // if you're adding other date transformations, add them here
            // match dates of format m-d-yyyy and convert them to cross-browser-friendly m/d/yyyy
            var mdyyyyDashRegex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
            arguments[0] = arguments[0].replace(mdyyyyDashRegex, function(
                match,
                p1,
                p2,
                p3,
                b1,
                b2,
                b3
            ) {
                return `${p1}/${p2}/${p3} ${b1}:${b2}:${b3}`;
            });
            // console.log(8888888, arguments[0])
        }

        // call the original Date constructor with whatever arguments are passed in here
        var date = instantiate(Date, arguments);

        return date;
    }
})(Date);
