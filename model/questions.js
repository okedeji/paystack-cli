module.exports = {
    setupQuestion : [
        {
            type : 'input',
            name : 'public_key',
            message : 'Enter your Paystack Public Key:'
        }
    ],
    confirm : [
        {
            type: "confirm",
            name: "correct",
            message: "is this OK?"
        }
    ]
}