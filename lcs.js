const printlcs = require('./printlcs')

module.exports = {
    main: function (v, w, res) {
        // v = ['A', 'T', 'C', 'T', 'G', 'A', 'T']
        // w = ['T', 'G', 'C', 'A', 'T', 'A']
        var maximum
        var s = [],
            temp = [],
            b = []

        for (let i = 0; i <= w.length; i++) {
            temp.push(0)
        }

        s.push(temp)

        for (let j = 1; j <= v.length; j++) {
            s.push([0])
        }

        for (let i = 1; i <= v.length; i++) {
            b[i - 1] = []
            for (let j = 1; j <= w.length; j++) {
                if (v[i - 1] == w[j - 1]) {
                    maximum = s[i - 1][j - 1] + 1
                    b[i - 1][j - 1] = "DIAGONAL"
                } else {
                    var max = [s[i - 1][j], s[i][j - 1]]
                    maximum = max.reduce(function (a, b) {
                        return Math.max(a, b);
                    });
                    if (maximum == max[0]) {
                        b[i - 1][j - 1] = "UP"
                    } else {
                        b[i - 1][j - 1] = "LEFT"
                    }
                }
                s[i][j] = maximum
            }
        }
        printlcs.main(b, w, v.length, w.length, res)
    }
}