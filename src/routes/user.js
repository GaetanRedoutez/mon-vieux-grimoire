const express = require('express')
const router = express.Router()

const userControl = require('../controllers/user')

/** Swagger definition
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Create new user
 *     description: Create a new user in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successful response with a message "New user created!" in JSON format
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/signup', userControl.signup)

/** Swagger definition
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user
 *     description: Login user and return userId and JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successful response with the user ID and a JWT token in JSON format
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/login', userControl.login)

module.exports = router
