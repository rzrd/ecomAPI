module.exports = (res, succ, mssg, data, token) => {
    res.json({
        success: succ,
        message: mssg,
        data: data
    })
}