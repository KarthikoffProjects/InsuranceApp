const { info } = require('console');
const {createLogger,transports,format}=require('winston');

const connectionlogger=createLogger({
    transports:[
        new transports.File({
            filename:'test.log',
            level:'info',
            maxFiles:"15d",
            maxsize:10*1024*1024,
            format:format.combine(format.timestamp("YYYY/MM/DD"),format.json())
        }),
        new transports.File({
            filename:'test-error.log',
            level:'error',
            maxFiles:"15d",
            maxsize:10*1024*1024,
            format:format.combine(format.timestamp("YYYY/MM/DD"),format.json())
        })
    ]
})
module.exports={connectionlogger};