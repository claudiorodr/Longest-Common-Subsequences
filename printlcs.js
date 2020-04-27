var fs = require('fs');

module.exports = {
    main: function (b, v, m, n, res) {
        var seq = []
        printLCS(m, n)

        function printLCS(i, j) {
            if (i == 0 || j == 0) {
                return
            }

            if (b[i - 1][j - 1] == "DIAGONAL") {
                seq.unshift(v[j - 1])
                printLCS(i - 1, j - 1)
            } else {
                if (b[i - 1][j - 1] == "UP") {
                    printLCS(i - 1, j)
                } else {
                    printLCS(i, j - 1)
                }
            }
        }
        console.log(seq)
        
    }
}