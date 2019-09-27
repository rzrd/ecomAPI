module.exports = (res, succ, mssg, data) => {
    res.json({
        success: succ,
        message: mssg,
        data: data
    })
}