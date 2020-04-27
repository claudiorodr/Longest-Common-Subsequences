const printlcs = require('./printlcs')

module.exports = {
    main: function (v, w, res) {
        // v = ['A', 'T', 'C', 'T', 'G', 'A', 'T']
        // w = ['T', 'G', 'C', 'A', 'T', 'A']
        var maximum
        var s = [],
            b = [],
            d = [],
            g = [],
            temp = [],
            temp2 = []

        for (let i = 0; i <= w.length; i++) {
            temp.push(0)
            temp2.push(i)
        }

        s.push(temp)
        d.push(temp2)

        for (let j = 1; j <= v.length; j++) {
            s.push([0])
            d.push([j])
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
                    })
                    if (maximum == max[0]) {
                        b[i - 1][j - 1] = "UP"
                    } else {
                        b[i - 1][j - 1] = "LEFT"
                    }
                }
                s[i][j] = maximum
            }
        }

        for (let i = 1; i <= v.length; i++) {
            g[i - 1] = []
            for (let j = 1; j <= w.length; j++) {
                if (v[i - 1] == w[j - 1]) {
                    minimum = d[i - 1][j - 1]
                    g[i - 1][j - 1] = "DIAGONAL"
                } else {
                    var min = [d[i - 1][j] + 1, d[i][j - 1] + 1]
                    minimum = min.reduce(function (a, b) {
                        return Math.min(a, b);
                    })
                    if (min == min[0]) {
                        g[i - 1][j - 1] = "UP"
                    } else {
                        g[i - 1][j - 1] = "LEFT"
                    }
                }
                d[i][j] = minimum
            }
        }
        printlcs.main(b, w, v.length, w.length, d, res)
    }
}