const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mon Vieux Grimoire App',
      description:
        'API de gestion des livres et des utilisateurs pour le site "Mon vieux grimoire"',
      version: '0.1.1'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            email: { type: 'string', required: true, unique: true },
            password: { type: 'string', required: true }
          },
          required: ['email', 'password']
        },
        Book: {
          type: 'object',
          properties: {
            userId: { type: 'string', required: true },
            title: { type: 'string', required: true },
            author: { type: 'string', required: true },
            imageUrl: { type: 'string', required: true },
            year: { type: 'number', required: true },
            genre: { type: 'string', required: true },
            ratings: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  userId: { type: 'string', required: true },
                  grade: { type: 'number', required: true }
                }
              }
            },
            averageRating: { type: 'number', required: true }
          },
          required: [
            'userId',
            'title',
            'author',
            'imageUrl',
            'year',
            'genre',
            'ratings',
            'averageRating'
          ]
        },
        Ratings: {
          type: 'object',
          properties: {
            userId: { type: 'string', required: true },
            grade: { type: 'number', required: true }
          },
          required: ['userId', 'grade']
        }
      }
    },
    tags: [
      {
        name: 'Auth',
        description: 'Operations related to user authentication'
      },
      { name: 'Books', description: 'Operations related to book management' }
    ]
  },
  apis: ['./src/routes/user.js', './src/routes/book.js']
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = swaggerSpec
