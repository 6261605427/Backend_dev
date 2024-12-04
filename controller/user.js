const connection = require('../db')

const adduser = (req, res) => {
    try {
        const { userType, userRole, fullName, email, status } = req.body;

        const sqlQuery = "INSERT INTO usermanagement SET ?";
        const data = { userType, userRole, fullName, email, status };

        connection.query(sqlQuery, data, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({
                        message: `A user with this email (${email}) already exists.`,
                    });
                }

                return res.status(500).json({ message: "Database error", error: err });
            }

            return res.status(200).json({ message: "User created successfully", data: result });
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }

}

const getUser = (req, res) => {
    try {
        const sqlQuery = "select * from usermanagement"
        connection.query(sqlQuery, (err, result) => {
            if (err) {
                return res.status(404).json({ message: 'not found' })
            } else {
                return res.status(200).json({ message: "users found", result: result })
            }

        })
    } catch (error) {
        return res.send({ status: 500, Error: error.message })
    }
}

const updateUser = (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;

        const { email, userType, userRole, status, fullName } = data;

        if (!userType || !userRole || !status || !fullName) {
            return res.status(400).json({ message: "All fields (userType, userRole, status, fullName) are required" });
        }

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }



        const sqlQuery = "UPDATE usermanagement SET userType = ?, userRole = ?, status = ?, fullName = ? WHERE id = ?";
        const values = [userType, userRole, status, fullName, id];

        connection.query(sqlQuery, values, (err, result) => {
            if (err) {
                console.error("Database Error:", err);
                return res.status(500).json({ message: "Internal server error", error: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "User not found or no changes detected" });
            }

            return res.status(200).json({ message: "User updated successfully" });
        });
    } catch (error) {
        console.error("Error in updateUser API:", error);
        return res.status(500).json({ message: "Unexpected server error", error: error.message });
    }
};




const deleteUser = (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const sqlQuery = "DELETE from usermanagement WHERE id = ?";

        connection.query(sqlQuery, id, (err, result) => {
            if (err) {
                console.error("Error deleting user:", err);
                return res.status(500).json({ message: "Internal server error, could not delete user" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json({ message: "User deleted successfully" });
        });
    } catch (error) {
        console.error("Error occurred while deleting user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};





module.exports = { adduser, getUser, updateUser, deleteUser }