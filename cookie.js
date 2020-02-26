class Cookie {
    constructor() {
        this.cookies = [];
        this.all();
    }
    parse(c) {
        var arr = c.split('='),
            key = arr[0],
            value = null;
        if (arr.length > 1) {
            value = arr.slice(1).join('');
        }
        return {
            key,
            value
        }
    }
    all() {
        document.cookie.split(';')
            .map(m => {
                return m.replace(/^\s+/, '').replace(/\s+$/, '');
            })
            .forEach(c => {
                var p = this.parse(c);
                if (p.value != null) {
                    var key = p.key;
                    Object.defineProperty(this, key, {
                        get() {
                            this.value = this.get(key).value;
                            this.key = key;
                            return this;
                        }
                    });
                    this.cookies.push({
                        key: p.key,
                        value: p.value
                    });
                }
            });
        return this.cookies;
    }
    get(key) {
        var result;
        if (key.constructor == RegExp) {
            result = this.cookies.find(e => key.test(e.key));
        } else {
            result = this.cookies.find(e => e.key === key);
        }
        if (result) {
            this.value = result.value, this.key = result.key
            return this;
        } else {
            return null;
        }
    }
    remove() {
        this.set(this.key, null, -1);
    }
    set(key, value, time) {
        var today = new Date(),
            offset = (typeof time == 'undefined') ? (1000 * 60 * 60 * 24) : (time * 1000),
            expires_at = new Date(today.getTime() + offset);
        document.cookie = key + "=" + value + ";" + expires_at + ";path=/";
        if (!this[key]) {
            Object.defineProperty(this, key, {
                get() {
                    this.key = key;
                    this.value = this.get(key).value;
                    return this;
                }
            });
            this.cookies.push({
                key: key,
                value: value
            });
        } else {
            this.cookies.find(e => e.key === key).value = value;
        }
    }
}
