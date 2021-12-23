function checkvalidate(req, user) {
    req.checkBody("email", "Email is required").notEmpty(); //validate để trống trường email sử dụng hàm notEmpty()
    req.checkBody("email", "Email is not invalid").matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/); //Validate định dạng email sử dụng regex, sử dụng hàm matches()

    return req.validationErrors();
}

module.exports = {
    checkvalidate: checkvalidate
};