import express from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

const router = express.Router();
const swaggerDocument = yaml.load('./swagger.yaml');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

export default router;
