const pool = require('../config/db')

// Register a User
exports.registerUser = async (req, res, next) => {
    try {
        const { id, name, address } = req.body;
        console.log(name, id, address);
        const data = await pool.query("INSERT INTO users (id , name , address) VALUES($1 ,$2 ,$3) RETURNING *", [id, name, address]);
        res.status(200).json({
            success: true,
            data: data.rows,
            message: "registered user succssfully !"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })

    }
}


//get  Register a User

exports.getUsers = async (req, res) => {

    try {

        const data = await pool.query('SELECT * FROM users');
        res.status(200).json({
            success: true,
            data: data.rows,
            message: " text api !"
        })



    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })

    }
}




